import { useNavigate } from "react-router-dom"

const useAuth = () => {
    const navigate = useNavigate()

    const login = (details) =>{
        let data = {
            userId: details.userId,
            firstName: details.firstName,
            lastName: details.lastName,
            email: details.email,
            accessToken: details.accessToken,
            refreshToken: details.refreshToken,
        }
        localStorage.setItem('user', JSON.stringify(data))
    }

    const logout = () =>{
        localStorage.removeItem('user')
        navigate('/login')
    }

    const userDetails = () =>{
        return JSON.parse(localStorage.getItem('user'));
    }

    return { login, logout, userDetails }
}

export default useAuth

// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext(null)

// export const AuthProvider = ({children}) =>{
//     const [user, setUser] = useState(null)

//     const login = (details) =>{
//         let data = {
//             userId: details.userId,
//             firstName: details.firstName,
//             lastName: details.lastName,
//             email: details.email,
//             accessToken: details.accessToken,
//             refreshToken: details.refreshToken,
//         }
//         setUser(data)
//         localStorage.setItem('auth', JSON.stringify(data))
//     }

//     const logout = () =>{
//         setUser(null)
//         localStorage.removeItem('auth')
//     }

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export const useAuth = () =>{
//     return useContext(AuthContext)
// }