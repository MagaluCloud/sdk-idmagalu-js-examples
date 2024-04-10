import createClient from "@magalucloud/sdk-idmagalu-js";

const initializeClient = async () => {
  const clientIDMagalu = await createClient({
    client_id: "YOUR_CLIENT_ID",
    redirect_uri: "http://localhost:3000",
    useRefreshTokens: true,
  });

  const loginButton = document.getElementById("login-contained-48");
  const redirectCallbackButton = document.getElementById("redirectCallback");
  const getUserButton = document.getElementById("getUser");
  const getTokenButton = document.getElementById("getToken");

  const cardAccessToken = document.getElementById("access-token");
  const cardUserInformation = document.getElementById("user-information");

  const isAuthenticatedValue = document.getElementById("isAuthenticated-value");

  const logoutButton = document.getElementById("logout");

  const isAuthenticated = clientIDMagalu.isAuthenticated();

  if (loginButton) {
    loginButton.addEventListener("click", async () => {
      await clientIDMagalu.login();
    });
  }

  if (redirectCallbackButton) {
    redirectCallbackButton.addEventListener("click", async () => {
      await clientIDMagalu.handleRedirectCallback();
      location.reload();
    });
  }

  if (getUserButton) {
    getUserButton.addEventListener("click", () => {
      const cardBody = document.querySelector("#user-information .card-body");
      const user = clientIDMagalu.getUser();
      if (!user || !cardBody || !cardUserInformation) return;

      cardUserInformation.style.display = "block";
      cardBody.innerHTML = `<pre>${JSON.stringify(user, null, 2)}</pre>`;
    });
  }

  if (getTokenButton) {
    getTokenButton.addEventListener("click", () => {
      const cardBody = document.querySelector("#access-token .card-body");
      const accessToken = clientIDMagalu.getToken();
      if (!accessToken || !cardBody || !cardAccessToken) return;

      const value = JSON.stringify(accessToken).slice(1, 50) + "...";
      const content = `<ul>
        <li data-cy="access-token">
          ${value} (
          <a
            href="https://jwt.io?token=${accessToken}"
            target="_blank"
          >
            view
          </a>
          )
        </li>
      </ul>`;
      cardAccessToken.style.display = "block";
      cardBody.innerHTML = content;
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      await clientIDMagalu.logout();
      location.reload();
    });
  }

  if (isAuthenticatedValue) {
    isAuthenticatedValue.innerHTML = isAuthenticated.toString();
  }

  if (isAuthenticated) {
    const btnLogin = loginButton as HTMLButtonElement;
    const btnRedirectCallback = redirectCallbackButton as HTMLButtonElement;
    btnLogin.disabled = true;
    btnRedirectCallback.disabled = true;
  }
};

initializeClient();
