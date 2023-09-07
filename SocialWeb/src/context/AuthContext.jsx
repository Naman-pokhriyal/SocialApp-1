import { createContext, useContext, useEffect, useState } from "react";
import { checkAuthAPI } from "../utils/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checking() {
      const res = await checkAuthAPI();
      if (res.data.message == "Expired") logout();
      else if (res.data.auth) login(res.data.auth[0]);
      setLoading(false);
    }
    checking();
  }, []);

  // For checking Session After Logining in
  // async function checkSession() {
  //   console.log("Checksss");
  //   const res = await checkAuthAPI();
  //   if (res.data.message == "Expired") logout();
  //   else if (res.data.auth) login(res.data.auth[0]);
  //   setLoading(false);
  // }

  const login = (userInfo) => {
    setUserInfo(userInfo);
    setLoading(false);
  };
  const logout = () => {
    setUserInfo();
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
