'use client'

import { trpc } from "@/trpc/client"
import { Loader2, XCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "./ui/button"

interface VerifyEmailProps {
    token: string
}

export function VerifyEmail({ token }: VerifyEmailProps) {
    const { data: verified, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
        token,
    })

    if (isError) {
        return (
            <div className="flex flex-col items-center gap-2 text-center">
                <XCircle className="h-8 w-8 text-red-600" />

                <h3 className="text-xl font-semibold">
                    Houve um problema!
                </h3>

                <p className="text-sm text-muted-foreground">
                    Este não é um token válido ou foi expirado. Por favor tente novamente.
                </p>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center gap-2 text-center">
                <Loader2 className="h-8 w-8 text-zinc-400 animate-spin" />

                <h3 className="text-xl font-semibold">
                    Verificando...
                </h3>

                <p className="text-sm text-muted-foreground">
                    Isso não deve demorar muito.
                </p>
            </div>
        )
    }

    if (verified?.success) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <div className="relative h-60 w-60 mb-4 text-muted-foreground">
                    <Image
                        src='/hippo-email-sent.png'
                        alt="Uma imagem cartoonizada simbolizando o envio do email"
                        fill
                        priority
                        sizes="15rem"
                    />
                </div>

                <h3 className="text-2xl font-semibold">Você está pronto!</h3>
                <p className="text-muted-foreground text-center mt-1">Obrigado por verificar o seu email.</p>

                <Link
                    href='/sign-in'
                    className={buttonVariants({ variant: 'link', className: 'mt-4' })}
                >
                    Entrar
                </Link>
            </div >
        )
    }
}
