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
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import { toast } from "sonner";
import { ZodError } from "zod";

export default function Page() {
    const { register, handleSubmit, formState: { errors } } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
    })

    const router = useRouter()

    const { mutate: createUser, isLoading } = trpc.auth.createPayloadUser.useMutation({
        onError: (err) => {
            if (err.data?.code === 'CONFLICT') {
                toast.error('Este email já está em uso. Entrar ao invés disso?')

                return
            }

            if (err instanceof ZodError) {
                toast.error(err.issues[0].message)

                return
            }

            toast.error('Algo deu errado. Por favor tente novamente.')
        },
        onSuccess: ({ sentToEmail }) => {
            toast.success(`Email de verificação enviado para ${sentToEmail}`)

            router.push('/verify-email?to=' + sentToEmail)
        }
    })

    function onSubmit({ email, password }: TAuthCredentialsValidator) {
        createUser({ email, password })
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

                                <Button>Criar conta</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
