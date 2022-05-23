import React from 'react';
function useLogin (){
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
}

export { useLogin };