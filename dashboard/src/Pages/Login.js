const Login = () => {
    return ( 
        <div className="container">
            <form className="login" onSubmit="">
        <label>Email:</label>
        <input type="email"
        //value={email}
         />

         <label>Password:</label>
         <input type="password"
         //value={password}
         />
         <button>Login</button>
        </form>
        </div>
        
     );
}
 
export default Login;