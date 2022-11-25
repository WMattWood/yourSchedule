import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { v4 as uuidv4 } from 'uuid';


export const CalendarContext = createContext(null);

export const CalendarProvider = ({ children }) => {

    // const [cartId, setCartId] = useState(sessionStorage.getItem("cartId")); // Receives an Id to be used to set the cart ID for the website

    // if (!cartId) {      //When the website loads it generates a random ID for the cart and assigns it to the Session Storage
    //     let newId = uuidv4();
    //     sessionStorage.setItem("cartId" , newId)
    // };

    // useEffect(() => { //Fetches the order based on the order ID to make sure the cart was successfully created
    //     fetch("/order/:orderId")
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data.id)
    //     })
    //     .catch((error) => {
    //         window.alert("An Error Occured");
    //     })
    // }, [])

    return (
        <CalendarContext.Provider //A provider to pass the cart ID and the method to set it
            value={{
                currentDate,
                setCurrentDate
            }}
            >
                {children}
            </CalendarContext.Provider>
    );
};

export default CalendarProvider;