# Bloodrush

What is primsa? https://www.youtube.com/watch?v=rLRIB6AF2Dg

Use...
npx prisma studio

## Setup

Install planescale & mysql

- brew install planetscale/tap/pscale
- brew install mysql-client

Push prisma schema to planetscale

- npx prisma db push

Log into dev db

- brew upgrade pscale
- pscale auth login
- pscale shell bloodrush dev

## Scripting

Switch to DATABASE_SCRIPTING_URL in prisma schema as your connection string - see [here](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-pool#default-pool-timeout)
Set up scripts
Run them with npm run x

## Development

Generate local prisma code from schema files with npm run generate
Push schema changes to planetscale dev with npm run push
Run local dev server with npm run dev

## Deployment

## Vercel

## Useful resources

Here are some resources that we commonly refer to:

- [Protecting routes with Next-Auth.js](https://next-auth.js.org/configuration/nextjs#unstable_getserversession)
- [Prisma](https://prisma.io)
- [TailwindCSS](https://tailwindcss.com)
- [tRPC](https://trpc.io) (using @next version? [see v10 docs here](https://trpc.io/docs/v10/))
- [Next-Auth.js](https://next-auth.js.org)

## Why are there `.js` files in here?

As per [T3-Axiom #3](https://github.com/t3-oss/create-t3-app/tree/next#3-typesafety-isnt-optional), we take typesafety as a first class citizen. Unfortunately, not all frameworks and plugins support TypeScript which means some of the configuration files have to be `.js` files.

We try to emphasize that these files are javascript for a reason, by explicitly declaring its type (`cjs` or `mjs`) depending on what's supported by the library it is used by. Also, all the `js` files in this project are still typechecked using a `@ts-check` comment at the top.
