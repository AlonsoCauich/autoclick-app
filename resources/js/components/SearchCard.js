import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import "./ribbonHeader.css";
import moment from 'moment';
import 'moment/locale/es';
import { useLogin } from "./useLogin";

/* import "./ribbon.css"; */
/* import "./ribbon2.css"; */
import Wizard, {
    useWizardContext,
    useWizardNavigation,
    useWizardPages,
    useWizardProgress,
    useDataInitial
  } from "./Wizard";
  
  const Navigation = () => {
    const { currentIndex, goNextPage, goPrevPage, steps } = useWizardNavigation();
    return (
        <React.Fragment>
            {   currentIndex === 1                  
                ? 
                null                  
                : 
                <div className="card-footer">
                      <button
                            onClick={goPrevPage}
                            className="float-left btn btn-info"
                            disabled={currentIndex === 1}
                        >
                            Anterior
                        </button>
                        <button
                        onClick={goNextPage}
                        className="float-right btn btn-info"
                        disabled={currentIndex === steps}
                        >
                        Continuar
                        </button>

                  </div>
            }
        </React.Fragment>
    );
  };
  /* Get data form */

  const Pages = ({ children }) => {
    const { activePageIndex } = useWizardPages(React.Children.count(children));
    return (
        <React.Fragment>
            {React.Children.toArray(children)[activePageIndex]}
        </React.Fragment>
    );
  };
  
  const ProgressBar = () => {
    const { currentIndex, steps } = useWizardProgress();
    return (
      <div className="wizard__progress mt-2">
        Paso {currentIndex} de {steps}
      </div>
    );
  };

  
  const Page1 = () => {
    const [comicId, setComicId] = React.useState("");
    const { dispatch, goNextPage } = useWizardContext();
    const { infoSelectOne, infoSelectTwo, infoSelecHours } = useDataInitial();
    
    const [form, setForm] = React.useState({
        selectOne: "",
        selectTwo: "",
        dateIn: "",
        dateOut: "",        
        selectOneHours: "",
        selectTwoHours: "",
    });
    const [errorx, setError] = React.useState({
        selectOne: "",
        selectTwo: "",
        dateIn: "",
        dateOut: "",        
        selectOneHours: "",
        selectTwoHours: "",
    });
    const [msj1, setMsj1] = React.useState("");
    const [msj2, setMsj2] = React.useState("");
    const [msj3, setMsj3] = React.useState("");
    const [msj4, setMsj4] = React.useState("");
    const [msj5, setMsj5] = React.useState("");
    const [msj6, setMsj6] = React.useState("");
    
    const onUpdateField = e => {
        const nextFormState = {
          ...form,
          [e.target.name]: e.target.value,
        };
        setForm(nextFormState);

        const nextc = {
            ...errorx,
            [e.target.name]: e.target.value.length >= 1 ? 'data' : '',
          };
          /* console.log (e.target.name+' = '+e.target.value.length); */
          setError(nextc);
    };    
    const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach(val => val.length === 0 ? (valid = false) : (valid = true) );
        return valid;
      };
    const onSubmit = async (event) => {
        event.preventDefault();           
        const baseURL = "http://localhost:8000/api";
        function ApiHours (valx) {
            let formHour = null, i = valx;
            if (i.length < 2) {
                formHour='0'+i+':00';
            }
            else {
                formHour=i+':00';
            }
            return formHour;          
        };
        const dateFormatCheckIn = moment(form.dateIn+' '+ApiHours(form.selectOneHours)).format("YYYY-MM-DD[T]HH:mm");
        const dateFormatCheckOut = moment(form.dateOut+' '+ApiHours(form.selectTwoHours)).format("YYYY-MM-DD[T]HH:mm");
        
        const postDataSubmit = {
            function:"GetCarAvailability",
            sessionId: localStorage.getItem('sessionId'),
            checkOutStationId:form.selectTwo, 
            checkOutDate: dateFormatCheckOut,
            checkInStationId: form.selectOne,
            checkInDate: dateFormatCheckIn,
        };
        setMsj1(form.selectOne.length === 0 ? 'Valor Requerido': null);
        setMsj2(form.selectTwo.length === 0 ? 'Valor Requerido': null);
        setMsj3(form.dateIn.length === 0 ? 'Valor Requerido': null);
        setMsj4(form.selectOneHours.length === 0 ? 'Valor Requerido': null);
        setMsj5(form.dateOut.length === 0 ? 'Valor Requerido': null);
        setMsj6(form.selectTwoHours.length === 0 ? 'Valor Requerido': null);

       if(validateForm(errorx)) {
            try {
                const response = await fetch(`${baseURL}/infoCars`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": "token-value",
                    },
                    body: JSON.stringify(postDataSubmit),
                });
                const data = await response.json();
                dispatch({ type: "COMIC_FETCHED", payload: data });
                goNextPage();
            } catch (e) {
                console.error(e);
            }
        }
        else{            
            console.error('Invalid Form');
        }
        /*
        alert(JSON.stringify(form, null, 2));
        */
    };
    return (
        <React.Fragment>
        <form onSubmit = {onSubmit}>
            
            <div className="card-body">
                <div className='ribbon'>
                    <p className='pl-4'>Elige fecha y lugar </p>
                </div>                
                
                <div className='row'> 
                    <div className='col-12'>
                        <p id="paso1" className="text-right">Paso 1</p>
                    </div>
                    <div className='col-6'>
                        <div className="form-group">
                            <label  className='font-weight-bold text-white text-uppercase'>Oficina de entrega</label>
                            <select className="form-control" id="selectOne" name="selectOne" value={form.selectOne} onChange={onUpdateField}>
                                <option key={ Math.floor(Math.random()*90000) + 10000 } value="">Elije</option>
                                {   
                                    infoSelectOne ? 
                                    infoSelectOne.map(((data) => 
                                        <option key={data.id} value={data.id}>{data.name}</option>
                                    ))                                  
                                    : null
                                }
                            </select>
                            <span className='text-danger font-weight-bold'>{msj1}</span>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="form-group">
                            <label  className='font-weight-bold text-white text-uppercase'>Oficina de devolución</label>
                            <select className="form-control" id="selectTwo" name="selectTwo" value={form.selectTwo} onChange={onUpdateField}>    
                                <option key={ Math.floor(Math.random()*90000) + 10000 } value="">Elije</option>
                                {   
                                    infoSelectTwo ? 
                                    infoSelectTwo.map(((data) => 
                                        <option key={data.id} value={data.id}>{data.name}</option>
                                    ))                                  
                                    : null
                                }
                            </select>
                            <span className='text-danger font-weight-bold'>{msj2}</span>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className="input-group">
                            <span className="input-group-append bg-white">
                                <span className="input-group-text bg-transparent border-right-0 p-1">
                                    <img src="./VectorSmartObjectcop.png" alt="Check icon"/>
                                </span>
                            </span>
                            <input className="form-control border-left-0" type="date" id="dateIn" name="dateIn" value={form.dateIn} onChange={onUpdateField}/>
                            <span className='text-danger font-weight-bold'>{msj3}</span>
                        </div> 
                    </div>
                    <div className='col-3'>
                        <div className="input-group">
                            <span className="input-group-append bg-white">
                                <span className="input-group-text bg-transparent border-right-0 p-1">
                                    <img src="./VectorSmartObject_2.png" alt="Check icon"/>
                                </span>
                            </span>
                            <select className="form-control border-left-0" id="selectOneHours" name="selectOneHours" value={form.selectOneHours} onChange={onUpdateField}>
                                <option key={ Math.floor(Math.random()*90000) + 10000 } value="">Elije</option>
                                {   
                                    infoSelecHours ? 
                                    infoSelecHours.map(((data) => 
                                        <option key={data.id} value={data.id}>{data.name}</option>
                                    ))                                  
                                    : null
                                }
                            </select>
                            <span className='text-danger font-weight-bold'>{msj4}</span>
                        </div> 
                    </div>
                    <div className='col-3'>
                        <div className="input-group">
                            <span className="input-group-append bg-white">
                                <span className="input-group-text bg-transparent border-right-0 p-1">
                                    <img src="./VectorSmartObjectcop.png" alt="Check icon"/>
                                </span>
                            </span>
                            <input className="form-control border-left-0" type="date" id="dateOut" name="dateOut" value={form.dateOut} onChange={onUpdateField }/>  
                            <span className='text-danger font-weight-bold'>{msj5}</span>                          
                        </div> 
                    </div>
                    <div className='col-3'>
                        <div className="input-group">
                            <span className="input-group-append bg-white">
                                <span className="input-group-text bg-transparent border-right-0 p-1">
                                    <img src="./VectorSmartObject_2.png" alt="Check icon"/>
                                </span>
                            </span>
                            <select className="form-control border-left-0" id="selectTwoHours" name="selectTwoHours" value={form.selectTwoHours} onChange={onUpdateField}>
                                <option key={ Math.floor(Math.random()*90000) + 10000 } value="">Elije</option>
                                {   
                                    infoSelecHours ? 
                                    infoSelecHours.map(((data) => 
                                        <option key={data.id} value={data.id}>{data.name}</option>
                                    ))                                  
                                    : null
                                }
                            </select>
                            <span className='text-danger font-weight-bold'>{msj6}</span> 
                        </div> 
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <p className="float-left mt-2 font-weight-bold text-white"><u>OFICINAS PRINCIPALES</u></p>
                <button
                    type="submit"
                    className="float-right btn btn-info"
                >
                    Continuar
                </button>
            </div>
        </form>
        </React.Fragment>  
    );
  };
  
  const Page2 = () => {
    const { resultData } = useWizardContext();
    const { num, title, img, alt } = resultData;
    const { currentIndex, goNextPage, goPrevPage, steps } = useWizardNavigation();
    return (
        <React.Fragment>
            <div className='darks'>
                <div className='row'>
                    <div className='col-4 tabStep1'>
                        <a className="text-center"onClick={goPrevPage} >
                            <span id="tabpaso1" className="pull-left ml-2 mt-3">Paso 1</span> 
                            <small className="pull-right mt-3 mr-2 text-white font-weight-bold">Su itinerario</small> 
                        </a>
                    </div>
                    <div className='col-4 tabStep2'>
                        <a className="disabled clearfix ">
                            <span id="tabpaso2" className="pull-left ml-2 mt-3">Paso 2</span> 
                            <small className="pull-right mt-3 mr-2 text-white font-weight-bold">Seleccione su Auto</small> 
                        </a>
                    </div>
                    <div className='col-4 tabStep3'>
                        <a className="disabled">
                            <span id="tabpaso3" className="pull-left mt-3">Paso 3</span> 
                            <small className="pull-right mr-2 mt-3 transppaso3 font-weight-bold">Extras-Reserva</small> 
                        </a>
                    </div>
                </div>
                
            </div>
            
            <div className="card-body bg-light text-dark">
                <div className='row'>
                    <div className='col-6'>
                        <h6 className='titles'>Lugar y Fecha de Entrega</h6>
                        <p>{resultData.CheckOutStationName}</p> 
                        <p>{moment(resultData.CheckOutDate).locale('es').format("dddd D MMMM YYYY - h:mm a")}</p>
                    </div>
                    <div className='col-6'>
                        <h6 className='titles'>Lugar y Fecha de Devolución</h6>
                        <p>{resultData.CheckInStationName}</p> 
                        <p>{moment(resultData.CheckInDate).locale('es').format("dddd D MMMM YYYY - h:mm a")}</p>                          
                    </div>
                    <div className="col-12 text-center">
                        <button className="btn btn-info" type="button" onClick={goPrevPage}>
                            Modificar itinerario
                        </button>
                    </div>

                    <div className='col-12 mt-5'>

                    </div>
                </div> 

                <div className='row'>
                    <div className='col-12'>
                    <Tabs defaultActiveKey="0" className='categoryCar'>
                        <Tab eventKey="0" title="Todas">
                            <div className="container">                                
                                {   
                                    resultData.CarList 
                                    ? 
                                    resultData.CarList.map(((data) => 
                                        <div key={ Math.floor(Math.random()*90000) + 10000 } className="row justify-content-evenly border-top-0 border-right-0 border-left-0 border border-secondary">
                                            <div className="col-xs-5">
                                                <img className="mr-5"src={'https://www.triyolo.com/resources/imagenes/autos/'+ data.Group.CarImage} name="stage" width="200" height="200" />
                                            </div>
                                            <div className="col-xs-7">
                                                <div className="font-weight-bold">{data.Group.CarModel}</div>
                                                <div className="mt-1">
                                                    <span className="text-info font-weight-bold">{data.Group.GroupName} </span>                                         
                                                    <span className="rating-review">({data.Group.SippCode})</span>
                                                </div>
                                                <div className="d-flex flex-row">
                                                    <div className="p-2">
                                                        <img src="./images/icon_user.png" alt="Check icon"/>
                                                        <span className="ml-2">{data.Features.Pax}</span>
                                                    </div>
                                                    <div className="p-2">
                                                        <img src="./images/icon_c.png" alt="Check icon"/>
                                                        <span className="ml-2">{data.Features.Doors}</span>
                                                    </div>
                                                    <div className="p-2">
                                                        <img src="./images/icon_a.png" alt="Check icon"/>
                                                        <span className="ml-2">{data.Features.BigLuggage}</span>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row">
                                                    <div>
                                                        <div>
                                                            <img src="./images/icon_e.png" alt="Check icon" className="mb-3"/>
                                                            <span className="rating-review ml-1">Automatico</span>
                                                        </div>
                                                        <div>
                                                            <img src="./images/icon_d.png" alt="Check icon" className="mb-3"/>
                                                            <span className="rating-review ml-1">Manual</span>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-wrap flex-grow-1  m-1">                
                                                        <div className="flex-grow-1 m-1">
                                                            <span>Desde: </span>
                                                            <h1 className="text-info">$ {data.CarValuation.Total.toLocaleString(undefined, {maximumFractionDigits:2}) }</h1>
                                                        </div>                        
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row">.
                                                    <div className="flex-grow-1 mb-1">
                                                        <p className="text-info mt-2"><ins>*Precio por día</ins></p>
                                                    </div> 
                                                    <div className="flex-grow-1 mb-1">
                                                        <button className="float-left btn btn-info">
                                                            Reservar
                                                        </button>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    ))  
                                    : null
                                }
                            </div>                            
                        </Tab>
                        {   
                            resultData.Category ? 
                            resultData.Category.map(((data) => 
                                <Tab eventKey={data.GroupId} key={data.GroupId} title={data.GroupName}>                                    
                                    {   
                                        resultData.CarList 
                                        ? 
                                        resultData.CarList.map((element, index) => {
                                            /*console.log(element['Group']['GroupId']);*/
                                            if (element['Group']['GroupId'] === data.GroupId) {
                                              return <div key={ Math.floor(Math.random()*90000) + 10000 } className="row justify-content-evenly border-top-0 border-right-0 border-left-0 border border-secondary">
                                                        <div className="col-xs-5">
                                                            <img className="mr-5"src={'https://www.triyolo.com/resources/imagenes/autos/'+ element['Group']['CarImage'] } name="stage" width="200" height="200" />
                                                        </div>
                                                        <div className="col-xs-7">
                                                            <div className="font-weight-bold">{element['Group']['CarModel']}</div>
                                                            <div className="mt-1">
                                                                <span className="text-info font-weight-bold">{element['Group']['GroupName']} </span>                                         
                                                                <span className="rating-review">({element['Group']['SippCode']})</span>
                                                            </div>
                                                            <div className="d-flex flex-row">
                                                                <div className="p-2">
                                                                    <img src="./images/icon_user.png" alt="Check icon"/>
                                                                    <span className="ml-2">{element['Features']['Pax']}</span>
                                                                </div>
                                                                <div className="p-2">
                                                                    <img src="./images/icon_c.png" alt="Check icon"/>
                                                                    <span className="ml-2">{element['Features']['Doors']}</span>
                                                                </div>
                                                                <div className="p-2">
                                                                    <img src="./images/icon_a.png" alt="Check icon"/>
                                                                    <span className="ml-2">{element['Features']['BigLuggage']}</span>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-row">
                                                                <div>
                                                                    <div>
                                                                        <img src="./images/icon_e.png" alt="Check icon" className="mb-3"/>
                                                                        <span className="rating-review ml-1">Automatico</span>
                                                                    </div>
                                                                    <div>
                                                                        <img src="./images/icon_d.png" alt="Check icon" className="mb-3"/>
                                                                        <span className="rating-review ml-1">Manual</span>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex flex-wrap flex-grow-1  m-1">                
                                                                    <div className="flex-grow-1 m-1">
                                                                        <span>Desde: </span>
                                                                        <h1 className="text-info">$ { element['CarValuation']['Total'].toLocaleString(undefined, {maximumFractionDigits:2}) }</h1>
                                                                    </div>                        
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-row">.
                                                                <div className="flex-grow-1 mb-1">
                                                                    <p className="text-info mt-2"><ins>*Precio por día</ins></p>
                                                                </div> 
                                                                <div className="flex-grow-1 mb-1">
                                                                    <button className="float-left btn btn-info">
                                                                        Reservar
                                                                    </button>
                                                                </div> 
                                                            </div>
                                                        </div>
                                                    </div>;
                                            }
                                        })                                        
                                        : null
                                    }
                                </Tab>
                            ))                                  
                            : null
                        }                        
                    </Tabs>
                    </div>
                </div>           
            </div>                
        </React.Fragment>

    );
  };
  const Page3 = () => (
    <div className="card-body">
        <h1>Pagina 3</h1>
    </div>
  );
    
  const initialState = {
    resultData: {}
  };
  const reducer = (state, action) => {
    /* console.log(state, action); */
    if (action.type === "COMIC_FETCHED") {
      return { ...state, resultData: action.payload };
    }
    return state;
  };
  
function SearchCard() {
    return (
        <Wizard reducer={reducer} initialState={initialState}>                              
            <Pages>                
                <Page1 />
                <Page2 />
                <Page3 />
            </Pages>
            <Navigation />      
            <ProgressBar />
        </Wizard>
    );
}
export { SearchCard };