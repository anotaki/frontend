import { ArrowLeft } from "lucide-react";
import { PrimaryText } from "@/components/design/primary-text";
import { Button } from "@/components/ui/button";
import { OrderStatusChip } from "@/components/order-status-chip";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { GetUserOrders } from "@/api/_requests/orders";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/use-auth";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Loading } from "@/components/global/fallbacks";

export default function MyOrders() {
  const { user } = useAuth();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["userOrders"],
    queryFn: () => GetUserOrders(user?.id),
    staleTime: 30000,
    enabled: !!user?.id,
  });

  if (isLoading) return <Loading />;

  return (
    <main className="pt-6 max-w-5xl w-full mx-auto px-6 lg:px-0">
      <header className="mb-5 flex flex-col my-b">
        <h1 className="text-xl font-semibold">
          <Link to={"/menu"}>
            <Button variant="ghost" size="sm" className="cursor-pointer">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          Voltar
        </h1>
      </header>

      <Separator className="my-4" />

      <section>
        <div
          id="card-wrapper"
          className="grid grid-cols-1 md:grid-cols-2 gap-2"
        >
          {orders?.map((order) => (
            <div
              key={order.id}
              className="bg-white flex flex-col gap-2 p-5 rounded-lg border-[1px] border-gray-200 justify-between"
            >
              <div>
                <div>
                  <div className="flex justify-between">
                    <div className="flex gap-1 items-center">
                      <PrimaryText className="text-lg">
                        Pedido #{order.id}
                      </PrimaryText>
                    </div>
                    <OrderStatusChip orderStatus={order.orderStatus} />
                  </div>
                  <p className="text-black/50 text-sm">
                    Em{" "}
                    {format(
                      new Date(order.createdAt),
                      "dd/MM/yyyy 'às' HH:mm",
                      {
                        locale: ptBR,
                      }
                    )}
                  </p>
                </div>

                <hr className="border-gray-200 my-3" />

                {order.items.map((item) => (
                  <div key={item.id}>
                    {item.quantity}x {item.product?.name}
                  </div>
                ))}

                <div className="text-primary text-lg font-semibold mt-2">
                  R$ {order.totalPrice.toFixed(2).replace(".", ",")}
                </div>
              </div>
              <Link to={`/my-orders/${order.id}`} className="mt-1 mx-auto">
                <Button variant={"link"} className="cursor-pointer">
                  Detalhes do pedido
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
