import {AuthContext }  from "../Context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be used inside an authcontextprovider')
    }
    return context
}

//Summary
//This custom hook simplifies access to the AuthContext.
//It ensures that AuthContext is used correctly by enforcing the presence of a AuthContext.Provider in the component tree.
//It abstracts away the useContext logic, making the codebase cleaner and easier to maintain.