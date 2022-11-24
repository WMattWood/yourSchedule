import styled from 'styled-components'
import { useEffect } from 'react'

const CalendarModule = () => {

  // const dayOfWeek = (dayIndex) => {
  //   switch (dayIndex) {
  //   case 0:
  //     return "Sunday"
  //   case 1:
  //     return "Monday"
  //   case 2:
  //     return "Tuesday"
  //   case 3:
  //     return "Wednesday"
  //   case 4:
  //     return "Thursday"
  //   case 5:
  //     return "Friday"
  //   case 6:
  //     return "Saturday"
  //   }
  // }
  
  // const monthOfYear = (monthIndex) => {
  //   switch (monthIndex) {
  //   case 0:
  //     return "January"
  //   case 1:
  //     return "February"
  //   case 2:
  //     return "March"
  //   case 3:
  //     return "April"
  //   case 4:
  //     return "May"
  //   case 5:
  //     return "June"
  //   case 6:
  //     return "July"
  //   case 7:
  //     return "August"
  //   case 8:
  //     return "September"
  //   case 9:
  //     return "October"
  //   case 10:
  //     return "November"
  //   case 11:
  //     return "December"
  //   }
  // }
  
  // const monthIndex = (monthOfYear) => {
  //   switch (monthOfYear) {
  //   case "January":
  //     return 0
  //   case "February":
  //     return 1
  //   case "March":
  //     return 2
  //   case "April":
  //     return 3
  //   case "May":
  //     return 4
  //   case "June":
  //     return 5
  //   case "July":
  //     return 6
  //   case "August":
  //     return 7
  //   case "September":
  //     return 8
  //   case "October":
  //     return 9
  //   case "November":
  //     return 10
  //   case "December":
  //     return 11
  //   }
  // }
  
  let today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  let selectYear = document.getElementById("year")
  let selectMonth = document.getElementById("month")
  
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let years = []
  for ( let i = 2000; i <= 2038; i++ ) {
    years.push(i)
  }

  let monthAndYear = document.getElementById("monthAndYear")
 
  
  // Display Next Month
  const next = () => {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
  }
  
  // Display Previous Month
  const previous = () => {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
  }
  
  // Jump To Specific Month
  function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
  }
  







  const showCalendar = (month, year) => {
    
    ////// HELPER METHODS
    let firstDayOfTheMonth = (new Date(year, month)).getDay()
    let daysInMonth = 32 - (new Date(year, month, 32)).getDate()
    // console.log(dayOfWeek(firstDayOfTheMonth) )
    // console.log(daysInMonth)
  
    let calendarTable = document.getElementById("calendar-body");
    calendarTable.innerHTML = "";
  
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;
  
    ////// GENERATE TABLE
    // date starts at 1, only starts counting up once we hit
    // a dayOfWeek which is equal to firstDayOfTheMonth
    let currentDate = 1;
    // for each month, a calendar can have a maximum of 6 rows.
    // this occurs when top and bottom row have < 1 or 2 days
    for (let weekRow = 0; weekRow < 6; weekRow++) {
  
        // create a row
        let tableRow = document.createElement("tr");
  
        // for each weekRow, check if dayOfWeek is greater than
        // or equal to the firstDayOfTheMonth
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
  
            // if we're in the first row and dayOfWeek is still
            // less than the firstDayOfTheMonth...
            if ( weekRow === 0 && dayOfWeek < firstDayOfTheMonth) {
  
                // make a new cell square with a blank heading and
                // append it to the current row.
                let cellSquare = document.createElement("td");
                let cellText = document.createTextNode("");
                cellSquare.appendChild(cellText);
                tableRow.appendChild(cellSquare);
            }
  
            // if our currentDate has incremented up above the total
            // daysInMonth then we can exit our loop.
            else if (currentDate > daysInMonth) {
                break;
            }
  
            // otherwise if we have reached a dayOfWeek which is
            // higher than or equal to our firstDayOfTheMonth...
            // 
            else {
  
                // make a new cell square with a heading of the 
                // currentDate and append it to the current row.
                let cellSquare = document.createElement("td");
                let cellText = document.createTextNode(currentDate);
                if ( currentDate === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                  cellSquare.classList.add("bg-info")
                }
                cellSquare.appendChild(cellText);
                tableRow.appendChild(cellSquare);
  
                // increment the currentDate up by one and 
                // do the next loop
                currentDate++;
            }
        }
        calendarTable.appendChild(tableRow); // appending each row into calendar body.
    }

    return(
      calendarTable
    )
  }
  






  
  // showCalendar(10, 2022) mean November 2022 because month index starts at 0

  useEffect( () => {
    // showCalendar(currentMonth, currentYear)
  }, [])
  
  return (
    <>
      <CalendarWrapper className="container col-sm-4 col-md-7 col-lg-4 mt-5">
        <Card className="card">
          <h3 className="card-header" id="monthAndYear">{`${months[currentMonth]} ${currentYear}`}</h3>
          <CalendarTable className="table table-bordered table-responsive-sm" id="calendar">
            <thead>
              <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
            </thead>
            <CalendarBody id="calendar-body"></CalendarBody>
          </CalendarTable>
          <NavWrapper className="form-inline">
            <NavButton
              className="btn btn-outline-primary col-sm-6"
              id="previous"
              onclick={ () => previous() }
              > Previous
            </NavButton>
            <NavButton
              className="btn btn-outline-primary col-sm-6"
              id="next"
              onclick={ () => next() }
              > Next
            </NavButton>
          </NavWrapper>
          <br /> {/* notnecessary */}
          <JumpSectionForm className="form-inline">
            <label className="lead mr-2 ml-2" htmlFor="month"> Jump To:{" "} </label>
            <MonthSelect
                className="form-control col-sm-4"
                name="month"
                id="month"
                onchange={ () => jump() }
                > {months.map( (month, idx) => <MonthOption value={idx}>{month}</MonthOption>)}
            </MonthSelect>
            <label htmlFor="year" />
            <YearSelect
                className="form-control col-sm-4"
                name="year"
                id="year"
                onchange={ () => jump() }
                > {years.map( (year) => <YearOption value={year}>{year}</YearOption>)}
            </YearSelect>
          </JumpSectionForm>
        </Card>
      </CalendarWrapper>
    </>
  )
}

const CalendarWrapper = styled.div`
  height: 600px;
  width: 600px;
  box-sizing: border-box;
  border: 2px solid red;
`
const Card = styled.div`
  height: 60px;
  width: 60px;
  box-sizing: border-box;
  border: 2px solid pink;
`
const CalendarTable = styled.table`
  height: 500px;
  width: 500px;
  box-sizing: border-box;
  border: 2px solid green;
`

const CalendarBody = styled.tbody`
  height: 490px;
  width: 490px;
  box-sizing: border-box;
  border: 2px solid blue;
`

const NavWrapper = styled.div`
`
const NavButton = styled.button`
`
const JumpSectionForm = styled.form`
`
const MonthSelect = styled.select`
`
const MonthOption = styled.option`
`
const YearSelect = styled.select`
`
const YearOption = styled.option`
`

export default CalendarModule;