import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  let location = useLocation();
  const navigate = useNavigate();
  const handleLogOut = ()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to='/'>Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/About" ? "active" : ""}`} to='/About'>About</Link>
              </li>
              {/* <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </Link>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href='/'>Action</a></li>
            <li><a className="dropdown-item" href='/'>Another action</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href='/'>Something else here</a></li>
          </ul>
        </li> */}
            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex" role="search">
              <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
            </form> : <button className='btn btn-primary' onClick={handleLogOut}>Log Out</button>}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
