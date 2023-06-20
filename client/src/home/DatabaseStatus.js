import styled from "styled-components";
import { useState, useEffect } from "react"
import Loading from "../animations/Loading";
import Loaded from "../animations/Loaded";

const DatabaseStatus = () => {

    const [ dbConnectionActive, setDbConnectionActive ] = useState(null)

    useEffect( () => {
        fetch(`${process.env.REACT_APP_URL_BASE}/members/allmembers`)
        .then( res => res.json() )
        .then( res => setDbConnectionActive(res.data) )
    }, [] )

    return (
        <DatabaseStatusContainer>
        { ! dbConnectionActive
            ? <Loading/> 
            : <Loaded/>
        }
        </DatabaseStatusContainer>
    )
}

const DatabaseStatusContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 20px;
`

export default DatabaseStatus