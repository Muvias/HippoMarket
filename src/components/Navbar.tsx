import { cookies } from 'next/headers';
import Link from "next/link";
import { getServerSideUser } from "../lib/payload-utils";
import { Cart } from "./Cart";
import { Icons } from "./Icons";
import { MaxWidthWapper } from "./MaxWidthWapper";
import { NavItems } from "./NavItems";
import { UserAccountNav } from './UserAccountNav';
import { buttonVariants } from "./ui/button";
import { MobileNav } from './MobileNav';

export async function Navbar() {
    const nextCookies = cookies()
    const { user } = await getServerSideUser(nextCookies)

    return (
        <div className="sticky top-0 h-16 inset-x-0 bg-white z-50">
            <header className="relative bg-white">
                <MaxWidthWapper>
                    <div className="border-b border-gray-200">
                        <div className="flex items-center h-16">
                            <MobileNav />

                            <div className="flex ml-4 lg:ml-0">
                                <Link href='/'>
                                    <Icons.logo className="w-10 h-10" />
                                </Link>
                            </div>

                            <div className="hidden lg:block lg:self-stretch lg:ml-8 z-50">
                                <NavItems />
                            </div>

                            <div className="flex items-center ml-auto">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    {user ? null : (
                                        <Link
                                            href='/sign-in'
                                            className={buttonVariants({ variant: 'ghost' })}
                                        >
                                            Entrar
                                        </Link>
                                    )}

                                    {user ? null : (
                                        <span
                                            className="h-6 w-px bg-gray-200"
                                            aria-hidden="true"
                                        />
                                    )}

                                    {user ? (
                                        <UserAccountNav user={user} />
                                    ) : (
                                        <Link
                                            href='/sign-up'
                                            className={buttonVariants({ variant: 'ghost' })}
                                        >
                                            Criar conta
                                        </Link>
                                    )}

                                    {user ? (
                                        <span
                                            className="h-6 w-px bg-gray-200"
                                            aria-hidden="true"
                                        />
                                    ) : null}

                                    {user ? null : (
                                        <div
                                            className='flex lg:ml-6'
                                        >
                                            <span
                                                className="h-6 w-px bg-gray-200"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flow-root ml-4 lg:ml-6">
                                    <Cart />
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthWapper>
            </header>
        </div>
    )
}
