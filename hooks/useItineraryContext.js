import { useContext } from "react";
import { ItineraryContext } from "../context/itinerary";

export const useItineraryContext = () => {
    const context= useContext(ItineraryContext);

    if(!context){
        throw new Error('useItineraryContext debe usarse con itineraryProvider')
    }

    return context;
}