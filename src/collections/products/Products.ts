import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";
import { Product } from "../../payload-type";
import { stripe } from "../../lib/stripe";

const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
    const user = req.user

    return {
        ...data,
        user: user.id
    }
}

export const Products: CollectionConfig = {
    slug: "products",
    admin: {
        useAsTitle: "name",
    },
    access: {},
    hooks: {
        beforeChange: [addUser, async (args) => {
            if (args.operation === 'create') {
                const data = args.data as Product

                const createdProduct = await stripe.products.create({
                    name: data.name,
                    default_price_data: {
                        currency: "BRL",
                        unit_amount: Math.round(data.price * 100),
                    }
                })

                const updated: Product = {
                    ...data,
                    stripeId: createdProduct.id,
                    priceId: createdProduct.default_price as string
                }

                return updated
            } else if (args.operation === 'update') {
                const data = args.data as Product

                const updatedProduct = await stripe.products.update(data.stripeId!, {
                    name: data.name,
                    default_price: data.priceId!
                })

                const updated: Product = {
                    ...data,
                    stripeId: updatedProduct.id,
                    priceId: updatedProduct.default_price as string
                }

                return updated
            }
        }]
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition: () => false
            }
        },
        {
            name: "name",
            label: "Nome",
            type: "text",
            required: true
        },
        {
            name: "description",
            label: "Detalhes do Produto",
            type: "textarea",
            required: true
        },
        {
            name: "price",
            label: "Preço em BRL",
            min: 0,
            max: 1000,
            type: "number",
            required: true
        },
        {
            name: "category",
            label: "Categoria do Produto",
            type: "select",
            options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
            required: true
        },
        {
            name: "product_files",
            label: "Arquivo do Produto",
            type: "relationship",
            relationTo: "product_files",
            hasMany: false,
            required: true
        },
        {
            name: "approvedForSale",
            label: "Status do Produto",
            type: "select",
            defaultValue: "pending",
            options: [
                {
                    label: "Verificação pendente",
                    value: "pending"
                },
                {
                    label: "Aprovado",
                    value: "approved"
                },
                {
                    label: "Negado",
                    value: "denied"
                }
            ],
            access: {
                create: ({ req }) => req.user.role === "admin",
                read: ({ req }) => req.user.role === "admin",
                update: ({ req }) => req.user.role === "admin"
            }
        },
        {
            name: "priceId",
            access: {
                create: () => false,
                read: () => false,
                update: () => false
            },
            type: "text",
            admin: {
                hidden: true,
            }
        },
        {
            name: "stripeId",
            access: {
                create: () => false,
                read: () => false,
                update: () => false
            },
            type: "text",
            admin: {
                hidden: true,
            }
        },
        {
            name: "images",
            type: "array",
            label: "Imagens do Produto",
            minRows: 1,
            maxRows: 4,
            labels: {
                singular: "Imagem",
                plural: "Imagens"
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true
                }
            ],
            required: true
        }
    ]
}