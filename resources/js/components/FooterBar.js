import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';

function FooterBar() {
    return (
        <footer className="footer mt-auto devfooter mt-3">
            <div className="container devcontent">
                <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                        <img id="imgfooter" src="./logobn.png" height="70" alt=""/>
                    </div>
                    <div id="dev" className="flex-grow-1 align-self-center">
                        <p id="devInfo" className="align-self-center">
                            Atencion al cliente<br/>
                            01 800 272 02 91<br/>
                            Nuestro horario de atención telefonica es 24 hrs.
                        </p>                           
                    </div>
                </div>           
            </div>
            <div className="row bg-light">
                <div className="col-6 text-center p-1">
                    Sitio clásico
                </div>
                <div className="col-6 text-center p-1">
                    Términos y Condiciones
                </div>
            </div>       
        </footer>
    );
}
export { FooterBar };
