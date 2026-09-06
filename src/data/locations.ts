export type CoffeeShop = {
  id: string;
  name: string;
  address: string;
  schedule: string;
  phone: string;
  coordinate: { latitude: number; longitude: number };
};

export const coffeeShops: CoffeeShop[] = [
  {
    id: 'malaguseynova',
    name: 'Small Talk №1',
    address: 'ул. Малагусейнова, 23',
    schedule: '08:00–22:00',
    phone: '+7 989 462-73-53',
    coordinate: { latitude: 43.194745, longitude: 46.882075 },
  },
  {
    id: 'gagarina',
    name: 'Small Talk №2',
    address: 'ул. Гагарина, 32',
    schedule: '08:00–23:00',
    phone: '+7 928 578-20-88',
    coordinate: { latitude: 43.201036, longitude: 46.865010 },
  },
  {
    id: 'tsadasa',
    name: 'Small Talk №3',
    address: 'ул. Гамзата Цадаса, 10Б',
    schedule: '08:00–00:00',
    phone: '+7 928 277-73-60',
    coordinate: { latitude: 43.198473, longitude: 46.867525 },
  },
  {
    id: 'shamilya',
    name: 'Small Talk №4',
    address: 'пр. Имама Шамиля, 1А',
    schedule: '08:00–00:00',
    phone: 'уточнить',
    coordinate: { latitude: 43.200431, longitude: 46.865701 },
  },
];
