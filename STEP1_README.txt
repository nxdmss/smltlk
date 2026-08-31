SMALL TALK — STEP 1 REFACTOR

Что делать:
1. Закрой запущенный Expo dev server, если хочешь избежать кэша.
2. Распакуй содержимое ZIP прямо в корень проекта small-talk-app.
3. Согласись на замену App.tsx.
4. Папки src/components и src/screens объединятся с существующими.
5. Запусти:

   npx tsc --noEmit
   npm start

Что изменено:
- App.tsx оставлен как контейнер состояния и навигации.
- Экраны вынесены в src/screens/.
- Общие UI-компоненты вынесены в src/components/.
- Общие стили перенесены в src/styles.ts.
- Типы корзины/экранов вынесены в src/types.ts.
- rubles() вынесен в src/utils.ts.

Дизайн, тексты, цены, логика корзины, checkout и поведение не менялись намеренно.

Если после распаковки Metro/Expo покажет старый кэш:
   npx expo start -c
