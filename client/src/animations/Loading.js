import styled, { keyframes } from 'styled-components'

const Loading = () => {
  return (
    <>
      <Text> Database is loading... </Text>
      <LoadingContainer>
          <Circle className='num1'/><Circle className='num2'/><Circle className='num3'/>
          <Circle className='num4'/><Circle className='num5'/><Circle className='num6'/>
          <Circle className='num7'/><Circle className='num8'/><Circle className='num9'/>
      </LoadingContainer>
    </>
  )
}

const loadingAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 20px;

  .num1 {
    top: 8px;
    left: 8px;
    animation-delay: 0s;
  }
  .num2 {
    top: 8px;
    left: 32px;
    animation-delay: -0.4s;
  }
  .num3 {
    top: 8px;
    left: 56px;
    animation-delay: -0.8s;
  }
  .num4 {
    top: 32px;
    left: 8px;
    animation-delay: -0.4s;
  }
  .num5 {
    top: 32px;
    left: 32px;
    animation-delay: -0.8s;
  }
  .num6 {
    top: 32px;
    left: 56px;
    animation-delay: -1.2s;
  }
  .num7 {
    top: 56px;
    left: 8px;
    animation-delay: -0.8s;
  }
  .num8 {
    top: 56px;
    left: 32px;
    animation-delay: -1.2s;
  }
  .num9 {
    top: 56px;
    left: 56px;
    animation-delay: -1.6s;
  }
`

const Circle = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  animation-name: ${loadingAnimation};
  animation-duration: 1.2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`

const Text = styled.p`
  font-family: var(--font-mono);
`

export default Loading