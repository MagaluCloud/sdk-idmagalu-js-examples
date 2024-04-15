<div  align="center">
  <img  src="image/logo.png"  alt="Logo">

  <h4 align="center">This guide provides an introduction to how to use the SDK.</h4>
  
  <p align="center">
    <a href="https://docs.magalu.cloud/docs/id-magalu/how-to/first-steps/" target="_blank">Documentation</a> •
    <a href="https://idmagalu.zendesk.com/hc/pt-br/requests/new" target="_blank">Support</a>
  </p>
</div>

## ID Magalu SDK for React

Created for SPA (Single-page application) projects.

## First steps

1. Access the [ID Magalu](https://id.magalu.com/login) portal and create your account
2. Download the [Magalu Cloud CLI](https://docs.magalu.cloud/docs/cli-mgc/overview/) to create your application
3. Create your application in MGC CLI using this [guide](https://docs.magalu.cloud/docs/cli-mgc/how-to/create-app)
4. Download the [ID Magalu SDK](https://docs.magalu.cloud/docs/id-magalu/how-to/id-magalu-sdks) to start implementation
5. Add the ID Magalu button

## How to start this project

### Install dependencies

```shell
npm install
```

Before starting the project, add the necessary information to perform the authentication flow in the `/src/main.ts` file

Fill in the _client_id_ and _redirect_uri_ properties.

### Start project

```shell
npm dev
```

## Getting Started

#### Instalation

Add the ID Magalu SDK as a dependency in your project.

Use [npm](https://npmjs.org/) in your project directory and run the following command:

```shell
npm i @magalucloud/auth-pkce-js
```

#### Configure the SDK

To get started, you need to create a single instance of the ID Magalu SDK before rendering or initializing your application. This can be done using the async/await method or with promisses. This instance only needs to be declared once in your project.

```jsx
import createClient from '@magalucloud/sdk-idmagalu-js'

(async () => {
    const clientIDMagalu = await createClient({
      client_id: '<CLIENT_ID>',
      redirect_uri: '<REDIRECT_URI>',
      scope: '<SCOPE>'
    })
}
```

The **scope** property is optional and if not entered, its default value becomes `openid profile``.

### Logging In

The `login` method must be used to start the authentication flow.

```js
document.getElementById("login").addEventListener("click", async () => {
  await clientIDMagalu.login();
});
```

After completing authentication on the ID Magalu, a redirect will be sent back to the address entered in `redirect_uri`, containing the authorization code as a parameter in the URL.

### Code Exchange

When redirected back to your application, the ID Magalu SDK provides a method called `handleRedirectCallback`, which is responsible for completing authentication by exchanging the authorization code obtained following the PKCE Flow for the access token.

In order for this event to be used, the application must be able to validate the presence of the CODE as a URL parameter immediately after the redirect that occurred when completing the authentication stage in ID Magalu.

```js
if (location.search.includes("code=")) {
  await clientIDMagalu.handleRedirectCallback();
}
```

The method returns the following information:

```js
{
  access_token: string;
  created_at: number;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}
```

We can also do it silently by adding the `getTokenSilently` property to **true** when creating the instance, as shown in the code below:

```jsx
import createClient from '@magalucloud/sdk-idmagalu-js'

(async () => {
    const clientIDMagalu = await createClient({
      client_id: '<CLIENT_ID>',
      redirect_uri: '<REDIRECT_URI>',
      scope: '<SCOPE>',
      getTokenSilently: true
    })
}
```

### Token storage in the authentication state

By default, the JWTs provided by the Magalu ID are stored in memory. This protects against CSRF attacks (possible if stored as a client-side cookie) and XSS attacks (possible if persisted in local storage).

The disadvantage of this approach, however, is that if a page is refreshed or a new tab is opened, the token will be erased from memory and the login button will need to be clicked again to authenticate.

### Rotating Refresh Tokens

The ID Magalu SDK can be configured to use refresh token rotation in order to obtain new access tokens silently.

Refresh token rotation is a fundamental practice for improving security in authentication and authorization systems. This technique consists of regularly replacing access tokens with new tokens, usually using refresh tokens. By using refresh token rotation, systems can significantly reduce the impact of possible security breaches.

To enable the use of this practice, set the `useRefreshTokens` property to **true**.

```jsx
import createClient from '@magalucloud/sdk-idmagalu-js'

(async () => {
    const clientIDMagalu = await createClient({
      client_id: '<CLIENT_ID>',
      redirect_uri: '<REDIRECT_URI>',
      scope: '<SCOPE>',
      useRefreshTokens: true
    })
}
```

Once configured, the ID Magalu SDK will directly call the `/oauth/token` endpoint to update the tokens whenever there is a new render.

Below is an example of this payload:

```typescript
{
  client_id: '<CLIENT_ID>',
  grant_type: 'refresh_token',
  refresh_token: '<REFRESH_TOKEN>'
}
```

### Get session information

Use the `isAuthenticated` method to validate the session status.

```js
document.getElementById("isAuthenticated").addEventListener("click", () => {
  const isAuthenticated: Boolean = clientIDMagalu.isAuthenticated();
});
```

### Get user information

Use the `getUser` method to obtain active user information.

```js
document.getElementById("getUser").addEventListener("click", () => {
  const user: User = clientIDMagalu.getUser();
});
```

Example output:

```typescript
{
  email: string;
  name: string;
  profile_image_url: string;
}
```

### Get Access Token

The `getToken` method returns the access token stored in memory.

```js
document.getElementById("getToken").addEventListener("click", () => {
  const accessToken: String = clientIDMagalu.getToken();
});
```

### Logout

The `logout` method disconnects the user from the Magalu ID. To do this, we make a request to the `/logout` endpoint in order to revoke the session token.

```js
document.getElementById("logout").addEventListener("click", async () => {
  await clientIDMagalu.logout();
});
```
