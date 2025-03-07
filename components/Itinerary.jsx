import { useId } from "react"
import { useItineraryContext } from "../hooks/useItineraryContext"


function ItineraryItem({city, deleteFromItinerary, deletePlace}) {

    return(
        <div className="itinerary-item">
            <li  >
            <h5>{city.name}</h5>
            <button onClick={()=>deleteFromItinerary(city)}>⛔</button>
           <ul className="places-item">
            {city.places.map((place,index)=> (
                <>
                <li key={index}>{place}</li>
                <button onClick={()=>deletePlace(city.name, place)}>⛔</button>
                </>
            ))}
           </ul>
        </li>
        </div>
    )
}

export function Itinerary () {

    const itineraryActionButtonId= useId();
    const {itinerary, deleteFromItinerary, deletePlace} = useItineraryContext()

    console.log('itinerario:',itinerary)

    return(

        <>
        <label htmlFor={itineraryActionButtonId} className="itinerary-button">
            🕝 
        </label>
        <input type='checkbox' id={itineraryActionButtonId} hidden />

        <aside className="itinerary">
          <ul>
          {itinerary.cities.length > 0 ? (
    itinerary.cities.map((city, index) => 
        city ? ( // 👈 Asegura que `city` no sea undefined
            <ItineraryItem
                key={index}
                deleteFromItinerary={() => deleteFromItinerary(city)}
                city={city} //
                deletePlace={deletePlace}
            />
        ) : null
    )
) : (
    <p>Aún no hay nada en el itinerario</p>
)}
          </ul>
        </aside>
        </>
    )

}