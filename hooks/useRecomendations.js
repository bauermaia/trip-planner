import { useState } from "react"

export function useRecomendations() {

    const VITE_API_KEY= import.meta.env.VITE_API_KEY
    const [recomendations, setRecomendations] = useState([])


    const getRecomendations = async({position})=>{

    
        const RECOMENDATION_ENDPOINT= `https://api.opentripmap.com/0.1/en/places/radius?lat=${position.lat}&lon=${position.lon}&radius=500&kinds=natural,historic_architecture,cultural,historic&format=json&apikey=${VITE_API_KEY}`
       try {
        
       const response= await fetch(RECOMENDATION_ENDPOINT) 
        
        const data= await response.json()
        
        if(data) {
            const recomendationsData= data.map(reco=> ({
                name: reco.name,
                point: {lat: reco.point.lat, lon: reco.point.lon},
               // Reemplaza los guiones bajos por espacios
        // Y usa una expresión regular para agregar espacio entre palabras concatenadas
        category: reco.kinds
        .replace(/_/g, " ") // Reemplaza los guiones bajos
        .replace(/([a-z])([A-Z])/g, "$1 $2") // Añade espacio entre letras minúsculas y mayúsculas
        .split(",")
        .map(categ => categ.charAt(0).toUpperCase() + categ.slice(1).toLowerCase()) // Capitaliza la primera letra de cada categoría
        .filter(categ => categ !== ""), // Elimina categorías vacías,
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