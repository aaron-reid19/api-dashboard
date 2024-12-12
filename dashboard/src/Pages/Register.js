const Register = () => {
    return ( 
        <div className="container">
            <form className="login" action="">
        <label>Email:</label>
        <input type="email"
        //value={email}
         />

         <label>Password:</label>
         <input type="password"
         //value={password}
         />

         <label>First Name:</label>
         <input type="String"/>

         <label>Last Name:</label>
         <input type="String"/>

         <button>Login</button>
        </form>
        </div>
        
     );
}
 
export default Register;