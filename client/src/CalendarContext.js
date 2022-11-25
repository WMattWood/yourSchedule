import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { v4 as uuidv4 } from 'uuid';

export const CalendarContext = createContext(null);

export const CalendarProvider = ({ children }) => {

    const [ modalVisibility, setModalVisibility ] = useState(false)
    const [ activeDate, setActiveDate ] = useState(new Date());
    const [ formData, setFormData ] = useState( { name: "", 
                                                    location: "",
                                                    dateMonth: activeDate.getMonth(),
                                                    dateDay: activeDate.getDay(),
                                                    dateYear: activeDate.getFullYear()
                                                })

    return (
        <CalendarContext.Provider
            value={{
                modalVisibility,
                setModalVisibility,
                activeDate,
                setActiveDate,
                formData,
                setFormData
            }}
            >
                {children}
            </CalendarContext.Provider>
    );
};

export default CalendarProvider;