export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  popular?: boolean;
  sizes: Array<{ label: string; price: number }>;
  artColor: string;
  drinkColor: string;
};

export const categories = [
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
    sizes: [{ label: 'обычный', price: 210 }, { label: 'большой', price: 250 }],
    artColor: '#F0C8B5',
    drinkColor: '#B57B55',
  },
  {
    id: 'latte',
    name: 'латте',
    description: 'Мягкий кофейный напиток с большим количеством молока.',
    category: 'classic',
    popular: true,
    sizes: [{ label: '350 мл', price: 250 }],
    artColor: '#CDE8E7',
    drinkColor: '#C7976B',
  },
  {
    id: 'flat-white',
    name: 'флэт уайт',
    description: 'Насыщенный двойной эспрессо с молоком.',
    category: 'classic',
    sizes: [{ label: '250 мл', price: 230 }],
    artColor: '#EADFC7',
    drinkColor: '#9A603F',
  },
  {
    id: 'v60',
    name: 'воронка V60',
    description: 'Чистый вкус зерна, приготовленного ручным способом.',
    category: 'classic',
    sizes: [{ label: '300 мл', price: 300 }],
    artColor: '#BFD8CB',
    drinkColor: '#7E4D31',
  },
  {
    id: 'ice-latte',
    name: 'айс-латте',
    description: 'Холодный эспрессо, молоко и лёд.',
    category: 'cold',
    popular: true,
    sizes: [{ label: '400 мл', price: 300 }],
    artColor: '#A8D9E3',
    drinkColor: '#B98158',
  },
  {
    id: 'bumble',
    name: 'бамбл',
    description: 'Эспрессо, апельсиновый сок и лёд.',
    category: 'cold',
    popular: true,
    sizes: [{ label: '400 мл', price: 350 }],
    artColor: '#FFD58A',
    drinkColor: '#F39422',
  },
  {
    id: 'espresso-tonic',
    name: 'эспрессо-тоник',
    description: 'Бодрящий эспрессо с тоником и льдом.',
    category: 'cold',
    sizes: [{ label: '400 мл', price: 300 }],
    artColor: '#D7E8A6',
    drinkColor: '#A67A3E',
  },
  {
    id: 'matcha-orange',
    name: 'матча-апельсин',
    description: 'Матча, апельсиновый сок и лёд.',
    category: 'cold',
    sizes: [{ label: '400 мл', price: 370 }],
    artColor: '#C9D792',
    drinkColor: '#95AD4F',
  },
  {
    id: 'classic-raf',
    name: 'раф классика',
    description: 'Сливочный кофейный напиток с ванильным ароматом.',
    category: 'sweet',
    popular: true,
    sizes: [{ label: '350 мл', price: 290 }],
    artColor: '#EAC5D3',
    drinkColor: '#C78D68',
  },
  {
    id: 'cocoa',
    name: 'какао',
    description: 'Горячий шоколадный напиток на молоке.',
    category: 'not-coffee',
    sizes: [{ label: 'обычный', price: 200 }, { label: 'большой', price: 250 }],
    artColor: '#E8C2A7',
    drinkColor: '#75432E',
  },
  {
    id: 'matcha-latte',
    name: 'матча-латте',
    description: 'Японская матча и взбитое молоко.',
    category: 'not-coffee',
    sizes: [{ label: '350 мл', price: 270 }],
    artColor: '#DCE6AA',
    drinkColor: '#98AF55',
  },
  {
    id: 'matcha-strawberry',
    name: 'матча-клубника',
    description: 'Матча, молоко и яркий клубничный слой.',
    category: 'seasonal',
    popular: true,
    sizes: [{ label: '400 мл', price: 370 }],
    artColor: '#F3B9C5',
    drinkColor: '#A8BE63',
  },
  {
    id: 'peach-passion',
    name: 'персик-маракуйя',
    description: 'Освежающий сезонный лимонад.',
    category: 'seasonal',
    sizes: [{ label: '400 мл', price: 280 }],
    artColor: '#FFD1A8',
    drinkColor: '#F2A348',
  },
  {
    id: 'barberry-pomegranate',
    name: 'барбарис-гранат',
    description: 'Кисло-сладкий лимонад с гранатом.',
    category: 'seasonal',
    sizes: [{ label: '400 мл', price: 280 }],
    artColor: '#F0A1A1',
    drinkColor: '#B9233B',
  },
];
