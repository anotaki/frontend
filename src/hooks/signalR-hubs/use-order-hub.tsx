import { API_URL } from "@/App";
import { customToast } from "@/components/toast";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useQueryClient } from "@tanstack/react-query";
import { Receipt } from "lucide-react";
import { useRef } from "react";
import { useLocalStorage } from "../use-local-storage";

export default function useOrderHub() {
  let connectionRef = useRef<HubConnection | null>(null);
  const queryClient = useQueryClient();
  const { getItem } = useLocalStorage();

  function connect() {
    connectionRef.current = new HubConnectionBuilder()
      .withUrl(`${API_URL}/orderHub?access_token=${getItem("token")}`)
      .configureLogging(LogLevel.Information)
      .build();

    connectionRef.current.on("ReceiveOrder", (order) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      customToast.info(`Novo pedido recebido! Vem conferir!`, {
        icon: <Receipt className="size-5" />,
        action: {
          label: "Ver pedido",
          onClick: () => (window.location.href = `/admin/orders/${order.id}`),
        },
        actionButtonStyle: {
          backgroundColor: "var(--primary)",
          color: "#f9fafb",
        },
      });
    });

    connectionRef.current
      .start()
      .then(() => console.log("[SignalR] Conexão iniciada com sucesso."))
      .catch((err: any) =>
        console.error("[SignalR] Erro ao iniciar conexão:", err)
      );
  }

  function disconnect() {
    if (connectionRef.current) {
      connectionRef.current.stop().catch((err: any) => console.error(err));
    }
  }

  return { connectionRef, connect, disconnect };
}
