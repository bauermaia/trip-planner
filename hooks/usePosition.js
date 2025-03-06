import { useContext, useEffect, useState} from "react";
import { PositionContext } from "../context/position";

export function usePosition() {

   const {position, setPosition, citySearch, setCitySearch} = useContext(PositionContext)
   const [positionError, setPositionError]= useState('')
    
   const getUserPosition = async ()=> {
    navigator.geolocation.getCurrentPosition(succes, error);
    
    function error () {
        setPositionError('No se pudo obtener la ubicación actual del usuario❌')
        setPosition([40.4168, -3.7038])
        setCitySearch('Madrid');
    }

    async function succes(position)
    {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setPosition([latitude,longitude])
        try {
            const actualCityName = await getCityName(latitude, longitude);
            setCitySearch(actualCityName);
        } catch {
            setCitySearch("Nombre de ciudad actual desconocído");
        }

    }
   }


        useEffect(()=> {
          if(!position) {
            getUserPosition();
          }
        }, [])

    
        const getCoords= async (city) => {
            const NOMINATIM_ENDPOINT= `https://nominatim.openstreetmap.org/search?format=json&q=${city}`

            try {
                const response= await fetch(NOMINATIM_ENDPOINT)
                const data= await response.json()

                if(data.length > 0) {
                  const  {place_id, lat, lon, display_name} = data[0];
                  return {lat: parseFloat(lat), lon: parseFloat(lon), place_id, display_name}
                } else {
                    setPositionError("Ubicación no encontrada mediante nombre de ciudad⚠️")
                    return null
                }
            } catch(error) {
                setPositionError("Error en la búsqueda mediante nombre ❌")
                return null
            }

        }

        const getCityName= async (lat, lon) => {
            const NOMINATIM_ENDPOINT = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

            try {
                const response= await fetch(NOMINATIM_ENDPOINT)
                const data= await response.json()

                if(data && data.address) {
                  const city = data.address.city || data.address.town || data.address.village || data.address.region ||'Ubicación desconocida'
                  return (city)
                } else {
                   setPositionError("Ubicación no encontrada mediante coordenadas⚠️")
                    return null
                }
            } catch(error) {
                setPositionError("Error en la búsqueda mediante coordenadas❌")
                return null
            }

        }
    
        return {position, setPosition, getCoords, getCityName, getUserPosition, citySearch, setCitySearch, positionError, setPositionError}

}