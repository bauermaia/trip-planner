
import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import { usePosition } from "../hooks/usePosition";

export function Searcher() {

    const {position, setPosition, getCoords, getCityName, positionError, setPositionError} = usePosition()
   const {citySearch, setCitySearch} = usePosition()
    
    const handleSearchChange=(event)=> {
        setCitySearch(event.target.value)
        setPositionError('')
    }

    const handleSubmit= async(event)=> {
        event.preventDefault()
        if(!citySearch) return;
      const coords = await getCoords(citySearch)
      if(coords) {
        setPosition([coords.lat, coords.lon])
      }
        
    }


    // FUNCIONES DEL MAPA
    function UpdateMap({position} ) {
        const map= useMap();
        map.setView(position, 12)
        return null
    }

    function ClickHandler({setPosition, setCitySearch}) {
        useMapEvents({
            click: async (e) => {
                const {lat, lng }= e.latlng;
                setPosition([lat, lng]);

                try {
                    const cityName = await getCityName(lat,lng)
                    setCitySearch(cityName)
                } catch(error) {
                    setPositionError('Error obteniendo el nombre de la ciudad: ', error)
                    setCitySearch('Ubicación desconocida')
                }
            },
        })
        return null;
    }

    return (
        <section className="searcher">
            <h2>Comienza a planear tu viaje 🛬</h2>

          <form onSubmit={handleSubmit}>
          <input type="text" 
          value={citySearch} 
          placeholder="Busca una ciudad..." 
          onChange={handleSearchChange}
          />
          <button>Ir</button>
          </form>

          { positionError && (<div className="error-message">{positionError}</div>)}

          <MapContainer center={position} zoom={12} style={{ height: "350px", width: "90%"}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'/>
            <UpdateMap position={position} />
            <Marker position={position}><Popup>Ubicación actual</Popup>
            </Marker>
            <ClickHandler setPosition={setPosition} setCitySearch={setCitySearch}/>
          </MapContainer>


        </section>
    )
}