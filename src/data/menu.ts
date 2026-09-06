export type ProductCategory =
  | 'classic'
  | 'cold'
  | 'sweet'
  | 'not-coffee'
  | 'seasonal';

export type MenuCategory = ProductCategory | 'popular';

export type ProductSize = {
  label: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  popular?: boolean;
  sizes: ProductSize[];
};

export const categories: Array<{ id: MenuCategory; label: string }> = [
  { id: 'popular', label: 'популярное' },
  { id: 'classic', label: 'классика' },
  { id: 'cold', label: 'холодное' },
  { id: 'sweet', label: 'сладкое' },
  { id: 'not-coffee', label: 'не кофе' },
  { id: 'seasonal', label: 'новинки' },
];

export const menu: Product[] = [
  {
    id: 'cappuccino',
    name: 'капучино',
    description: 'Эспрессо, молоко и нежная молочная пена.',
    category: 'classic',
    popular: true,
    sizes: [
      { label: 'обычный', price: 210 },
      { label: 'большой', price: 250 },
    ],
  },
  {
    id: 'latte',
    name: 'латте',
    description: 'Мягкий кофейный напиток с большим количеством молока.',
    category: 'classic',
    popular: true,
    sizes: [{ label: '350 мл', price: 250 }],
  },
  {
    id: 'flat-white',
    name: 'флэт уайт',
    description: 'Насыщенный двойной эспрессо с молоком.',
    category: 'classic',
    sizes: [{ label: '250 мл', price: 230 }],
  },
  {
    id: 'v60',
    name: 'воронка V60',
    description: 'Чистый вкус зерна, приготовленного ручным способом.',
    category: 'classic',
    sizes: [{ label: '300 мл', price: 300 }],
  },
  {
    id: 'ice-latte',
    name: 'айс-латте',
    description: 'Холодный эспрессо, молоко и лёд.',
    category: 'cold',
    popular: true,
    sizes: [{ label: '400 мл', price: 300 }],
  },
  {
    id: 'bumble',
    name: 'бамбл',
    description: 'Эспрессо, апельсиновый сок и лёд.',
    category: 'cold',
    popular: true,
    sizes: [{ label: '400 мл', price: 350 }],
  },
  {
    id: 'espresso-tonic',
    name: 'эспрессо-тоник',
    description: 'Бодрящий эспрессо с тоником и льдом.',
    category: 'cold',
    sizes: [{ label: '400 мл', price: 300 }],
  },
  {
    id: 'matcha-orange',
    name: 'матча-апельсин',
    description: 'Матча, апельсиновый сок и лёд.',
    category: 'cold',
    sizes: [{ label: '400 мл', price: 370 }],
  },
  {
    id: 'classic-raf',
    name: 'раф классика',
    description: 'Сливочный кофейный напиток с ванильным ароматом.',
    category: 'sweet',
    popular: true,
    sizes: [{ label: '350 мл', price: 290 }],
  },
  {
    id: 'cocoa',
    name: 'какао',
    description: 'Горячий шоколадный напиток на молоке.',
    category: 'not-coffee',
    sizes: [
      { label: 'обычный', price: 200 },
      { label: 'большой', price: 250 },
    ],
  },
  {
    id: 'matcha-latte',
    name: 'матча-латте',
    description: 'Японская матча и взбитое молоко.',
    category: 'not-coffee',
    sizes: [{ label: '350 мл', price: 270 }],
  },
  {
    id: 'matcha-strawberry',
    name: 'матча-клубника',
    description: 'Матча, молоко и яркий клубничный слой.',
    category: 'seasonal',
    popular: true,
    sizes: [{ label: '400 мл', price: 370 }],
  },
  {
    id: 'peach-passion',
    name: 'персик-маракуйя',
    description: 'Освежающий сезонный лимонад.',
    category: 'seasonal',
    sizes: [{ label: '400 мл', price: 280 }],
  },
  {
    id: 'barberry-pomegranate',
    name: 'барбарис-гранат',
    description: 'Кисло-сладкий лимонад с гранатом.',
    category: 'seasonal',
    sizes: [{ label: '400 мл', price: 280 }],
  },
];
