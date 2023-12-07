'use client'

import Link from "next/link"
import { User } from "../payload-type"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth"

interface UserAccountNavProps {
    user: User
}

export function UserAccountNav({ user }: UserAccountNavProps) {
    const { signOut } = useAuth()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="overflow-visible">
                <Button variant='ghost' size='sm' className="relative">
                    Minha conta
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-60 bg-white" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col leading-none space-y-0.5">
                        <p className="font-medium text-sm text-black">
                            {user.email}
                        </p>
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href='/sell'>
                        Página de Vendedor
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
                    Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
