import { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

type User = {
  name: string;
};

type CadasterData = {
  name: string;
  password: string;
};

type AuthData = {
  cadaster(data: CadasterData): Promise<void>;
  login(data: CadasterData): Promise<void>;
  user?: User;
  isOk?: string;
  setIsOk: React.Dispatch<React.SetStateAction<string>>
  erro?: boolean;
  setErro: React.Dispatch<React.SetStateAction<boolean>>
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();
  const [isOk, setIsOk] = useState<string>('');
  const [erro, setErro] = useState<boolean>(false);

  let navigate = useNavigate();

  const cadaster = async ({ name, password }: CadasterData) => {
    try {
      const response = await api.post("/user/cadaster", {
        name,
        password,
      });
      if(response.data.ok === true) {
        setIsOk('success')
      }

    } catch (e) {
      setIsOk('exist')
    }
  };

  const login = async ({ name, password }: CadasterData) => {
    try {
      const response = await api.post("/login", {
        name,
        password,
      });
      setUser({ name });
      navigate("/home");
    } catch (e) {
      setErro(true);

    }
  };

  return (
    <AuthContext.Provider value={{ cadaster, login, user, isOk, setIsOk, erro, setErro }}>
      {children}
    </AuthContext.Provider>
  );
};
