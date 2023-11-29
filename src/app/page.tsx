import { MaxWidthWapper } from "@/components/MaxWidthWapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    name: 'Entrega Imediata',
    Icon: ArrowDownToLine,
    description: 'Receba seus produtos no email em segundos e prontos para baixar.'
  },
  {
    name: 'Qualidade Garantida',
    Icon: CheckCircle,
    description: 'Todos os produtos na nossa plataforma são previamente verificados por nossa equipe garantindo um padrão de qualidade.'
  },
  {
    name: 'Para o Planeta',
    Icon: Leaf,
    description: 'Doamos 1% de nossas vendas para a preservação e restauração da natureza.'
  },
]

export default function Home() {
  return (
    <>
      <MaxWidthWapper>
        <div className="max-w-3xl flex flex-col items-center py-20 mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900">
            Seu marketplace de <span className="text-primary">recursos digitais</span> de alta qualidade
          </h1>
          <p className="max-w-prose mt-6 text-lg text-muted-foreground">
            Bem-vindo ao HippoMarket. Cada produto em nossa plataforma é verificado por nossa equipe para garantir nossos mais altos padrões de qualidade.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href='/products'
              className={buttonVariants()}
            >
              Navegar para Tendências
            </Link>
            <Button
              variant='ghost'
            >
              Nossa promessa de qualidade &rarr;
            </Button>
          </div>
        </div>

        {/* TODO: LIST PRODUCTS */}
      </MaxWidthWapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWapper className="py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:gap-x-6 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="md:flex md:items-start text-center md:text-left lg:block lg:text-center"
              >
                <div className="flex justify-center md:flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-900">
                    <perk.Icon className="w-1/3 h-1/3" />
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWapper>
      </section>
    </>
  )
}
