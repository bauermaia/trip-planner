import { useEffect, useState } from "react"
import { useInformation } from "../hooks/useInformation"
import { usePosition } from "../hooks/usePosition"
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {Pagination, Navigation, Autoplay} from 'swiper/modules'


export function Information() {
    
    const {citySearch} = usePosition()
    const {getInfo, getCityImages} = useInformation()
    const [cityInfo, setCityInfo] = useState()
    const [cityImage, setCityImage] = useState([])

    useEffect(()=>{

        if(!citySearch) return;
        const fetchData = async () => {
            try {
                
            const information = await getInfo(citySearch);
            setCityInfo(information)
            const image= await getCityImages(citySearch)
            setCityImage(image)
            } catch(error) {
                console.error("Error obteniendo la información", error)
            }
        };

        fetchData();
    },[citySearch])

   
    if (!cityInfo) return <p>Cargando información 🕗 </p>;


    return (
        <section className="information">
            <h1>Información sobre:{citySearch}</h1>           
  <>
    <p>{cityInfo.description}</p>
    {cityImage && cityImage.length > 0 && (
      <div className="swiper-container">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={10}
          slidesPerView={1}
          style={{ paddingBottom: '30px' }}
        >
          {cityImage.map((image, index) => (
            <SwiperSlide key={index}>
              <img className="swiper-img" src={image} alt={`Imagen de ${citySearch}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )}
    <button onClick={() => window.location.href = "https://" + cityInfo.url}>
      Más Información
    </button>
  </>



        </section>
    )
}