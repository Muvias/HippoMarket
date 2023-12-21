import { PRODUCT_CATEGORIES } from "@/config"
import { getServerSideUser } from "@/lib/payload-utils"
import { MenuIcon } from "lucide-react"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet"
import { UserAccountNav } from "./UserAccountNav"

export async function MobileNav() {
    const nextCookies = cookies()
    const { user } = await getServerSideUser(nextCookies)

    return (
        <Sheet>
            <SheetTrigger className='lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
                <MenuIcon className='h-6 w-6' aria-hidden='true' />
            </SheetTrigger>

            <SheetContent className="flex flex-col w-full xs:max-w-sm sm:max-w-md pr-6 overflow-y-auto" side={"left"}>
                <div>
                    <SheetHeader className="text-start mt-8">
                        <SheetTrigger asChild>
                            {user ? (
                                <UserAccountNav user={user} />
                            ) : (
                                <Link
                                    href='/sign-in'
                                    className={buttonVariants()}>
                                    Entrar
                                </Link>
                            )}
                        </SheetTrigger>
                    </SheetHeader>

                    <ul>
                        {PRODUCT_CATEGORIES.map((category) => (
                            <li
                                key={category.label}
                                className='space-y-6 pb-8 pt-6'
                            >
                                <div className='border-b border-gray-200'>
                                    <div className='flex'>
                                        <p className='flex-1 py-4 text-base font-medium whitespace-nowrap border-b-2 border-transparent text-gray-900'>
                                            {category.label}
                                        </p>
                                    </div>
                                </div>

                                <div className='grid grid-cols-2 gap-y-4 gap-x-4'>
                                    {category.featured.map((item) => (
                                        <SheetTrigger asChild>
                                            <Link
                                                href={item.href}
                                                className='mt-6 block font-medium text-gray-900'
                                                key={item.name}
                                            >
                                                <div
                                                    className='group relative text-sm'>
                                                    <div className='relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75'>
                                                        <Image
                                                            src={item.imageSrc}
                                                            alt='Imagem da categoria do produto'
                                                            fill
                                                            sizes="(max-width: 400px) 40vw, (max-width: 640px) 30vw, 20vw"
                                                            className='object-cover object-center'
                                                        />
                                                    </div>

                                                    <p className="mt-2">
                                                        {item.name}
                                                    </p>
                                                </div>
                                            </Link>
                                        </SheetTrigger>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </SheetContent>
        </Sheet >
    )
}
