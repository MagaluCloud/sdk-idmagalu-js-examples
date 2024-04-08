import { ReactNode } from "react";
import { useAuth } from "@magalucloud/sdk-idmagalu-react";
import { icon } from "./icon";

function App() {
  const { login, logout, isAuthenticated, isLoading, user } = useAuth();

  const getFirstName = (fullName: string) => fullName.split(" ")[0];

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        Carregando...
      </div>
    );

  const SignOut = () => (
    <div className="flex items-center lg:order-2 gap-2 leading-none">
      <div>
        <button
          type="button"
          className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <img
            className="h-8 w-8 rounded-full"
            src={user?.profile_image_url}
            alt=""
          />
        </button>
      </div>
      <div>
        <div className="text-black uppercase text-xs font-bold">
          {user && `Olá, ${getFirstName(user.name)}`}
        </div>
        <a
          className="hover:cursor-pointer text-black hover:underline text-xs"
          onClick={logout}
        >
          sair
        </a>
      </div>
    </div>
  );

  const SignIn = () => (
    <div className="flex items-center lg:order-2">
      <button
        onClick={login}
        className="flex gap-3 text-white items-center bg-blue hover:bg-hover focus:bg-hover font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hover:cursor-pointer"
      >
        <img src={icon} alt="ID Magalu Icon" />
        Entrar com ID Magalu
      </button>
    </div>
  );

  const Header = ({ children }: { children: ReactNode }) => (
    <header className="fixed z-50 h-20 w-full bg-gradient-to-r from-gradient-yellow via-gradient-blue via-gradient-orange via-gradient-pink via-gradient-purple to-gradient-green pt-1">
      <div className="flex h-full items-center justify-between bg-white px-8">
        {children}
      </div>
    </header>
  );

  return (
    <div className="min-h-full">
      <Header>
        <a className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-black">
            React Starter Kit
          </span>
        </a>
        {isAuthenticated ? <SignOut /> : <SignIn />}
      </Header>
    </div>
  );
}

export default App;
