'use client'

import { useCart } from "@/hooks/use-cart"
import { trpc } from "@/trpc/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface PaymentStatusProps {
    orderEmail: string
    orderId: string
    isPaid: boolean
}

export function PaymentStatus({ orderEmail, orderId, isPaid }: PaymentStatusProps) {
    const { data } = trpc.payment.pollOrderStatus.useQuery({ orderId }, {
        enabled: isPaid === false,
        refetchInterval: (data) => (data?.isPaid ? false : 1000)
    })

    const router = useRouter()
    const { clearCart } = useCart()

    useEffect(() => {
        if (data?.isPaid) {
            clearCart()
            router.refresh()
        }
    }, [data?.isPaid, router, clearCart])


    return (
        <div className="grid grid-cols-2 gap-x-4 mt-16 text-sm text-gray-600">
            <div>
                <p className="font-medium text-gray-900">Enviando para</p>
                <p>{orderEmail}</p>
            </div>

            <div>
                <p className="font-medium text-gray-900">Status do pedido</p>
                <p>{isPaid ? "Pagamento bem-sucedido" : "Pagamento pendente"}</p>
            </div>
        </div>
    )
}
