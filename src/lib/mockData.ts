import type { Category, Item, ModifierGroup,  Variant } from './types'

export const categories: Category[] = [
  { id: 'c1', name: 'Burgers', slug: 'burgers', active: true, sort: 1 },
  { id: 'c2', name: 'Pizzas', slug: 'pizzas', active: true, sort: 2 },
  { id: 'c3', name: 'Drinks', slug: 'drinks', active: true, sort: 3 },
]

const burgerVariants: Variant[] = [
  { id: 'v-s', name: 'Small',  priceDiff: 0 },
  { id: 'v-m', name: 'Medium', priceDiff: 1500 },
  { id: 'v-l', name: 'Large',  priceDiff: 3000 },
]

const extrasGroup: ModifierGroup = {
  id: 'mg-extras',
  name: 'Extras',
  min: 0,
  max: 3,
  options: [
    { id: 'm-cheese', name: 'Extra Cheese', priceDiff: 1200 },
    { id: 'm-bacon',  name: 'Bacon',        priceDiff: 1800 },
    { id: 'm-avocado',name: 'Avocado',      priceDiff: 2000 },
  ],
}

const saucesGroup: ModifierGroup = {
  id: 'mg-sauces',
  name: 'Sauces',
  min: 0,
  max: 2,
  options: [
    { id: 'm-mayo', name: 'Mayo',      priceDiff: 0 },
    { id: 'm-bbq',  name: 'BBQ',       priceDiff: 0 },
    { id: 'm-chip', name: 'Chipotle',  priceDiff: 0 },
  ],
}

export const items: Item[] = [
  {
    id: 'i1',
    categoryId: 'c1',
    name: 'Signature Smash Burger',
    slug: 'signature-smash-burger',
    desc: 'Juicy double smash patty, caramelized onions, house sauce.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop',
    basePrice: 79900,
    rating: 4.8,
    tags: ['best-seller', 'spicy'],
    variants: burgerVariants,
    modifierGroups: [extrasGroup, saucesGroup],
    active: true,
    taxClass: 'standard',
  },
  {
    id: 'i2',
    categoryId: 'c1',
    name: 'Crispy Chicken Burger',
    slug: 'crispy-chicken-burger',
    desc: 'Buttermilk fried chicken, pickles, garlic aioli.',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=1200&auto=format&fit=crop',
    basePrice: 69900,
    rating: 4.6,
    tags: ['new'],
    variants: burgerVariants,
    modifierGroups: [extrasGroup, saucesGroup],
    active: true,
    taxClass: 'standard',
  },
  {
    id: 'i3',
    categoryId: 'c2',
    name: 'Margherita Pizza',
    slug: 'margherita-pizza',
    desc: 'San Marzano tomatoes, fresh mozzarella, basil.',
    image: 'https://images.unsplash.com/photo-1541745537413-b804bcb07334?q=80&w=1200&auto=format&fit=crop',
    basePrice: 89900,
    rating: 4.7,
    tags: ['veg'],
    variants: [
      { id: 'p-9',  name: '9"',  priceDiff: 0 },
      { id: 'p-12', name: '12"', priceDiff: 2500 },
      { id: 'p-16', name: '16"', priceDiff: 5500 },
    ],
    modifierGroups: [extrasGroup],
    active: true,
    taxClass: 'standard',
  },
  {
    id: 'i4',
    categoryId: 'c3',
    name: 'Sparkling Lemonade',
    slug: 'sparkling-lemonade',
    desc: 'House-made lemonade with a fizzy twist.',
    image: 'https://images.unsplash.com/photo-1513558161293-cafd4760d9a6?q=80&w=1200&auto=format&fit=crop',
    basePrice: 24900,
    rating: 4.5,
    tags: [],
    active: true,
    taxClass: 'zero',
  },
]
