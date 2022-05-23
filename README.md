# Reto Técnico
Backend Developer

## Ejemplo
http://demochallenge.xyz

## Inicializar el proyecto
Sobre la carpeta del módulo correr el comando:
```
php artisan serve
```

## Endpoints de modulo

|Endpoint| Método | Descripción |
| - | - | - |
|/api/login_front | POST | Consumo del API a la función LogIn
|/api/checkInStation | POST | Obtener lista de oficina para el registro de Check-in
|/api/checkOutStation | POST | Obtener lista de oficina para el registro de Check-out
|/api/infoCars | POST | Obtener lista de disponibilidad de autos

## Endpoint login_front - Ejemplo para el enviar datos
```
{
"function":"LogIn",
"contractId":"0123456789",
"password":"0123456789",
"languageId":"ES"
}
```
## Endpoint checkInStation - Ejemplo para el enviar datos
```
{
"function":"GetStationList",
"sessionId":"5968145",
"stationType":"CheckIn"
}
```
## Endpoint checkOutStation - Ejemplo para el enviar datos
```
{
"function":"GetStationList",
"sessionId":"5968145",
"stationType":"CheckOut"
}
```
## Endpoint infoCars - Ejemplo para el enviar datos
```
{
"function":"GetCarAvailability",
"sessionId":"5968145",
"CheckOutStationId":"4",
"CheckOutDate":"2014-11-14T17:00",
"CheckInStationId":"4",
"CheckInDate":"2014-11-15T17:00"
}
```
