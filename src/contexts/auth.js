import React, { createContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [ logado, setLogado ] = useState(false);

    function setStatus(status) {
        setLogado(status);
    }

    return (
        <AuthContext.Provider value={{ logado, setStatus }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;