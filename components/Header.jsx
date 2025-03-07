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
            <h2>Comienza a planear tu viaje   </h2>
                </header>
    )
}