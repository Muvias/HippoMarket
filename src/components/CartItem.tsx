'use client'

import { PRODUCT_CATEGORIES } from "@/config";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { Product } from "../payload-type";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";

interface CartItemProps {
    product: Product
}

export function CartItem({ product }: CartItemProps) {
    const { removeItem } = useCart()
    const { image } = product.images[0]

    const label = PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label

    return (
        <div className="space-y-3 py-2">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                    <div className="relative min-w-fit h-16 w-16 aspect-square overflow-hidden rounded">
                        {typeof image !== "string" && image.url ? (
                            <Image
                                src={image.url}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full bg-secondary">
                                <ImageIcon aria-hidden={true} className="h-4 w-4 text-muted-foreground" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col self-start">
                        <span className="text-sm font-medium line-clamp-1 mb-1">{product.name}</span>
                        <span className="text-xs capitalize line-clamp-1 text-muted-foreground">{label}</span>

                        <div className="text-xs text-muted-foreground mt-4">
                            <button
                                className="flex items-center gap-0.5"
                                onClick={() => removeItem(product.id)}
                            >
                                <X className="w-4 h-4" />
                                Remover
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-1 font-medium">
                    <span className="ml-auto line-clamp-1 text-sm">{formatPrice(product.price)}</span>
                </div>
            </div>
        </div>
    )
}
