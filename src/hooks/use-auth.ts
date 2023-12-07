import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function useAuth() {
    const router = useRouter()

    async function signOut() {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "appication/json"
                }
            })

            if (!res.ok) throw new Error()

            toast.success("Sucesso ao sair")

            router.push("/sign-in")
            router.refresh()
        } catch (error) {
            toast.error("Não foi possível sair, por favor tente novamente.")
        }
    }

    return { signOut }
}