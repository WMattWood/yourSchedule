import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { v4 as uuidv4 } from 'uuid';

export const CalendarContext = createContext(null);

export const CalendarProvider = ({ children }) => {

    const [ modalVisibility, setModalVisibility ] = useState(false)
    const [ monthlyCalendar, setMonthlyCalendar ] = useState([])
    const [ activeDate, setActiveDate ] = useState(new Date());
    const [ formData, setFormData ] = useState( { name: "", 
                                                  location: "",
                                                  client: "",
                                                  dateMonth: activeDate.getMonth(),
                                                  dateDay: activeDate.getDate(),
                                                  dateYear: activeDate.getFullYear(),
                                                //   callList: []
                                                  callList: [{ name: "unfilled", position: "tech" }]
                                                })

    // console.log("Context level formData", formData)
    // console.log(new Date().getMonth())
    // console.log(new Date().getDate())
    // console.log(new Date().getFullYear())

    useEffect( () => {
        setFormData({...formData,
                        dateMonth: activeDate.getMonth(),
                        dateDay: activeDate.getDate(),
                        dateYear: activeDate.getFullYear() })
    }, [activeDate] )

    return (
        <CalendarContext.Provider
            value={{
                modalVisibility,
                setModalVisibility,
                monthlyCalendar,
                setMonthlyCalendar,
                activeDate,
                setActiveDate,
                formData,
                setFormData,
            }}
            >
                {children}
            </CalendarContext.Provider>
    );
};

export default CalendarProvider;