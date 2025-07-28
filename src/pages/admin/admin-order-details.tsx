// pages/admin/admin-order-details.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import OrderDetails from "@/components/orders/order-details";
import { GetOrderDetails } from "@/api/_requests/orders";

export default function AdminOrderDetails() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => GetOrderDetails(parseInt(orderId!)),
    enabled: !!orderId,
  });

  if (isLoading) return <div>Carregando...</div>;
  if (!order) return <div>Pedido não encontrado</div>;

  return (
    <OrderDetails
      order={order}
      onBack={() => navigate("/admin/orders")}
      //   onRepeatOrder={(id) => {
      //     // Implementar lógica de repetir pedido
      //     console.log("Repetir pedido:", id);
      //   }}
    />
  );
}
