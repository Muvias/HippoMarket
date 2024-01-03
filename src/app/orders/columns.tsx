"use client"

import { Product } from "@/payload-type"
import { ColumnDef } from "@tanstack/react-table"

export type Order = {
  id: string
  product: string
  category: string
  price: number
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
]
