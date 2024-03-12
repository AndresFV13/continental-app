import React, { useState } from 'react'

// import loginImage from '../../public/img/login-image.jpg' 

export const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
  
    const handleUserChange = (e) => {
      setUser(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('user:', user);
      console.log('Password:', password);
    };
  
    return (
        <div className='d-flex align-items-center w-100 h-100'> 
            <div className="login-form-container"> 
                <h2 className='title-login'>Iniciar sesión</h2> 
                <form onSubmit={handleSubmit}>
                <label className='label-login'>
                    Usuario:
                    <input className='input-login' type="user" value={user} onChange={handleUserChange} required />
                </label>
                <label>
                    Contraseña:
                    <input className='input-login' type="password" value={password} onChange={handlePasswordChange} required />
                </label>
                <button className='button-login' type="submit">Iniciar sesión</button>
                </form>
            </div>
            {/* <div className='w-60'>
                <img className='h-90' src={loginImage} alt="Login-image" />
            </div> */}
        </div>
    );
}
