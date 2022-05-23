import React from "react";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.css';

const WizardContext = React.createContext();


export const useWizardContext = () => {
  const context = React.useContext(WizardContext);
  if (!context) {
    throw new Error(
      `Un componente compuesto de Wizard no puede ser
       renderizado fuera del Wizard padre`
    );
  }
  return context;
};
/*
export const useLogin2 = () => {
  const [sessionIdVal, setSessionIdVal] = React.useState(null);
  const baseURL = "http://localhost:8000/api";

  React.useEffect(() => {
      async function fetchData() {
          const localStorageItem = localStorage.getItem('sessionId');
          let localStorageSession;
          try {
              if (!localStorageItem) {
                  const postData = {
                      function:"LogIn",
                      contractId: "0123456789", 
                      password: "0123456789", 
                      languageId:"ES"
                  };
                  const response = await fetch(`${baseURL}/login_front`, {
                      method: "post",
                      headers: {
                          "Content-Type": "application/json",
                          "x-access-token": "token-value",
                      },
                          body: JSON.stringify(postData),
                  });
                  const responseJSON = await response.json();
                  localStorage.setItem('sessionId', responseJSON.SessionId);
                  localStorageSession = responseJSON.SessionId;           
              } 
              else {
                  localStorageSession = localStorageItem;
              }
              setSessionIdVal(localStorageSession);     
          }
          catch(error){
              console.log(error);
          }  
                 
      }
      fetchData();
  }, []);
  return sessionIdVal;
};
*/

export const useDataInitial = () => {
  const sessionIdVal = localStorage.getItem('sessionId');
  const { infoSelectOne, infoSelectTwo, infoSelecHours, data1, data2, data3, data4 } = useWizardContext();
  const [selectOne, setSelectOne] = React.useState(null);
  const [selectTwo, setSelectTwo] = React.useState(null);
  const [selectHour, setSelectHour] = React.useState(null);
  const baseURL = "http://localhost:8000/api";

  const ApiHours = () => {
      var rows = [], i = 0, len = 23;
      while (i <= len) {
          if (i.length < 2) {
              rows.push({ 'id': i, 'name': '0'+i+':00' });             
          }
          else {
              rows.push({ 'id': i, 'name': i+':00' });
          }
          i++;
      }
      setSelectHour(rows);
      /* console.log('ApiHours'); */
  };  
  const fetchApiOne = async () => {
      const postData = {
          function:"GetStationList",
          sessionId:sessionIdVal, 
          stationType:"CheckIn"
      };
      const response = await fetch(`${baseURL}/checkInStation`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
          },
          body: JSON.stringify(postData),
      });
      const responseJSON = await response.json();
      /* console.log(responseJSON); */
      setSelectOne(responseJSON);  
      /* console.log('fetchApiOne'); */
  }
  const fetchApiTwo = async () => {
      const postData = {
          function:"GetStationList",
          sessionId: sessionIdVal, 
          stationType:"CheckOut"
      };
      const response = await fetch(`${baseURL}/checkOutStation`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
          },
          body: JSON.stringify(postData),
      });
      const responseJSON = await response.json()
      setSelectTwo(responseJSON);    
      /* console.log('fetchApiTwo'); */
      /* console.log(responseJSON); */         
  }
  React.useEffect(() => {

    setTimeout(() => {
      if(sessionIdVal) {
        fetchApiOne();
        fetchApiTwo();    
      }      
      ApiHours();
    }, 3000);
  }, [sessionIdVal]);
  return {
    infoSelectOne: selectOne, 
    infoSelectTwo: selectTwo, 
    infoSelecHours: selectHour,
    data1, data2, data3, data4
  };
}

export const useWizardNavigation = () => {
  const { goNextPage, goPrevPage, activePageIndex, steps } = useWizardContext();
  return {
    goNextPage,
    goPrevPage,
    currentIndex: activePageIndex + 1,
    steps
  };
};

export const useWizardPages = (totalSteps) => {
  const { setSteps, activePageIndex } = useWizardContext();
  React.useEffect(() => {
    setSteps(totalSteps);
  }, [totalSteps, setSteps]);
  return {
    activePageIndex
  };
};

export const useWizardProgress = () => {
  const { activePageIndex, steps } = useWizardContext();
  return {
    currentIndex: activePageIndex + 1,
    steps
  };
};
const defaultInitialState = {
  activePageIndex: 0,
  steps: 0
};

export const actions = {
  NEXT_PAGE: "NEXT_PAGE",
  PREV_PAGE: "PREV_PAGE",
  SET_STEPS: "SET_STEPS"
};

const defaultReducer = (state, action) => state;

export const wizardReducer = (state, action) => {
  const { activePageIndex } = state;
  switch (action.type) {
    case actions.NEXT_PAGE:
      return { ...state, activePageIndex: activePageIndex + 1 };
    case actions.PREV_PAGE:
      return { ...state, activePageIndex: activePageIndex - 1 };
    case actions.SET_STEPS:
      return { ...state, steps: action.payload };
    default:
      return state;
  }
};

const combineReducers = (...reducers) => (state, action) => {
  return reducers.reduce((acc, nextReducer) => {
    return nextReducer(acc, action);
  }, state);
};

const Wizard = ({ children, reducer = defaultReducer, initialState }) => {
  const [state, dispatch] = React.useReducer(
    combineReducers(wizardReducer, reducer),
    {
      ...defaultInitialState,
      ...initialState
    }
  );

  const goNextPage = () => {
    dispatch({ type: actions.NEXT_PAGE });
  };

  const goPrevPage = () => {
    dispatch({ type: actions.PREV_PAGE });
  };

  const setSteps = React.useCallback(
    (n) => {
      dispatch({ type: actions.SET_STEPS, payload: n });
    },
    [dispatch]
  );

  const context = {
    ...state,
    dispatch,
    goNextPage,
    goPrevPage,
    setSteps
  };

  return (
    <WizardContext.Provider value={context}>    
        <div className="container">
            <div className="row align-items-center mt-3">
                <div className="col-8 mx-auto">
                    <div className="card text-white bg-dark mb-3">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </WizardContext.Provider>
  );
};

const WizardPages = (props) => {
  const { activePageIndex, setSteps } = useWizardContext();
  const pages = React.Children.toArray(props.children);
  const steps = React.Children.count(props.children);
  const currentPage = pages[activePageIndex];
  React.useEffect(() => {
    setSteps(steps);
  }, [steps, setSteps]);
  return <div {...props}>{currentPage}</div>;
};

export const WizardButtonPrev = (props) => {
  const { goPrevPage, activePageIndex } = React.useContext(WizardContext);
  return activePageIndex > 0 ? (
    <button type="button" {...props} onClick={goPrevPage}>
      Atras
    </button>
  ) : null;
};

export const WizardButtonNext = (props) => {
  const { goNextPage, activePageIndex, steps } = React.useContext(
    WizardContext
  );
  return activePageIndex < steps - 1 ? (
    <button type="button" {...props} onClick={goNextPage}>
      Siguiente
    </button>
  ) : null;
};

Wizard.Pages = WizardPages;
Wizard.ButtonNext = WizardButtonNext;
Wizard.ButtonPrev = WizardButtonPrev;

export default Wizard;
