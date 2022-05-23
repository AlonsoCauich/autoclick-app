import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';

function NavBar() {
    return (
        <div className="">
            <nav className="navbar navbar-light bg-light">
                <div>
                    <button className="navbar-toggler btn-circle" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <img className="ml-3 pl-3"
                    src="/logo2.png" width="65" height="35" alt=""/>
                </div>        
                <div className="collapse navbar-collapse" id="navbarToggleExternalContent">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <a className="nav-link" href="/home">Inicio <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/logout">cerrar sesión</a>
                        </li>
                    </ul>  
                                
                </div>
                <form className="form-inline my-2 my-lg-0">
                    <img src="/logo.png" width="30" height="30" alt=""/>
                </form> 
            </nav>
        </div>
    );
}
export { NavBar };
