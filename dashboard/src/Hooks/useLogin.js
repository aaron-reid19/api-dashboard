//imports usestate hook from react, allowing you to manage local state within the useLogin hook
import { useState } from "react";
//provides a custom hook which provides access to the authentication context. this is used for global state
import { useAuthContext } from "./useAuthContext"; 

// defines and exports a custom hook named useLogin, which encapsulates the login logic for reusability
export const useLogin = () => {
    //initializes error state to null, this state will store error messages if login process fails
    const [ error, setError ] = useState(null)
    // initializes isLoading state to null. this state indicates whether the login request is in progress
    const [ isLoading, setIsLoading] = useState(null)
    //destructures dispath from useauth context hook, the dispatch function will be used to update the global authentication state
    const { dispatch } = useAuthContext()


    //declares an asynchronus function login that takes email and password as arguments, 
    // this function handles the login logic
    const login = async (email, password) => {
        //sets isLoading state to true, indicating that the login process has started
        setIsLoading(true)
        // sets error state to null
        setError(null) 

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        }) 
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({ type: 'LOGIN', payload:json})
            setIsLoading(false)
        }
    }
    return {login, isLoading, error }
}