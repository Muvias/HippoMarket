'use client'

import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import "swiper/css"
import "swiper/css/pagination"
import type SwiperType from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { cn } from "@/lib/utils"

interface ImageSliderProps {
    urls: string[]
}

export function ImageSlider({ urls }: ImageSliderProps) {
    const [swiper, setSwiper] = useState<null | SwiperType>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [slideConfig, setSlideConfig] = useState({
        isBeginning: true,
        isEnd: activeIndex === (urls.length ?? 0) - 1
    })

    useEffect(() => {
        swiper?.on("slideChange", ({ activeIndex }) => {
            setActiveIndex(activeIndex)
            setSlideConfig({
                isBeginning: activeIndex === 0,
                isEnd: activeIndex === (urls.length ?? 0) - 1
            })
        })
    }, [swiper, urls])

    const activeStyles = "absolute grid place-items-center top-1/2 -translate-y-1/2 h-8 w-8 opacity-100 rounded-full border-2 bg-white border-zinc-200 active:scale-[0.97] hover:scale-105 aspect-square z-50"
    const inactiveStyles = "hidden text-gray-400"

    return (
        <div className="relative bg-zinc-100 aspect-square overflow-hidden group rounded-xl">
            <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
                <button
                    aria-label="Próxima imagem"
                    onClick={(e) => {
                        e.preventDefault()
                        swiper?.slideNext()
                    }}
                    className={cn(activeStyles, "right-3 transition", {
                        [inactiveStyles]: slideConfig.isEnd,
                        "hover:bg-primary-300 text-primary-800 opacity-100": !slideConfig.isEnd
                    })}
                >
                    <ChevronRight className="h-4 w-4 text-zinc-800" />{' '}
                </button>

                <button
                    aria-label="Voltar imagem"
                    onClick={(e) => {
                        e.preventDefault()
                        swiper?.slidePrev()
                    }}
                    className={cn(activeStyles, "left-3 transition", {
                        [inactiveStyles]: slideConfig.isBeginning,
                        "hover:bg-primary-300 text-primary-800 opacity-100": !slideConfig.isBeginning
                    })}
                >
                    <ChevronLeft className="h-4 w-4 text-zinc-800" />
                </button>
            </div>

            <Swiper
                className="h-full w-full"
                pagination={{
                    renderBullet: (_, className) => {
                        return `<span class="rounded-full transition ${className}"></span>`
                    }
                }}
                onSwiper={(swiper) => setSwiper(swiper)}
                modules={[Pagination]}
                slidesPerView={1}
                spaceBetween={50}
            >
                {urls.map((url, index) => (
                    <SwiperSlide key={index} className="relative w-full h-full -z-10">
                        <Image
                            src={url}
                            alt="Imagem do Produto"
                            loading="eager"
                            fill
                            sizes="(max-width: 1024px) 90vw, 35vw"
                            className="object-cover object-center h-full w-full -z-10"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
