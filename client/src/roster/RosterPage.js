import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'

const RosterPage = () => {

  const [ roster, setRoster ] = useState(null)

  useEffect( () => {
    fetch(`${process.env.REACT_APP_URL_BASE}/members/allmembers`)
      .then( res => res.json() )
      .then( res => setRoster(res.data) )
  }, [] )

  return (
    <>
      { !roster 
        ? <h1>Loading roster...</h1>
        : <RosterWrapper>
            <h1>Current Roster</h1>
            {roster.map( member => {
              return  <MemberWrapper key={uuidv4()}>
                          <Name>{member.name} </Name>
                          <Phone>{member.phone} </Phone>
                          <Email>{member.email} </Email>
                          {/* <Address>{member.address} </Address> */}
                          <br/>
                      </MemberWrapper>
            })}
          </RosterWrapper>
      }
    </>
  )
}

const RosterWrapper = styled.div`
`
const MemberWrapper = styled.div`
 display: flex;
 margin-bottom: 5px;
`
const Name = styled.div`
  font-weight: bold;
  width: 200px;
`
const Phone = styled.div`
  width: 120px;
`
const Email = styled.div`
`
export default RosterPage