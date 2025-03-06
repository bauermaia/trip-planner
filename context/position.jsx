import { createContext, useState } from "react";

export const PositionContext = createContext()

export function PositionProvider({children}) {

    const [position, setPosition] = useState([40.4168, -3.7038]);
    const [citySearch, setCitySearch] = useState('')

    return(
        <PositionContext.Provider value={{position, setPosition, citySearch, setCitySearch}}>
            {children}
        </PositionContext.Provider>
    )
}