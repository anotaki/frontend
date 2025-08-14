import { ArrowLeft } from "lucide-react";

import { PrimaryText } from "@/components/design/primary-text";
import { Button } from "@/components/ui/button";
import { OrderStatusChip } from "@/components/order-status-chip";
import { type Order } from "@/types";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { GetUserOrders } from "@/api/_requests/orders";

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[] | undefined>(undefined);

  useEffect(() => {
    async function getData() {
      const data = await GetUserOrders(1);
      setOrders(data);
    }

    getData();
  }, []);

  console.log(orders);

  return (
    <div>
      <main className="pb-20 pt-6 max-w-5xl w-full mx-auto px-2 lg:px-0">
        <header className="mb-5">
          <Button variant="outline">
            <ArrowLeft />
            Voltar
          </Button>
          <PrimaryText className="my-4 text-xl">Meus pedidos</PrimaryText>
        </header>

        <section>
          <div
            id="card-wrapper"
            className="grid grid-cols-1 md:grid-cols-2 gap-2"
          >
            {orders?.map((order) => (
              <>
                <div
                  key={order.id}
                  className="bg-white flex flex-col gap-2 p-5 rounded-lg border-[1px] border-gray-200"
                >
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

                  <hr className="border-gray-200" />

                  {order.items.map((item) => (
                    <div key={item.id}>
                      {item.quantity}x {item.product?.name}
                    </div>
                  ))}

                  <div className="text-primary text-lg font-semibold mt-2">
                    R$ {order.totalPrice.toFixed(2).replace(".", ",")}
                  </div>

                  <Button variant={"link"} className="mt-1">
                    Detalhes do pedido
                  </Button>
                </div>

                <div
                  // key={order.id}
                  className="bg-white flex flex-col gap-2 p-5 rounded-lg border-[1px] border-gray-200"
                >
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

                  <hr className="border-gray-200" />

                  {order.items.map((item) => (
                    <div key={item.id}>
                      {item.quantity}x {item.product?.name}
                    </div>
                  ))}

                  <div className="text-primary text-lg font-semibold mt-2">
                    R$ {order.totalPrice.toFixed(2).replace(".", ",")}
                  </div>

                  <Button variant={"link"} className="mt-1">
                    Detalhes do pedido
                  </Button>
                </div>
              </>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
