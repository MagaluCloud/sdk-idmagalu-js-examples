## Getting Started

#### Instalation

Install the project dependencies

```shell
npm install
```

In the _src/main.ts_ file, include your application's `client_id`.

```js
const clientIDMagalu = await createClient({
  client_id: "<YOUR_CLIENT_ID>",
  redirect_uri: "http://localhost:3000",
});
```

Finally, start the server

```shell
npm dev
```
