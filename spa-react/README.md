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

1. Acesse o portal [ID Magalu](https://id.magalu.com/login) e crie sua conta
2. Baixe o [CLI da Magalu Cloud](https://docs.magalu.cloud/docs/cli-mgc/overview/) para criar sua aplicação
3. Crie sua aplicação no MGC CLI através deste [guia](https://docs.magalu.cloud/docs/cli-mgc/how-to/create-app)
4. Baixe o [ID Magalu SDK](https://docs.magalu.cloud/docs/id-magalu/how-to/id-magalu-sdks) para iniciar a implementação
5. Adicione o botão ID Magalu

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
npm install @magalucloud/sdk-idmagalu-react
```

#### Integrate with your app

The SDK uses a React Context Provider to maintain its internal state in your application.

Import the AuthProvider component and wrap your application in it.

```jsx
import { AuthProvider } from "@magalucloud/sdk-idmagalu-react";

const App = () => (
  <AuthProvider
    clientId="YOUR_CLIENT_ID"
    redirectUri="YOUR_REDIRECT_URI"
    scope="YOUR_SCOPE"
  >
    <Routes />
  </AuthProvider>
);
```

The **scope** property is optional and if not entered, its default value becomes `openid profile``.

### Logging In

The `login` method must be used to start the authentication flow.

```jsx
import { useAuth } from "@magalucloud/sdk-idmagalu-react";

function AuthenticationButton() {
  const { login } = useAuth();

  return (
    <Button color="primary" variant="contained" onClick={login}>
      Sign In
    </Button>
  );
}

export default AuthenticationButton;
```

After completing authentication on the ID Magalu, a redirect will be sent back to the address entered in `redirect_uri`, containing the authorization code as a parameter in the URL.

### Code Exchange

When redirected back to your application, the ID Magalu SDK provides a method called `handleRedirectCallback`, which is responsible for completing authentication by exchanging the authorization code obtained following the PKCE Flow for the access token.

In order for this event to be used, the application must be able to validate the presence of the CODE as a URL parameter immediately after the redirect that occurred when completing the authentication stage in ID Magalu.

```jsx
import { useAuth } from "@magalucloud/sdk-idmagalu-react";

function RedirectCallbackButton() {
  const { handleRedirectCallback } = useAuth();

  return (
    <Button
      color="primary"
      variant="contained"
      onClick={handleRedirectCallback}
    >
      RedirectCallback
    </Button>
  );
}

export default RedirectCallbackButton;
```

We can also do it silently by adding the `getTokenSilently` property to **true** when creating the instance, as shown in the code below:

```jsx
import { AuthProvider } from "@magalucloud/sdk-idmagalu-react";

const App = () => (
  <AuthProvider
    clientId="YOUR_CLIENT_ID"
    redirectUri="YOUR_REDIRECT_URI"
    scope="YOUR_SCOPE"
    getTokenSilently={true}
  >
    <Routes />
  </AuthProvider>
);
```

### Token storage in the authentication state

By default, the JWTs provided by the Magalu ID are stored in memory. This protects against CSRF attacks (possible if stored as a client-side cookie) and XSS attacks (possible if persisted in local storage).

The disadvantage of this approach, however, is that if a page is refreshed or a new tab is opened, the token will be erased from memory and the login button will need to be clicked again to authenticate.

### Rotating Refresh Tokens

The ID Magalu SDK can be configured to use refresh token rotation in order to obtain new access tokens silently.

Refresh token rotation is a fundamental practice for improving security in authentication and authorization systems. This technique consists of regularly replacing access tokens with new tokens, usually using refresh tokens. By using refresh token rotation, systems can significantly reduce the impact of possible security breaches.

To enable the use of this practice, set the `useRefreshTokens` property to **true**.

```jsx
import { AuthProvider } from "@magalucloud/sdk-idmagalu-react";

const App = () => (
  <AuthProvider
    clientId="YOUR_CLIENT_ID"
    redirectUri="YOUR_REDIRECT_URI"
    scope="YOUR_SCOPE"
    useRefreshTokens={true}
  >
    <Routes />
  </AuthProvider>
);
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

```jsx
import {useAuth} from '@magalucloud/sdk-idmagalu-react';

function component() {
  const {isAuthenticated} = useAuth();

  const getSessionStatus = () => {
    const isActive: Boolean = isAuthenticated()
  };

  ...
}
```

### Get user information

Use the `getUser` method to obtain active user information.

```jsx
import {useAuth} from '@magalucloud/sdk-idmagalu-react';

interface User {
  email: string;
  name: string;
  profile_image_url: string;
}

function component() {
  const {getUser} = useAuth();

  const getUserInformation = () => {
    const user: User = getUser()
  };

  ...
}
```

### Get Access Token

The `getToken` method returns the access token stored in memory.

```jsx
import {useAuth} from '@magalucloud/sdk-idmagalu-react';

function component() {
  const {getToken} = useAuth();

  const getSessionToken = () => {
    const accessToken: String = getToken()
  };

  ...
}
```

### Logout

The `logout method` disconnects the user from the Magalu ID. To do this, we make a request to the `/logout` endpoint in order to revoke the session token.

```jsx
import { useAuth } from "@magalucloud/sdk-idmagalu-react";

function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button color="primary" variant="contained" onClick={logout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
```
