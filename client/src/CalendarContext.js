import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

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
                                                  callList: [],
                                                  callListFull: false
                                                })

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