'use client'

import { ShoppingCartIcon } from "lucide-react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import Image from "next/image"

interface CartProps { }

export function Cart({ }: CartProps) {
    const itemCount = 0
    const fee = 4

    return (
        <Sheet>
            <SheetTrigger className="flex items-center p-2 -m-2 group">
                <ShoppingCartIcon
                    aria-hidden='true'
                    className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                />

                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    0
                </span>
            </SheetTrigger>

            <SheetContent className="flex flex-col w-full sm:max-w-lg pr-0">
                <SheetHeader className="space-y-2.5 pr-6">
                    <SheetTitle>Carrinho (0)</SheetTitle>
                </SheetHeader>

                {itemCount > 0 ? (
                    <>
                        <div className="flex flex-col w-full pr-6">
                            cart items
                        </div>
                        <div className="space-y-4 pr-6">
                            <Separator />

                            <div className="space-y-1.5 text-sm">
                                <div className="flex">
                                    <span className="flex-1">Frete</span>
                                    <span>Grátis</span>
                                </div>
                                <div className="flex">
                                    <span className="flex-1">Custo de transação</span>
                                    <span>{formatPrice(fee)}</span>
                                </div>
                                <div className="flex">
                                    <span className="flex-1">Total</span>
                                    <span>{formatPrice(fee)}</span>
                                </div>
                            </div>

                            <SheetFooter>
                                <SheetTrigger asChild>
                                    <Link href='/cart' className={buttonVariants({ className: 'w-full' })}>
                                        Continuar para pagar
                                    </Link>
                                </SheetTrigger>
                            </SheetFooter>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full space-y-1">
                        <div
                            aria-hidden='true'
                            className="relative mb-4 w-60 h-60 text-muted-foreground"
                        >
                            <Image
                                src='/hippo-empty-cart.png'
                                alt='Um hipopótamo cartoonizado para simbolizar o carrinho vazio'
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                            />
                        </div>

                        <div className="text-xl font-semibold">
                            Seu carrinho está vazio
                        </div>

                        <SheetTrigger asChild>
                            <Link href='/products' className={buttonVariants({ variant: 'link', size: 'sm', className: 'text-muted-foreground' })}>
                                Adicione produtos ao carrinho para prosseguir com a compra.
                            </Link>
                        </SheetTrigger>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
