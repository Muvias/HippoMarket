import { PaymentStatus } from "@/components/PaymentStatus";
import { PRODUCT_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/get-payload";
import { getServerSideUser } from "@/lib/payload-utils";
import { formatPrice } from "@/lib/utils";
import { Product, ProductFile } from "@/payload-type";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface PageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ searchParams }: PageProps) {
    const orderId = searchParams.order

    const nextCookies = cookies()
    const payload = await getPayloadClient()
    const { user } = await getServerSideUser(nextCookies)

    const { docs: orders } = await payload.find({
        collection: 'orders',
        depth: 2,
        where: {
            id: {
                equals: orderId
            }
        }
    })

    const [order] = orders

    if (!order) return notFound()

    const orderUserId = typeof order.user === 'string' ? order.user : order.user.id

    if (orderUserId !== user?.id) return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`)

    const products = order.products as Product[]
    const orderTotal = products.reduce((total, product) => {
        return total + product.price
    }, 0)

    return (
        <main className="relative lg:min-h-full">
            <div className="hidden lg:block lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12 h-80 overflow-hidden">
                <Image
                    src='/checkout-thank-you.jpg'
                    alt="Imagem de agradecimento pela compra"
                    fill
                    sizes="50vw"
                    priority
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="max-w-2xl lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-x-8 xl:gap-x-24 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 mx-auto">
                <div className="lg:col-start-2">
                    <p className="text-sm font-medium text-blue-600">Pedido bem sucedido</p>
                    <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">Obrigado pela compra</h1>
                    {order._isPaid ? (
                        <p className="mt-2 text-base text-muted-foreground">
                            Seu pedido foi processado e o arquivo para download está disponível abaixo. Enviamos o seu recibo e os detalhes do pedido para {typeof order.user !== "string" ? <span className="font-medium text-gray-900">{order.user.email}</span> : null}
                        </p>
                    ) : (
                        <p className="mt-2 text-base text-muted-foreground">Agradecemos sua compra, por favor aguarde. Ainda estamos processando os arquivos e logo mais te enviaremos uma confirmação!</p>
                    )}

                    <div className="mt-16 text-sm font-medium">
                        <p className="text-muted-foreground">Número do pedido</p>
                        <span className="mt-2 text-gray-900">{order.id}</span>

                        <ul className="mt-6 text-sm font-medium border-t divide-y border-gray-200 divide-gray-200 text-muted-foreground">
                            {(order.products as Product[]).map((product) => {
                                const label = PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label

                                const downloadUrl = (product.product_files as ProductFile).url as string
                                const { image } = product.images[0]

                                return (
                                    <li key={product.id} className="flex py-6 space-x-6">
                                        <div className="relative h-24 w-24">
                                            {typeof image !== "string" && image.url ? (
                                                <Image
                                                    src={image.url}
                                                    alt={`Imagem de ${product.name}`}
                                                    fill
                                                    className="flex-none rounded-md object-cover object-center bg-gray-100"
                                                />
                                            ) : null}
                                        </div>

                                        <div className="flex flex-auto flex-col justify-between">
                                            <div className="space-y-1">
                                                <h3 className="text-gray-900">{product.name}</h3>

                                                <p className="my-1">Categoria: {label}</p>
                                            </div>

                                            {order._isPaid ? (
                                                <a
                                                    href={downloadUrl}
                                                    download={product.name}
                                                    className="text-blue-600 hover:underline underline-offset-2"
                                                >Baixar arquivo</a>
                                            ) : null}
                                        </div>

                                        <p className="flex-none font-medium text-gray-900">
                                            {formatPrice(product.price)}
                                        </p>
                                    </li>
                                )
                            })}
                        </ul>

                        <div className="pt-6 space-y-6 text-sm font-medium border-t border-gray-200 text-muted-foreground">
                            <div className="flex justify-between">
                                <p>Subtotal</p>
                                <p className="text-gray-900">{formatPrice(orderTotal)}</p>
                            </div>

                            <div className="flex justify-between">
                                <p>Custo de transação</p>
                                <p className="text-gray-900">{formatPrice(2)}</p>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-gray-200 text-gray-900">
                                <p className="text-base">Total</p>
                                <p className="text-base">{formatPrice(orderTotal + 2)}</p>
                            </div>
                        </div>

                        <PaymentStatus orderEmail={user.email} orderId={order.id} isPaid={order._isPaid} />

                        <div className="mt-16 py-6 text-right border-t border-gray-200">
                            <Link
                                href='/products'
                                className="text-sm font-medium text-blue-600 hover:text-blue-500"
                            >
                                Continue comprando &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
