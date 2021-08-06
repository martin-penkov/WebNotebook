import { useState, createContext } from 'react'
import { authenticationService } from './../services/auth';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState( authenticationService.currentUserValue() );
    const AuthContext = createContext({});
    
      const logout = () => {
        authenticationService.logout()
      };

      const updateLoginStatus = () => {
          setUser(authenticationService.currentUserValue())
      }

    return (
      <AuthContext.Provider value={{ user, logout, updateLoginStatus }}>
        {children}
      </AuthContext.Provider>
    );
};
