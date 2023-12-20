'use client'

import { usePathname } from "next/navigation";
import { MaxWidthWapper } from "./MaxWidthWapper";
import { Icons } from "./Icons";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Footer() {
    const pathname = usePathname()
    const pathsToMinimize = ["/verify-email", "/sign-up", "/sign-in"]

    return (
        <footer className="flex-grow-0 bg-white">
            <MaxWidthWapper>
                <div className="border-t border-gray-200">
                    {pathsToMinimize.includes(pathname) ? null : (
                        <div className="pt-16 pb-8">
                            <div className="flex justify-center">
                                <Icons.logo className="w-auto h-12" />
                            </div>
                        </div>
                    )}

                    {pathsToMinimize.includes(pathname) ? null : (
                        <div>
                            <div className="relative flex items-center p-6 sm:py-8 lg:mt-0">
                                <div className="absolute inset-0 overflow-hidden rounded-lg">
                                    <div aria-hidden="true" className="absolute inset-0 bg-zinc-50 bg-gradient-to-br bg-opacity-90" />
                                </div>

                                <div className="relative max-w-sm mx-auto text-center">
                                    <h3 className="font-semibold text-gray-900">Torne-se um vendedor</h3>

                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Se você gostaria de vender produtos de alta qualidade, você pode fazer isso em minutos.{' '}

                                        <Link href='/sign-in?as=seller' className="whitespace-nowrap underline underline-offset-2 font-medium text-black hover:text-zinc-900">Comece agora</Link>

                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="py-10 md:flex md:items-center md:justify-between">
                    <div className="text-center md:text-left">
                        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
                    </div>

                    <div className="flex items-center justify-center mt-4 md:mt-0">
                        <div className="flex space-x-8">
                            <Link href='#' className="text-sm text-muted-foreground hover:text-gray-600">Termos de Serviço</Link>
                            <Link href='#' className="text-sm text-muted-foreground hover:text-gray-600">Politica de Cookie</Link>
                            <Link href='#' className="text-sm text-muted-foreground hover:text-gray-600">Politica de Privacidade</Link>
                        </div>
                    </div>
                </div>
            </MaxWidthWapper>
        </footer>
    )
}
