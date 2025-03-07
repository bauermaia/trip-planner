export function useInformation (){

    const USER_NAME = import.meta.env.VITE_USER_NAME;
    const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
   const getInfo= async(city) => {
        const INFORMATION_ENDPOINT = `https://secure.geonames.org/wikipediaSearchJSON?q=${city}&maxRows=1&lang=es&username=${USER_NAME}`

        try {
            const response = await fetch(INFORMATION_ENDPOINT);
            const data= await response.json();

            if(data.geonames.length > 0 ) {
                const cityData= data.geonames[0];

                return {
                    description: cityData.summary || "Descripción no disponible",
                    image: cityData.thumbnailImg || null,
                    url: cityData.wikipediaUrl || null
                };
            } else {
                console.error("No se encontró información de la ciudad buscada")
                return null
            }
        } catch (error) {
            console.error("Error en la búsqueda de información ", error)
            return null
        }
    }

    const getCityImages = async (city) => {
        const UNSPLASH_API_URL = `https://api.unsplash.com/search/photos?query=${city}&client_id=${CLIENT_ID}`;
    
        try {
            const response = await fetch(UNSPLASH_API_URL);
            const data = await response.json();
            
            const imageUrls = data.results.map(image => image.urls.regular);
            return imageUrls;
            
        } catch (error) {
            console.error('Error obteniendo imágenes de Unsplash:', error);
        }
    };
    

    return {getInfo, getCityImages}
}