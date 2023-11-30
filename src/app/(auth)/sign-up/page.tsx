'use client'

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/AuthCredentialsValidator";
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from 'react-hook-form';

export default function Page() {
    const { register, handleSubmit, formState: { errors } } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
    })


    function onSubmit({ email, password }: TAuthCredentialsValidator) {

    }

    return (
        <>
            <div className="container relative flex flex-col items-center justify-center pt-20 lg:px-0">
                <div className="flex flex-col justify-center w-full sm:w-[350px] mx-auto space-y-6">
                    <div className="flex flex-col items-center text-center space-y-2">
                        <Icons.logo className="w-20 h-20" />
                        <h1 className="text-2xl font-bold">Criar conta</h1>
                    </div>

                    <Link href='/sign-in' className={buttonVariants({ variant: 'link', className: 'gap-1.5 w-fit mx-auto px-0' })}>
                        Já tem uma conta? Entrar
                        <ArrowRightIcon className="w-4 h-4" />
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
                                </div>

                                <div className="grid gap-2 py-2">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input
                                        {...register('password')}
                                        placeholder="Senha"
                                        type="password"
                                        id="password"
                                        className={cn({
                                            "focus-visible:ring-red-500": errors.password
                                        })}
                                    />
                                </div>

                                <Button>Entrar</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
