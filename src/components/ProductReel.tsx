'use client'

import { TQueryValidator } from "@/lib/validators/query-validator"
import { Product } from "@/payload-type"
import { trpc } from "@/trpc/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { ProductListing } from "./ProductListing"

interface ProductReelProps {
    title: string
    subtitle?: string
    href?: string
    query: TQueryValidator
}

const FALLBACK_LIMIT = 4

export function ProductReel(props: ProductReelProps) {
    const { title, subtitle, href, query } = props

    const { data: queryResults, isLoading } = trpc.getInfiniteProducts.useInfiniteQuery({
        limit: query.limit ?? FALLBACK_LIMIT, query
    }, {
        getNextPageParam: (lastPage) => lastPage.nextPage,
    })

    const products = queryResults?.pages.flatMap((page) => page.items)

    let map: (Product | null)[] = []

    if (products && products.length) {
        map = products
    } else if (isLoading) {
        map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null)
    }

    return (
        <section className="py-12">
            <div className="md:flex md:items-center md:justify-between mb-4">
                <div className="max-w-2xl lg:max-w-4xl px-4 lg:px-0">
                    {title ? (
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {title}
                        </h1>
                    ) : null}

                    {subtitle ? (
                        <p className="mt-2 text-sm text-muted-foreground">
                            {subtitle}
                        </p>
                    ) : null}
                </div>

                {href ? (
                    <Link
                        href={href}
                        className="hidden md:flex md:items-center md:gap-1 text-sm font-medium text-primary hover:text-blue-500"
                    >
                        Compre a coleção
                        <span aria-hidden="true">
                            <ArrowRight className="w-4 h-4" />
                        </span>
                    </Link>
                ) : null}
            </div>

            <div className="relative px-4 lg:px-0">
                <div className="flex items-center w-full mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 md:gap-x-8 w-full">
                        {map.map((product, index) => (
                            <ProductListing key={index} product={product} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
