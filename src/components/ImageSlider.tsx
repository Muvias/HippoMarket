'use client'

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { Card, CardContent } from "./ui/card"

interface ImageSliderProps {
    urls: string[]
}

export function ImageSlider({ urls }: ImageSliderProps) {

    return (
        <Carousel
            className="h-full w-full bg-gray-50 rounded-xl"
        >
            <CarouselContent>
                {urls.map((url, index) => (
                    <CarouselItem key={index} className="relative w-full h-full">
                        <Card>
                            <CardContent className="relative flex aspect-square items-center justify-center p-6 bg-gray-50 rounded-xl">
                                <Image
                                    src={url}
                                    alt="Imagem do Produto"
                                    loading="eager"
                                    fill
                                    sizes="(max-width: 1024px) 90vw, 35vw"
                                    className="object-cover object-center h-full w-full rounded-xl"
                                />
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" aria-label="Voltar imagem" />
            <CarouselNext className="right-2" aria-label="Próxima imagem" />
        </Carousel>
    )
}
