<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use Auth;

use App\Http\Resources\CheckInStationCollection;
use App\Http\Resources\CheckOutStationCollection;
use App\Http\Resources\InfoCarsCollection;
class AuthenticatedController extends Controller
{
    private $endpoint = [];
    public function __construct()
    {
        $this->endpoint = "https://www.triyolo.com/ejercicio/rest/index.php";
    }
    public function curl($endPoint, $function, $sessionId, $stationType)
    {
        $http = new \GuzzleHttp\Client;
        
        $response = $http->post($endPoint, [
            'headers' => [
                "Content-Type" => "application/json",
            ],
            'json' => [  
                'Function' => $function,
                'SessionId' => $sessionId,
                'StationType' => $stationType,
            ],            
        ]);
        $response_json = json_decode((string) $response->getBody(), true);
        return $response_json;
    }
    public function index ()
    {
        $value = Cookie::get('text');
        if (!$value){
            return view('auth.login');
        }
        else {
            return redirect('home');
        }
    }
    public function login(Request $request)
    {
            $request->validate([
                'contractId' => ['required', 'string', 'min:8', 'max:10'],
                'password' => ['required', 'min:8', 'max:10'],
            ]);       
            //Logica
            try {
                //Codigo
                $contractId = $request->contractId;
                $password = $request->password;

                $http = new \GuzzleHttp\Client;
                $response = $http->post('https://www.triyolo.com/ejercicio/rest/index.php', [
                    'headers' => [
                        "Content-Type" => "application/json",
                    ],
                    'json' => [
                        'Function' => 'LogIn',
                        'ContractId' => $contractId,
                        'Password' => $password,
                        'LanguageId' => 'ES',
                    ],            
                ]);
                $response_json = json_decode((string) $response->getBody(), true);   

                if( isset($response_json['faultstring']) ){
                    throw new \Exception($response_json['faultstring']);
                }

                Cookie::queue('text',$response_json['SessionId'], 60);
                //setcookie('dataUser',$response_json['SessionId'], time() + 60 * 24 * 24); // 86400 = 1 day
                return redirect('home');
            } catch (\Exception $e) {
            return back()->with('Error', $e->getMessage());
            }        
    }
    public function home(Request $request)
    { 
        $value = Cookie::get('text');
        if ($value){
            return view('welcome');
        }
        else {
            abort(404);
        }
    }
    public function checkInStation(Request $request)
    {
        $response = self::curl($this->endpoint, $request->function, $request->sessionId, $request->stationType);
        return new CheckInStationCollection($response);
        return $response->json(new CheckInStationCollection($response));
    }
    public function checkOutStation(Request $request)
    {
        $response = self::curl($this->endpoint, $request->function, $request->sessionId, $request->stationType);
        return new CheckOutStationCollection($response);
    }
    public function infoCars(Request $request)
    {
        $http = new \GuzzleHttp\Client;
        $response = $http->post($this->endpoint, [
            'headers' => [
                "Content-Type" => "application/json",
            ],
            'json' => [  
                "Function"=> $request->function,
                "SessionId"=> $request->sessionId,
                "CheckOutStationId"=> $request->checkOutStationId,
                "CheckOutDate"=> $request->checkOutDate,
                "CheckInStationId"=> $request->checkInStationId,
                "CheckInDate"=> $request->checkInDate,
                "Currency"=>"MXN",
                "PLI"=>1,
                "CDW"=>1,
                "PAI"=>0,
                "DP"=>0,
                "CA"=>0,
                "CM"=>0,
                "GPS"=>0,
                "BS"=>0,
                "DealId"=>"0"            
            ],            
        ]);
        $response = json_decode((string) $response->getBody(), true);
        return new InfoCarsCollection($response);
    }
    public function login_front(Request $request)
    {
        $http = new \GuzzleHttp\Client;
        $response = $http->post($this->endpoint, [
            'headers' => [
                "Content-Type" => "application/json",
            ],
            'json' => [  
                "Function" => $request->function,
                "ContractId"=> $request->contractId,
                "Password"=> $request->password,
                "LanguageId"=> $request->languageId,
            ],            
        ]);
        $response = json_decode((string) $response->getBody(), true);
        return $response;
    }
    public function logout (){
        Cookie::queue(Cookie::forget('text'));
        return redirect('/');
    }
    
}
