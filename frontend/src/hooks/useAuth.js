import { useEffect, useState } from 'react'
import Keycloak from 'keycloak-js'

function useAuth() {
  const {isLogin,setLogin}  = useState(false)
  const [keycloakInstance, setKeycloakInstance] = useState(null);
  
  useEffect(()=>{
    const client=new Keycloak({
     url:import.meta.env.VITE_KEYCLOAK_URL,
     realm:import.meta.env.VITE_KEYCLOAK_REALM,
     clientId:import.meta.env.VITE_KEYCLOAK_CLIENT
    })
    client.init({
         onLoad:"login required"
    })
        // Inside your client.init().then() loop:
    .then((authenticated) => {
      if (authenticated) {
        window._keycloakToken = client.token;
        
        // Automatically check and refresh the token every 30 seconds if it's near expiration
        setInterval(() => {
          client.updateToken(70).then((refreshed) => {
            if (refreshed) {
              window._keycloakToken = client.token; // Update with pristine new token
              console.log("Token refreshed successfully");
            }
          }).catch(() => {
            console.error("Failed to refresh token, forcing logout");
            client.logout();
          });
        }, 30000);
      }
      setKeycloakInstance(client);
      setLogin(authenticated);
    })
  })

  const logout = () => {
    if (keycloakInstance) {
      window._keycloakToken = null;
      keycloakInstance.logout({ redirectUri: window.location.origin });
    }
  };

  return { isLogin, logout };
}

export default useAuth



