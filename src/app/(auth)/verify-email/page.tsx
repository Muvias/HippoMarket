import { VerifyEmail } from "@/components/VerifyEmail"
import Image from "next/image"

interface pageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

export default function Page({ searchParams }: pageProps) {
    const token = searchParams.token
    const toEmail = searchParams.to

    return (
        <div className="relative container flex flex-col items-center justify-center pt-20 lg:px-0">
            <div className="flex flex-col justify-center w-full mx-auto space-y-6 sm:w-[400px]">
                {token && typeof token === 'string' ? (
                    <div className="grid gap-6">
                        <VerifyEmail token={token} />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full space-y-1">
                        <div className="relative h-60 w-60 mb-4 text-muted-foreground">
                            <Image
                                src='/hippo-email-sent.png'
                                alt="Uma imagem cartoonizada simbolizando o envio do email"
                                fill
                                priority
                                sizes="15rem"
                            />
                        </div>

                        <h3 className="text-2xl font-semibold">
                            Verifique seu Email
                        </h3>

                        {toEmail ? (
                            <p className="text-muted-foreground text-center">
                                Nós enviamos um link de verificação para <span className="font-semibold">{toEmail}</span>
                            </p>
                        ) : (
                            <p className="text-muted-foreground text-center">Nós enviamos um link de verificação para o seu Email.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
