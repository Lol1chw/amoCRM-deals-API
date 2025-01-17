# О проекте
API-приложение для доступа к сделкам на платформе amoCRM (read-only) и их контактам.
Пользователю доступно:
 - Основная информация о сделке:
   - Название
   - Статус
   - Бюджет
   - Ответственный за сделку
   - Дата создания

В подстроках таблицы также имеется дополнительная информация о сделке - закрепленные за ней контакты и информация о контактах:
 - Имя контакта
 - Номер телефона
 - Email

## Built with:

#### Frontend:
- Typescript
- Vue
- Shadcn-vue
- TailwindCSS
- Tanstack/vue-table

### Backend:
- Typescript
- Bun

# Project setup
В репозитории /server создайте .env и переменную TOKEN с долгосрочным токеном
```sh
touch .env
```

```sh
`-.env`
TOKEN=<TOKEN>
```

### Dev
```sh
bun --filter "*" dev
```

### Production
```sh
bun --filter "start"
```
