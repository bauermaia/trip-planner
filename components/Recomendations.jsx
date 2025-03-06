import { useEffect, useState } from "react"
import { usePosition } from "../hooks/usePosition"
import { useRecomendations } from "../hooks/useRecomendations"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import L, { marker } from 'leaflet'
import { useMap } from "react-leaflet"

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
    const {position} = usePosition()

    useEffect(()=>{
        getRecomendations({position})
    }, [position])

    function UpdateMap({position}) {
        const map = useMap();
       useEffect(()=> {
        map.setView([position.lat, position.lon], 18);
       },[position,map])
        return null;
    }

    return (
        <section className="recomendations">
            <h1>Qué visitar 👀 </h1>
            <div className="recomendations-container">
                {/* Contenedor de la lista */}
                <div className="recomendations-list-container">
                    {recomendations.length > 0 ? (
                        <ul className="recomendations-list">
                            {recomendations.map(reco => (
                                <li key={reco.id}
                                onMouseEnter={()=>setfocusReco(reco)}
                                onMouseLeave={()=>setfocusReco(null)}>
                                    <p>{reco.name}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <h2>No encontramos recomendaciones en la zona</h2>
                    )}
                </div>

                {/* Contenedor del mapa */}
                <div className="recomendations-map">
                    <MapContainer center={[position.lat, position.lon]} zoom={18} style={{ height: "100%", width: "100%" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <UpdateMap position={position}/>
                    {
                        recomendations.map(reco=> (
                            <Marker key={reco.id} 
                            position={[reco.point.lat, reco.point.lon]} 
                            icon={markerIcon} 
                            opacity={focusRecom && focusRecom?.id === reco.id ? 1 : 0.5}>

                                <Popup>{reco.name}</Popup>
                            </Marker>
                        ))
                    }
                    </MapContainer>
                </div>
            </div>
        </section>
    ) 

}