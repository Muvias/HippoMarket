import Image from "next/image";

interface PageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ searchParams }: PageProps) {
    const orderId = searchParams.orderId

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
                </div>
            </div>
        </main>
    )
}
