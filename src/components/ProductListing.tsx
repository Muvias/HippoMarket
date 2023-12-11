import { cn, formatPrice } from "@/lib/utils"
import { Product } from "@/payload-type"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Skeleton } from "./ui/skeleton"
import { PRODUCT_CATEGORIES } from "@/config"
import { ImageSlider } from "./ImageSlider"

interface ProductListingProps {
    product: Product | null
    index: number
}

export function ProductListing({ product, index }: ProductListingProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, index * 75)

        return () => clearTimeout(timer)
    }, [index])

    if (!product || !isVisible) return <ProductPlaceholder />

    const label = PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label
    const validUrls = product.images.map(({ image }) => (typeof image === "string" ? image : image.url)).filter(Boolean) as string[]

    if (isVisible && product) {
        return (
            <Link
                href={`/product/${product.id}`}
                className={cn('invisible h-full w-full cursor-pointer', {
                    "visible animate-in fade-in-5": isVisible
                })}
            >
                <div className="flex flex-col w-full">
                    <ImageSlider urls={validUrls} />

                    <h3 className="mt-4 font-medium text-sm text-gray-700">{product.name}</h3>

                    <p className="mt-1 text-sm text-gray-500">
                        {label}
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-900">
                        {formatPrice(product.price)}
                    </p>
                </div>
            </Link>
        )
    }
}

const ProductPlaceholder = () => {
    return (
        <div className="flex flex-col w-full">
            <div className="relative aspect-square w-full rounded-xl bg-zinc-100 overflow-hidden">
                <Skeleton className="h-full w-full" />
            </div>

            <Skeleton className="w-2/3 h-4 mt-4 rounded-lg" />
            <Skeleton className="w-16 h-4 mt-2 rounded-lg" />
            <Skeleton className="w-12 h-4 mt-2 rounded-lg" />
        </div>
    )
}
