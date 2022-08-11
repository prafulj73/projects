import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

function Login() {

    const [user, setuser] = useState({email:"",password:""});

    const onchange = e => {
        setuser({
          ...user,
          [e.target.name]: e.target.value
        })
      }
    
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:user.email, password:user.password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            localStorage.setItem('token',json.authToken);
            navigate('/');
          }
          else{
            alert("invalid credentials!!");
          }
        }
        catch(e){console.log(e);}
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={user.email} onChange={onchange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={user.password} onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Login
