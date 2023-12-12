import { AddToCartButton } from "@/components/AddToCartButton"
import { ImageSlider } from "@/components/ImageSlider"
import { MaxWidthWapper } from "@/components/MaxWidthWapper"
import { ProductReel } from "@/components/ProductReel"
import { PRODUCT_CATEGORIES } from "@/config"
import { getPayloadClient } from "@/get-payload"
import { formatPrice } from "@/lib/utils"
import { CheckIcon, Shield } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface pageProps {
    params: {
        productId: string
    }
}

const BREADCRUMBS = [
    { id: 1, name: "Inicio", href: "/" },
    { id: 2, name: "Produtos", href: "/products" }
]

export default async function Page({ params }: pageProps) {
    const { productId } = params
    const payload = await getPayloadClient()

    const { docs: products } = await payload.find({
        collection: "products",
        limit: 1,
        where: {
            id: {
                equals: productId
            },
            approvedForSale: {
                equals: "approved"
            }
        }
    })

    const [product] = products

    if (!product) return notFound()

    const label = PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label
    const validUrls = product.images.map(({ image }) => (typeof image === "string" ? image : image.url)).filter(Boolean) as string[]

    return (
        <MaxWidthWapper className="bg-white">
            <div className="bg-white">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 max-w-2xl lg:max-w-7xl px-4 lg:px-8 sm:px-6 py-16 sm:p-24 mx-auto">
                    <div className="lg:max-w-lg lg:self-end">
                        <ol className="flex items-center space-x-2">
                            {BREADCRUMBS.map((breadcrumb, index) => (
                                <li key={breadcrumb.href}>
                                    <div className="flex items-center text-sm">
                                        <Link href={breadcrumb.href} className="text-sm font-medium text-muted-foreground hover:text-gray-900">
                                            {breadcrumb.name}
                                        </Link>

                                        {index !== BREADCRUMBS.length - 1 ? (
                                            <svg
                                                viewBox='0 0 20 20'
                                                fill='currentColor'
                                                aria-hidden='true'
                                                className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                                                <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                                            </svg>
                                        ) : null}
                                    </div>
                                </li>
                            ))}
                        </ol>

                        <div className="mt-4">
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                                {product.name}
                            </h1>
                        </div>

                        <section className="mt-4">
                            <div className="flex items-center">
                                <p className="font-medium text-gray-900">{formatPrice(product.price)}</p>

                                <div className="ml-4 pl-4 border-l text-muted-foreground border-gray-300">
                                    {label}
                                </div>
                            </div>

                            <div className="mt-4 space-y-6">
                                <p className="text-base text-muted-foreground">
                                    {product.description}
                                </p>
                            </div>

                            <div className="flex items-center mt-6">
                                <CheckIcon aria-hidden="true" className="flex-shrink-0 h-5 w-5 text-green-500" />
                                <p className="ml-2 text-sm text-muted-foreground">Elegível para entrega imediata</p>
                            </div>
                        </section>
                    </div>

                    <div className="mt-10 lg:mt-0 lg:self-center lg:col-start-2 lg:row-span-2">
                        <div className="rounded-lg aspect-square">
                            <ImageSlider urls={validUrls} />
                        </div>
                    </div>

                    <div className="lg:max-w-lg mt-10 lg:self-start lg:col-start-1 lg:row-start-2">
                        <div className="mt-10">
                            <AddToCartButton product={product} />
                        </div>

                        <div className="mt-6 text-center">
                            <div className="group inline-flex text-sm font-medium">
                                <Shield aria-hidden={true} className="flex-shrink-0 h-5 w-5 mr-2 text-gray-400" />
                                <span className="text-muted-foreground hover:text-gray-700">30 dias garantidos para devolução</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ProductReel
                href="/products"
                query={{ category: product.category, limit: 4 }}
                title={`Similares a ${label}`}
            />
        </MaxWidthWapper>
    )
}
