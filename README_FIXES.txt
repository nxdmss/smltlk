Что исправлено:
- Убран баг с TypeScript absoluteFillObject.
- tsconfig теперь проверяет только App.tsx, index.ts и src/**, поэтому вложенные старые папки больше не ломают npx tsc.
- Подключена 2ГИС карта (web + mobile through WebView).
- Основной дизайн стал темнее и взрослее.
- Возвращены живые мокапы напитков через assets/products/*.png.
- 4-я точка сдвинута ближе к 3-й и напротив 2-й.

Важно:
1) Распакуй файлы ИМЕННО В КОРЕНЬ ПРОЕКТА C:\Users\umarc\smltlk
2) Если внутри проекта лежат старые папки smltlk-brandbook-full / smltlk-2gis-full, можно удалить их.
3) Потом выполни npm install
4) Потом npx tsc --noEmit
5) Потом npm start
