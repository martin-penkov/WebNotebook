import { useState, createContext, useMemo } from 'react'
import { authenticationService } from './../services/auth';
import { AuthContext } from './../contexts/AuthContext'

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState( authenticationService.currentUserValue() );
    // const AuthContext = createContext({user, setUser});
    
    const value = useMemo(() => ({ user, setUser }), [user, setUser]);

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
};
