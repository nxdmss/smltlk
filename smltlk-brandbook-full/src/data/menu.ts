export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  popular?: boolean;
  sizes: Array<{ label: string; price: number }>;
  artColor: string;
  drinkColor: string;
  code: string;
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
  { id: 'cappuccino', name: 'капучино', description: 'Эспрессо, молоко и нежная молочная пена.', category: 'classic', popular: true, sizes: [{ label: 'обычный', price: 210 }, { label: 'большой', price: 250 }], artColor: '#F4F0E8', drinkColor: '#9F694A', code: '01' },
  { id: 'latte', name: 'латте', description: 'Мягкий кофейный напиток с большим количеством молока.', category: 'classic', popular: true, sizes: [{ label: '350 мл', price: 250 }], artColor: '#F2B8A7', drinkColor: '#B9825B', code: '02' },
  { id: 'flat-white', name: 'флэт уайт', description: 'Насыщенный двойной эспрессо с молоком.', category: 'classic', sizes: [{ label: '250 мл', price: 230 }], artColor: '#E6E0D5', drinkColor: '#855136', code: '03' },
  { id: 'v60', name: 'воронка V60', description: 'Чистый вкус зерна, приготовленного ручным способом.', category: 'classic', sizes: [{ label: '300 мл', price: 300 }], artColor: '#111111', drinkColor: '#6F432E', code: '04' },
  { id: 'ice-latte', name: 'айс-латте', description: 'Холодный эспрессо, молоко и лёд.', category: 'cold', popular: true, sizes: [{ label: '400 мл', price: 300 }], artColor: '#F4F0E8', drinkColor: '#AF7D58', code: '05' },
  { id: 'bumble', name: 'бамбл', description: 'Эспрессо, апельсиновый сок и лёд.', category: 'cold', popular: true, sizes: [{ label: '400 мл', price: 350 }], artColor: '#E43C2F', drinkColor: '#F09726', code: '06' },
  { id: 'espresso-tonic', name: 'эспрессо-тоник', description: 'Бодрящий эспрессо с тоником и льдом.', category: 'cold', sizes: [{ label: '400 мл', price: 300 }], artColor: '#AAB96F', drinkColor: '#8E713E', code: '07' },
  { id: 'matcha-orange', name: 'матча-апельсин', description: 'Матча, апельсиновый сок и лёд.', category: 'cold', sizes: [{ label: '400 мл', price: 370 }], artColor: '#F2B8A7', drinkColor: '#8FA34B', code: '08' },
  { id: 'classic-raf', name: 'раф классика', description: 'Сливочный кофейный напиток с ванильным ароматом.', category: 'sweet', popular: true, sizes: [{ label: '350 мл', price: 290 }], artColor: '#E43C2F', drinkColor: '#B77958', code: '09' },
  { id: 'cocoa', name: 'какао', description: 'Горячий шоколадный напиток на молоке.', category: 'not-coffee', sizes: [{ label: 'обычный', price: 200 }, { label: 'большой', price: 250 }], artColor: '#111111', drinkColor: '#6C3D2A', code: '10' },
  { id: 'matcha-latte', name: 'матча-латте', description: 'Японская матча и взбитое молоко.', category: 'not-coffee', sizes: [{ label: '350 мл', price: 270 }], artColor: '#AAB96F', drinkColor: '#95A956', code: '11' },
  { id: 'matcha-strawberry', name: 'матча-клубника', description: 'Матча, молоко и яркий клубничный слой.', category: 'seasonal', popular: true, sizes: [{ label: '400 мл', price: 370 }], artColor: '#F2B8A7', drinkColor: '#9DB25C', code: '12' },
  { id: 'peach-passion', name: 'персик-маракуйя', description: 'Освежающий сезонный лимонад.', category: 'seasonal', sizes: [{ label: '400 мл', price: 280 }], artColor: '#F4F0E8', drinkColor: '#E89B43', code: '13' },
  { id: 'barberry-pomegranate', name: 'барбарис-гранат', description: 'Кисло-сладкий лимонад с гранатом.', category: 'seasonal', sizes: [{ label: '400 мл', price: 280 }], artColor: '#E43C2F', drinkColor: '#9E2332', code: '14' }
];
