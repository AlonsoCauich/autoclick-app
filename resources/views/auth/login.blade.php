<!DOCTYPE HTML>
<html lang="en">

<head>
    <meta charset="utf-8">

    <title>{{ config('app.name', 'Demo') }}</title>
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="description" content="Demo de Alonso de Jesus Cauich Viana">
    <meta name="keywords" content="html, css, dashboard, demo, personal, " />
    <meta name="author" content="Alonso de Jesus Cauich Viana" />

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:title" content="">
    <meta property="og:type" content="">
    <meta property="og:url" content="">
    <meta property="og:image" content="">
    <!-- Favicon -->
    <link rel="shortcut icon" href="{{ asset('logo2.png') }}">
    <!-- Template CSS -->
    <link rel="stylesheet" href="{{ mix('css/app.css')}}">

    <link rel="stylesheet" type="text/css" href="{{ asset('css/login.css') }}">
</head>

<body class="text-center">
    <form method="POST" action="{{ route('login') }}" class="form-signin">
        @csrf
        <img class="mb-4" src="{{ asset('logo2.png') }}" alt="" width=""
            height="72">
        <h1 class="h3 mb-3 font-weight-normal">Por favor, Inicie sesión</h1>
        @if(Session::has('Error'))
            <div class="alert alert-danger" role="alert" style="font-size: 12px;">
                {!! \Session::get('Error') !!}
            </div>                    
        @endif
        <div class="form-group row">
            <label for="contractId" class="col-md-12 text-left">Contract Id</label>
            <div class="col-md-12">
                <input placeholder="contractId = 0123456789" id="contractId" name="contractId" type="text"
                class="form-control{{ $errors->has('contractId') ? ' is-invalid' : '' }}" 
                minlength="8" maxlength="10" autocomplete="off"
                value="0123456789"
                >
                @error('contractId')
                    <span class="text-danger">
                        <strong><small>{!! $message !!}</small></strong>
                    </span>
                @enderror                      
            </div>
        </div>
        <div class="form-group row">
            <label for="password" class="col-md-12 text-left">Contraseña</label>
            <div class="col-md-12">
                <input placeholder="Password" id="password" name="password" type="password" 
                class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}"                         
                minlength="8" maxlength="10" autocomplete="off"
                value="0123456789"
                >
                @error('password')
                    <span class="text-danger">
                        <strong><small>{!! $message !!}</small></strong>
                    </span>
                @enderror  
            </div>
        </div>        
        <button class="btn btn-lg btn-primary btn-block" type="submit">Acceder</button>
    </form>
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF" crossorigin="anonymous">
    </script>
</body>

</html>
