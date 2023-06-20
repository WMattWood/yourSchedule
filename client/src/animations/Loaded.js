import styled, {keyframes} from 'styled-components'

const Loaded = () => {
  return (
    <>
    
        <LoadedContainer>
            <Heart class="ldsHeart">
                <div></div>
            </Heart>
        </LoadedContainer>
        <Text> Database is now online! </Text>
    </>
  )
}

const loadedAnimation = keyframes`

    0% {
    transform: scale(0.95);
    }
    5% {
    transform: scale(1.1);
    }
    39% {
    transform: scale(0.85);
    }
    45% {
    transform: scale(1);
    }
    60% {
    transform: scale(0.95);
    }
    100% {
    transform: scale(0.9);
    }
`

const LoadedContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100px;
    transform: rotate(45deg);
    /* transform-origin: 40px 40px; */

    .ldsHeart {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }

`

const Heart = styled.div`
    /* top: 32px; */
    /* left: 32px; */
    position: absolute;
    width: 32px;
    height: 32px;
    background: #fff;
    animation-name: ${loadedAnimation};
    animation-duration: 1.2s;
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-iteration-count: infinite;
    display: inline-block;
    transform: rotate(45deg);
    transform-origin: 40px 40px;

    :after, :before {
        content: " ";
        position: absolute;
        display: inline-block;
        width: 32px;
        height: 32px;
        background: #fff;
    }

    :before {
        display: inline-block;
        left: -24px;
        border-radius: 50% 0 0 50%;
        
    }

    :after {
        display: inline-block;
        top: -24px;
        border-radius: 50% 50% 0 0;
        
    }
`

const Text = styled.p`
  font-family: var(--font-mono);
`
  
export default Loaded