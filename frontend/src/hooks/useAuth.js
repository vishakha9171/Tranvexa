import { useEffect, useState, useRef } from 'react';
import Keycloak from 'keycloak-js';

function useAuth() {
  const [isLogin, setLogin] = useState(false);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const client = new Keycloak({
      url: import.meta.env.VITE_KEYCLOAK_URL,
      realm: import.meta.env.VITE_KEYCLOAK_REALM,
      clientId: import.meta.env.VITE_KEYCLOAK_CLIENT
    });

    client.init({
      onLoad: 'login-required', 
      checkLoginIframe: false
    })
    .then((authenticated) => {
      setLogin(authenticated);
    })
    .catch((err) => {
      console.error("Keycloak authentication engine failure:", err);
    });
  }, []);

  return isLogin;
}

export default useAuth;