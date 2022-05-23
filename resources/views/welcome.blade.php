<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <title>React/Laravel</title>
    <link rel="stylesheet" href="{{ mix('css/app.css')}}">
    <link rel="stylesheet" href="{{ asset('css/landing.css')}}">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/font-awesome-line-awesome/css/all.min.css">
</head>
<body>
    <div class="row">
        <div class="col-12">
            <div id="root"></div>   
        </div>        
    </div>
    <!-- 
    <div class="container">
        <div class="row justify-content-evenly">
            <div class="col-xs-5">
                <img src="https://i.imgur.com/JbalT3I.jpg" name="stage" width="200" height="200" />
            </div>
            <div class="col-xs-7">
                <div className="font-weight-bold">Smart Fortwo</div>
                <div className="mt-1">
                    <span className="text-info font-weight-bold">Económico </span>                                         
                    <span className="rating-review">(MXMR)</span>
                </div>
                <div class="d-flex flex-row">
                    <div class="p-2">
                        <img src="./images/icon_user.png" alt="Check icon"/>
                        <span>1</span>
                    </div>
                    <div class="p-2">
                        <img src="./images/icon_c.png" alt="Check icon"/>
                        <span>1</span>
                    </div>
                    <div class="p-2">
                        <img src="./images/icon_a.png" alt="Check icon"/>
                        <span>1</span>
                    </div>
                </div>
                <div class="d-flex flex-row">
                    <div>
                        <div>
                            <img src="./images/icon_e.png" alt="Check icon" class="mb-3"/>
                            <span className="rating-review ml-1">Automatico</span>
                        </div>
                        <div>
                            <img src="./images/icon_d.png" alt="Check icon" class="mb-3"/>
                            <span className="rating-review ml-1">Manual</span>
                        </div>
                    </div>
                    <div class="d-flex flex-wrap flex-grow-1  m-1">                
                        <div class="flex-grow-1 m-1">
                            <span>Desde: </span>
                            <h1 class="text-info">$30</h1>
                        </div>                        
                    </div>                    
                </div>
                <div class="d-flex flex-row">.
                    <div class="flex-grow-1 m-1">
                        <p class="text-info mt-2"><ins>*Precio por día</ins></p>
                    </div> 
                    <div class="flex-grow-1 m-1">
                        <button                            
                            class="float-left btn btn-info"
                        >
                            Anterior
                        </button>
                    </div> 
                </div>
            </div>
        </div>
    </div>
     -->
    <script src="{{ mix('js/app.js')}}"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF" crossorigin="anonymous"></script>
</body>
</html>