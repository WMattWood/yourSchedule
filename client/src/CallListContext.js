import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const CallListContext = createContext(null);

export const CallListProvider = ({ children }) => {

  console.log("ATTENTION ALL... THE CALL LIST CONTEXT... HAS RENDERED.")
  const [ globalEdit, setGlobalEdit ] = useState()
  const [ globalUpdatedEntries, setGlobalUpdatedEntries ] = useState([])

  // const [ modalVisibility, setModalVisibility ] = useState(false)
  // const [ monthlyCalendar, setMonthlyCalendar ] = useState([])
  // const [ activeDate, setActiveDate ] = useState(new Date());
  // const [ formData, setFormData ] = useState( { name: "", 
  //                                               location: "",
  //                                               client: "",
  //                                               dateMonth: activeDate.getMonth(),
  //                                               dateDay: activeDate.getDate(),
  //                                               dateYear: activeDate.getFullYear(),
  //                                               callList: [],
  //                                               callListFull: false
  //                                             })

  // useEffect( () => {
  //     setFormData({...formData,
  //                     dateMonth: activeDate.getMonth(),
  //                     dateDay: activeDate.getDate(),
  //                     dateYear: activeDate.getFullYear() })
  // }, [activeDate] )

  // useEffect( () => {
  //   fetch(`/callList/all/${event._id}`, {
  //     "method": "PATCH",
  //     "body": JSON.stringify({
  //       "updatedEntries": updatedEntry
  //     }),
  //       "headers": {
  //         "Content-Type": "application/json"
  //       }
  //   })
  // }, [globalEdit])

    return (
        <CallListContext.Provider
            value={{
              globalEdit,
              setGlobalEdit,
              globalUpdatedEntries,
              setGlobalUpdatedEntries
            }}
            >
                {children}
            </CallListContext.Provider>
    );
};

export default CallListProvider;