'use client'

import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/use-cart";
import { cn, formatPrice } from "@/lib/utils";
import { CheckIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PageProps { }

export default function Page({ }: PageProps) {
    const { items, removeItem } = useCart()

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])


    return (
        <div className="bg-white">
            <div className="max-w-2xl lg:max-w-7xl mx-auto px-4 pb-24 pt-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">Carrinho de Compras</h1>

                <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16 mt-12">
                    <div className={cn("lg:col-span-7", {
                        "p-12 rounded-lg border-2 border-dashed border-zinc-200": isMounted && items.length === 0
                    })}>
                        <h2 className="sr-only">Items no seu carrinho de compras</h2>

                        {isMounted && items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full space-y-1">
                                <div aria-hidden="true" className="relative h-40 w-40 mb-4 text-muted-foreground">
                                    <Image
                                        src='/hippo-empty-cart.png'
                                        alt="Carrinho de compras vazio"
                                        loading="eager"
                                        sizes="10rem"
                                        fill
                                    />
                                </div>

                                <h3 className="font-semibold text-2xl">Seu carrinho está vazio</h3>
                                <p className="text-muted-foreground text-center">Oops! Nada para mostrar aqui ainda.</p>
                            </div>
                        ) : null}

                        <ul
                            className={cn({
                                "divide-y divide-gray-200 border-y border-gray-200": isMounted && items.length > 0
                            })}
                        >
                            {isMounted && items.map(({ product }) => {
                                const label = PRODUCT_CATEGORIES.find((category) => category.value === product.category)?.label

                                const { image } = product.images[0]

                                return (
                                    <li className="flex py-6 sm:py-10" key={product.id}>
                                        <div className="flex-shrink-0">
                                            <div className="relative h-24 w-24 sm:h-48 sm:w-48">
                                                {typeof image !== 'string' && image.url ? (
                                                    <Image
                                                        src={image.url}
                                                        alt="Imagem do produto"
                                                        sizes="(max-width: 640px) 6rem, 12rem"
                                                        fill
                                                        className="object-cover object-center rounded-md"
                                                    />
                                                ) : (
                                                    <div></div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between ml-4 sm:ml-6">
                                            <div className="relative sm:grid sm:grid-cols-2 sm:gap-x-6 pr-9 sm:pr-0">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm">
                                                            <Link
                                                                href={`/product/${product.id}`}
                                                                className="font-medium text-gray-700 hover:text-gray-800"
                                                            >
                                                                {product.name}
                                                            </Link>
                                                        </h3>
                                                    </div>

                                                    <div className="flex mt-1 text-sm">
                                                        <p className="text-muted-foreground">
                                                            Categoria: {label}
                                                        </p>
                                                    </div>

                                                    <p className="mt-1 text-sm font-medium text-gray-900">
                                                        {formatPrice(product.price)}
                                                    </p>
                                                </div>

                                                <div className="w-20 mt-4 sm:mt-0 sm:pr-9">
                                                    <div className="absolute right-0 top-0">
                                                        <Button
                                                            aria-label="Remover produto"
                                                            onClick={() => {
                                                                removeItem(product.id)
                                                            }}
                                                            variant="ghost"
                                                        >
                                                            <X className="w-5 h-5" aria-hidden="true" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="flex mt-4 text-sm space-x-2 text-gray-700">
                                                <CheckIcon className="w-5 h-5 flex-shrink-0 text-green-500" />

                                                <span>Eligível para entrega imediata</span>
                                            </p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
