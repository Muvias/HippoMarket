'use client'

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/AuthCredentialsValidator";
import { trpc } from "@/trpc/client";
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from 'react-hook-form';
import { toast } from "sonner";

export default function Page() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const isSeller = searchParams.get('as') === 'seller'
    const origin = searchParams.get('origin')

    const { register, handleSubmit, formState: { errors } } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
    })

    const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
        onSuccess: () => {
            toast.success("Logado com sucesso!")

            if (origin) {
                router.push(`/${origin}`)
                
                window.location.reload()
                return
            }

            if (isSeller) {
                router.push('/sell')

                return
            }

            router.push('/')

            router.refresh()
        },
        onError: (error) => {
            if (error.data?.code === 'UNAUTHORIZED') {
                toast.error('Email ou senha inválido.')
            }
        }
    })

    function onSubmit({ email, password }: TAuthCredentialsValidator) {
        signIn({ email, password })
    }

    return (
        <>
            <div className="container relative flex flex-col items-center justify-center pt-20 lg:px-0">
                <div className="flex flex-col justify-center w-full sm:w-[350px] mx-auto space-y-6">
                    <div className="flex flex-col items-center text-center space-y-2">
                        <Icons.logo className="w-20 h-20" />
                        <h1 className="text-2xl font-bold">Entrar na sua {isSeller ? 'conta de vendedor' : 'conta'}</h1>
                    </div>

                    <Link href='/sign-up' className={buttonVariants({ variant: 'link', className: 'gap-1.5 w-fit mx-auto px-0' })}>
                        Ainda não tem uma conta? Cadastre-se
                        <ArrowRightIcon className="w-4 h-4 shrink-0" />
                    </Link>

                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-2">
                                <div className="grid gap-2 py-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        {...register('email')}
                                        placeholder="exemplo@email.com"
                                        type="email"
                                        id="email"
                                        autoComplete="email"
                                        className={cn({
                                            "focus-visible:ring-red-500": errors.email
                                        })}
                                    />

                                    {errors?.email && (
                                        <p className="text-sm text-red-500">{errors.email.message}</p>
                                    )}
                                </div>

                                <div className="grid gap-2 py-2">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input
                                        {...register('password')}
                                        placeholder="********"
                                        type="password"
                                        id="password"
                                        className={cn({
                                            "focus-visible:ring-red-500": errors.password
                                        })}
                                    />

                                    {errors?.password && (
                                        <p className="text-sm text-red-500">{errors.password.message}</p>
                                    )}
                                </div>

                                <Button>Entrar</Button>
                            </div>
                        </form>

                        <div className="relative">
                            <div aria-hidden='true' className="absolute flex items-center inset-0">
                                <span className="w-full border-t" />
                            </div>

                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="px-2 text-muted-foreground bg-background">
                                    ou
                                </span>
                            </div>
                        </div>

                        {isSeller ? (
                            <Button
                                onClick={() => router.replace('/sign-in', undefined)}
                                variant='secondary'
                                disabled={isLoading}
                            >
                                Continue como consumidor
                            </Button>
                        ) : (
                            <Button
                                onClick={() => router.push('?as=seller')}
                                variant='secondary'
                                disabled={isLoading}
                            >
                                Continue como vendedor
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
