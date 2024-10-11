This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



Para iniciar sesion se necesita ingresar un "Master" desde Postman con la url http://localhost:5000/auth/registerMaster

Ejemplo de body: {
"username" : "Nahuel",
"lastname" : "Pages" ,
"firstname" : "Nahuel",
"password" : 1234 ,
"role" : "MASTER"
}

Authorization : No Auth

Esto es solo para estos casos de prueba ya que nuestra idea es tener un Master funcional y eliminar o limitar esta opcion a futuro.

Luego de eso puede ingresar a http://localhost:3000/Master para ingresar sesion con los datos de "Nahuel" y "1234"

de ahi en adelante puede ingresar al sistema como Master y preparar una cooperativa para su ingreso al sistema.

En el momento de ingresar el interes capital necesita acceder a el archivo capital_interes.xls y cargarlo en la cooperativa.
Tenga en cuenta que si no se completan los ingresos de la cooperativa, la pagina administrativa puede generar errores ya que la idea
es preparar la cooperativa antes de su uso. 
