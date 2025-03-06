import { useState } from "react"

export function useRecomendations() {

    const [recomendations, setRecomendations] = useState([])


    const getRecomendations = async({position})=>{

    
        const RECOMENDATION_ENDPOINT= `https://api.opentripmap.com/0.1/en/places/radius?lat=${position.lat}&lon=${position.lon}&radius=3000&kinds=natural,historic_architecture,cultural,historic&format=json&apikey=5ae2e3f221c38a28845f05b6a29d5d1b714b831ef508e4cb1ce0d228`
       try {
        
       const response= await fetch(RECOMENDATION_ENDPOINT) 
        
        const data= await response.json()
        
        if(data) {
            const recomendationsData= data.map(reco=> ({
                name: reco.name,
                point: {lat: reco.point.lat, lon: reco.point.lon},
                category: reco.kinds,
                id: reco.xid
        }))

       const filteredRecomendations= recomendationsData.filter(reco=> reco.name != '')

          setRecomendations(filteredRecomendations)  
        }else {
            console.error('No se encontraron recomendaciones')
        }
       }catch(error) {
        console.error("Error en la consulta de recomendaciones", error)
       }
    }


    return {getRecomendations, recomendations, setRecomendations}
}