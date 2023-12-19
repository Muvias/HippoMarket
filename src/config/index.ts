export const PRODUCT_CATEGORIES = [
    {
        label: 'UI Kits',
        value: 'ui_kits' as const,
        featured: [
            {
                name: 'Escolhas do Editor',
                href: '/products?category=ui_kits',
                imageSrc: '/nav/ui-kits/mixed.jpg'
            },
            {
                name: 'Novidades',
                href: '/products?category=ui_kits&sort=desc',
                imageSrc: '/nav/ui-kits/blue.jpg'
            },
            {
                name: 'Mais Vendidos',
                href: '/products?category=ui_kits',
                imageSrc: '/nav/ui-kits/purple.jpg'
            }
        ]
    },
    {
        label: 'Ícones',
        value: 'icons' as const,
        featured: [
            {
                name: 'Ícones Favoritos',
                href: '/products?category=icons',
                imageSrc: '/nav/icons/picks.jpg'
            },
            {
                name: 'Novidades',
                href: '/products?category=icons&sort=desc',
                imageSrc: '/nav/icons/new.jpg'
            },
            {
                name: 'Ícones Mais Vendidos',
                href: '/products?category=icons',
                imageSrc: '/nav/icons/bestsellers.jpg'
            }
        ]
    },
]