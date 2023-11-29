import { cn } from "@/lib/utils"

interface MaxWidthWapperProps {
    children: React.ReactNode
    className?: string
}

export function MaxWidthWapper({ children, className }: MaxWidthWapperProps) {
    return (
        <div className={cn("max-w-screen-xl w-full mx-auto px-2.5 md:px-20", className)}>
            {children}
        </div>
    )
}
