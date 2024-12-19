//create context is used to create a context object, for sharing context accross components
// useReducer a react hook that provides a reducer-based state management system, usefull for complex logic
//useEffect a react hook that allows you to perform side effects, like fetching data or intereacting with local storage
import { createContext, useReducer, useEffect } from "react";

//creates a new context called AuthContext, which will be used to share authentication-related data and actions accross the app
export const AuthContext = createContext()

//defines auth reducer function to handle state transitions for authentication. 
//it takes two arguments
// state: the current context
// and object containing a type
export const authReducer = (state, action) => {
    //checks the type property of the action object to determin how to update the state.
    switch(action.type) {
        // if action type is login, updates the state with a new user object provided in the action.payload
        case 'LOGIN':
            return  { user: action.payload }
        // if action type is LOGOUT, it clears the state by setting it to null.
        case 'LOGOUT':
            return { user: null }
        // if the action type does not match any cases, return the current stant unchanges
        default: 
            return state
    }
}

// creates an AuthContext provider component, AuthContextProvider, which will help wrap parts of the app that need access to athentication data
// accepts a children prop, which represents the components wrapped by the provider.

export const AuthContextProvider = ({children}) => {
    // initializes the state using useReducer
    const [state, dispatch ] = useReducer(authReducer, {
        // { user: null }: the initial state, where user is null
        user: null
    })
    //sets up a side effect that runs after the component mounts
    useEffect(()=>{
        //retrieves user data stored in localstorage
        //JSON.parse converts the stringified user data back into an object
        const user = JSON.parse(localStorage.getItem('user'))
        //if a user object exists
        if (user) {
            //dispatches the login action to update the state with the retrieved user data
            dispatch({ type: 'LOGIN', payload: user})
        }
        //empty [] ensures this effect runs only once when the component mounts, [] is an empty dependancy array
    }, [])
    //loggs the current state of the authenticaion
    console.log('Authentication state:', state)
    return (  
        // wraps child component in the authContext provider
            // wrpping child components in the authcontext.provider prevents prop drilling,
            // centralizes and simplifies state manegmant, 
            //enables components to easily access and update shared state,
            //makes your app more scalable and easier to maintain

        //...state spreads the state object into the provider
        // dispatch makes the dispatch function available for triggering updates
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;