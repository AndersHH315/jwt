import { useState } from 'react';
import axios from 'axios';

function Login() {
    const [input, setInput] = useState({
        username: '',
        password: ''
    });

    function handleChange(e) {
        const {name, value} = e.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        });
    }

    async function loginUser(e) {
        e.preventDefault();
        const existingUser = {
            username: input.username,
            password: input.password,
        };
        axios.post('http://localhost:3001/api/login', existingUser);
    }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <input onChange={handleChange} value={input.username} name="username" type="text" placeholder="username" autoComplete="off"/>
                <br/>
                <input onChange={handleChange} value={input.password} name="password" type="password" placeholder="password" autoComplete="off"/>
                <br />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
};

export default Login;