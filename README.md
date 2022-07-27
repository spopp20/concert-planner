# Concert Planner

An organizer for music events and the songs and scores that will be used.


## Created with Create T3 App
This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.

```bash
npx create-t3-app concert-planner

Using choices:
* TypeScript
* nextAuth
* prisma
* tailwind
* trpc
```

## Next development steps:

After getting the source code the next steps are:

```bash
  cd concert-planner
  npx prisma db push
  npm run dev
```

## Scripts

```bash
* npm run dev - run the application in development
* npm run build - do a production build
* npm run start - run the application in production mode
* npm run lint - lint the code
```

## Prisma Commands

```bash
* npx prisma db seed - seed the development database with data from prisma/seed.ts
* npx prisma format - formats the prisma schema file
* npx prisma generate - generate the prisma client and zod models
* npx prisma migrate dev --name init - changes the database schema and seeds the database
* npx prisma studio - runs a web app to show database data
```
