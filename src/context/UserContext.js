import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [userRole, setUserRole] = useState("admin"); // default role

    useEffect(() => {
        // Fetch role from localStorage and update state
        const roleFromToken = localStorage.getItem('userRole'); // Adjust this to your token logic like [accessToken, userRole, Token] whatever do something.. from backend
        if (roleFromToken) {
            setUserRole(roleFromToken);
        }
    }, []);

    return (
        <UserContext.Provider value={{ userRole, setUserRole }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
