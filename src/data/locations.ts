export type CoffeeShop = {
  id: string;
  name: string;
  address: string;
  schedule: string;
  phone: string;
  coordinate: { latitude: number; longitude: number };
  mapPosition: { top: `${number}%`; left: `${number}%` };
};

export const coffeeShops: CoffeeShop[] = [
  {
    id: 'malaguseynova',
    name: 'Small Talk №1',
    address: 'ул. Малагусейнова, 23',
    schedule: '07:55–00:05',
    phone: '+7 989 462-73-53',
    coordinate: { latitude: 43.1954, longitude: 46.8764 },
    mapPosition: { top: '27%', left: '48%' },
  },
  {
    id: 'gagarina',
    name: 'Small Talk №2',
    address: 'ул. Гагарина, 32',
    schedule: '07:55–00:05',
    phone: '+7 928 578-20-88',
    coordinate: { latitude: 43.1952535, longitude: 46.8911518 },
    mapPosition: { top: '34%', left: '76%' },
  },
  {
    id: 'tsadasa',
    name: 'Small Talk №3',
    address: 'ул. Гамзата Цадаса, 10В',
    schedule: '07:55–00:05',
    phone: '+7 928 277-73-60',
    coordinate: { latitude: 43.19669, longitude: 46.87695 },
    mapPosition: { top: '18%', left: '49%' },
  },
  {
    id: 'shamilya',
    name: 'Small Talk №4',
    address: 'пр. Имама Шамиля, 1А',
    schedule: '07:55–00:05',
    phone: 'уточнить',
    coordinate: { latitude: 43.19012, longitude: 46.86197 },
    mapPosition: { top: '67%', left: '20%' },
  },
];
