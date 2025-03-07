import { useState } from "react";
import { createContext } from "react";

export const ItineraryContext= createContext()

export function ItineraryProvider({children}){
    const [itinerary, setItinerary] = useState({cities: []});


    const addToItinerary = (city) => {
        setItinerary(prevState => {
            const citiesArray = Array.isArray(prevState.cities) ? prevState.cities : [];
            
            if (!city || typeof city !== 'object' || !city.name) return prevState;
    
            const cityExists = citiesArray.some(c => c.name === city.name);
            if (cityExists) return prevState;
    
            const newState = {
                ...prevState,
                cities: [...citiesArray, { name: city.name, places: [] }]
            };
    
            console.log('Nuevo itinerario:', newState); // 👈 Verifica que se actualiza
    
            return newState;
        });
    };
    
    

    const addPlaceToCity=(cityName, place) => {
        setItinerary(prevState=> ({
            ...prevState, 
            cities: prevState.cities.map(c=> 
                c.name === cityName ? {...c, places: [...c.places, place]} : c
            )
        }))
    }

    const deleteFromItinerary = (city) => {
        setItinerary(prevState => ({
            ...prevState,
            cities: prevState.cities.filter(c => c.name !== city.name)
        }));
    };

    const deletePlace = (cityName, placeName) => {
        setItinerary(prevState => ({
            ...prevState,
            cities: prevState.cities.map(city => 
                city.name === cityName
                ? { ...city, places: city.places.filter(place => place !== placeName) }
                : city
            )
        }));
    }
    
    return (
        <ItineraryContext.Provider
        value={{itinerary,
         addToItinerary,
          deleteFromItinerary, 
          addPlaceToCity,
          deletePlace}}>
            {children}
        </ItineraryContext.Provider>
    )
}