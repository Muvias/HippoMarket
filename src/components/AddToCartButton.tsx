'use client'

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "../hooks/use-cart";
import { Product } from "../payload-type";

interface AddToCartButtonProps {
    product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addItem } = useCart()
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(false)
        }, 1000)

        return () => clearTimeout(timeout)
    }, [isSuccess])

    return (
        <Button
            size='lg'
            className="w-full"
            disabled={isSuccess}
            onClick={() => {
                addItem(product)
                setIsSuccess(true)
            }}
        >
            {isSuccess ? "Adicionado!" : "Adicionar ao carrinho"}
        </Button>
    )
}
