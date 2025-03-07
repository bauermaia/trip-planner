
import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import { usePosition } from "../hooks/usePosition";
import { useItineraryContext } from "../hooks/useItineraryContext";


export function Searcher() {

    const {position, setPosition, getCoords, getCityName, positionError, setPositionError} = usePosition()
   const {citySearch, setCitySearch} = usePosition()
   const {addToItinerary} = useItineraryContext()
    
    const handleSearchChange=(event)=> {
        setCitySearch(event.target.value)
        setPositionError('')
    }

    const handleSubmit= async(event)=> {
        event.preventDefault()
        if(!citySearch) return;
      const coords = await getCoords(citySearch)
      if(coords) {
        setPosition({lat: coords.lat, lon: coords.lon})
      }
        
    }


    // FUNCIONES DEL MAPA
    function UpdateMap({position} ) {
        const map= useMap();
        map.setView([position.lat, position.lon], 12);
        return null
    }

    function ClickHandler({setPosition, setCitySearch}) {
        useMapEvents({
            click: async (e) => {
                const {lat, lng }= e.latlng;
                setPosition({lat, lon: lng});

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
            <h2>Busca una ciudad</h2>

          <form onSubmit={handleSubmit}>
          <input type="text" 
          value={citySearch} 
          placeholder="Busca una ciudad..." 
          onChange={handleSearchChange}
          />
          <button>Ir</button>
          </form>

          { positionError && (<div className="error-message">{positionError}</div>)}

          <MapContainer center={[position.lat, position.lon]} zoom={12} style={{ height: "350px", width: "90%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'/>
            <UpdateMap position={position} />
            <Marker position={[position.lat, position.lon]}>
            <Popup>Ubicación actual</Popup>
            </Marker>
            <ClickHandler setPosition={setPosition} setCitySearch={setCitySearch}/>
          </MapContainer>

          <button onClick={()=>addToItinerary({name: citySearch, places: []})}>Agregar al itinerario</button>

        </section>
    )
}