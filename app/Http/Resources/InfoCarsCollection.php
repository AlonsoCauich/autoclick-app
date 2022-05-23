<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class InfoCarsCollection extends ResourceCollection
{
    public static $wrap = null;
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function _group_by($array, $key) {
        $return = array();
        foreach($array as $val) {
            $return[$val[$key]] = $val;
            unset($return[$val[$key]][$key]);
        }
        $data_filter = array();
        foreach ($return as $data)
        {
            array_push($data_filter, $data);
        }
        return $data_filter;
    }
    public function toArray($request)
    {
        $newColection = $this->collection->forget(['Days', 'ExtraHours', 'Vat', 'Af', 'DealId', 'DealName', 'Tariff']);

        //Logica
        $keyed = $newColection->keyBy('CarList');
        $datakeyed = $keyed->all();

        $data_filter = array();
        foreach ($datakeyed as $data){
            array_push($data_filter, $data);
        }
        $data_filter = $data_filter[0];

        $cont_categorias = [];
        foreach($data_filter as $data_auto)
        {
            $GroupCar = $data_auto['Group'];
            array_push($cont_categorias, ['id' => $data_auto['Group']['GroupId'], 'GroupId' => $data_auto['Group']['GroupId'], 'GroupName' => $data_auto['Group']['GroupName']] );            
        }
        $categoria = self::_group_by($cont_categorias, 'id');
        
        $newColection['Category'] = $categoria;
        return $newColection;
    }
    
}