import { getServerSideUser } from "@/lib/payload-utils"
import { formatPrice } from "@/lib/utils"
import { Product, ProductFile } from "@/payload-type"
import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"
import payload from "payload"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { GhostIcon } from "lucide-react"
import { MaxWidthWapper } from "@/components/MaxWidthWapper"

interface pageProps { }

export default async function Page({ }: pageProps) {
    const nextCookies = cookies()
    const { user } = await getServerSideUser(nextCookies)

    if (!user) redirect('/sign-in?origin=orders')

    const { docs: orders } = await payload.find({
        collection: 'orders',
        depth: 2,
        where: {
            user: {
                equals: user.id,
            }
        }
    })

    const [order] = orders

    if (!order) return (
        <div className="text-xl font-medium text-zinc-800">
            <p className="flex items-center justify-center mx-4 gap-2 mt-20">Nada para ver aqui ainda <GhostIcon className="shrink-0" /></p>
        </div>
    )

    const orderUserId = typeof order.user === 'string' ? order.user : order.user.id

    if (orderUserId !== user.id) return redirect('/sign-in?origin=orders')

    const products = order.products.map((product) => product) as Product[]

    return (
        <MaxWidthWapper>
            <div>
                {products.map((product) => {
                    const downloadUrl = (product.product_files as ProductFile).url as string

                    return (
                        <div className="container mx-auto py-10" key={product.id}>
                            <DataTable columns={columns} data={products} downloadUrl={downloadUrl} productName={product.name} />
                        </div>
                    )
                })}
            </div>
        </MaxWidthWapper>
    )
}
