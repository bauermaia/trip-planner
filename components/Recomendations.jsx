import { useEffect, useState } from "react"
import { usePosition } from "../hooks/usePosition"
import { useRecomendations } from "../hooks/useRecomendations"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useMap } from "react-leaflet"
import translations from '../src/assets/translations.json'
import { useItineraryContext } from "../hooks/useItineraryContext"

export function Recomendations() {
    
    const [focusRecom, setfocusReco] = useState(null)

    const markerIcon = new L.icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41], 
        popupAnchor: [1, -34],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41]
    })

    const {recomendations, getRecomendations} = useRecomendations()
    const {position, citySearch} = usePosition()
    const {addPlaceToCity} =useItineraryContext()
    

    useEffect(() => {
        getRecomendations({position})
    }, [position])


    // Componente UpdateMap ahora maneja el cambio de vista
    function UpdateMap() {
        const map = useMap();
        useEffect(() => {
            if (focusRecom) {
                map.setView([focusRecom.point.lat, focusRecom.point.lon], 17); // Centra el mapa en el marcador seleccionado
            } else if(position) {
                map.setView([position.lat, position.lon], 17); // Centra el mapa en la nueva posición si no hay foco
            }
        }, [focusRecom, position, map]); // Solo se actualiza cuando focusRecom cambia

        return null;
    }

    const handleMarkerClick = (reco) => {
        setfocusReco(reco); // Establece la recomendación seleccionada y actualiza el mapa
    }

    const translateCategory = (category) => {
        return translations[category] || category;
    }
    
    return (
        <section className="recomendations">
            <h2>Qué visitar 👀 </h2>
            <div className="recomendations-container">
                {/* Contenedor de la lista */}
                <div className="recomendations-list-container">
                    {focusRecom ? (
                        <>
                            <h1>{focusRecom.name}</h1>
                            <h3>Categorías: </h3>
                            {focusRecom.category.map((cate, index) => (
                                <h5 key={index}>{translateCategory(cate)}</h5>
                            ))}
                            <button onClick={() => window.open(`https://es.wikipedia.org/wiki/${focusRecom.name}`, '_blank')}>Más información</button>
                            <button onClick={()=> addPlaceToCity(citySearch, focusRecom.name)}>Agregar al itinerario</button>
                        </>
                    ) : (
                        <h3>Selecciona una locación para ampliar la información sobre el sitio</h3>
                    )}
                </div>

                {/* Contenedor del mapa */}
                <div className="recomendations-map">
                    <MapContainer center={[position.lat, position.lon]} zoom={17} style={{ height: "100%", width: "100%" }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <UpdateMap />
                        {recomendations.map(reco => (
                            <Marker 
                                key={reco.id} 
                                position={[reco.point.lat, reco.point.lon]} 
                                icon={markerIcon} 
                                opacity={focusRecom && focusRecom?.id === reco.id ? 1 : 0.5}
                                eventHandlers={{
                                    click: () => handleMarkerClick(reco) // Centra el mapa en el marcador clickeado
                                }}
                            >
                                <Popup>{reco.name}</Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </section>
    ) 
}
