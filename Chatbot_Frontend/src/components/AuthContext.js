// import React, {
//     createContext,
//     useState
// } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({
//     children
// }) => {
//     const [isRegistered, setIsRegistered] = useState(false);

//     const register = () => {
//         setIsRegistered(true);
//     };

//     const logout = () => {
//         setIsRegistered(false);
//     };

//     return ( <AuthContext.Provider value={
//         {
//             isRegistered,
//             register,
//             logout
//         }
    
//     }>{children}


//        </AuthContext.Provider> 
//     );
// };
