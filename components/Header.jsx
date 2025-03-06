import { usePosition } from "../hooks/usePosition"


export function Header() {

    const {getUserPosition, setCitySearch} = usePosition()

    const handleLogoClick=()=>{
        setCitySearch('');
        getUserPosition()

    }
    
    return(
        <header>
            <img src="/images/logo.png" alt="" onClick={handleLogoClick} />
            <nav>
                <a href="#">Destinos</a>
                <a href="#">Experiencias</a>
                <a href="#">Contacto</a>
                </nav>
                <button>Reservar</button>
                </header>
    )
}