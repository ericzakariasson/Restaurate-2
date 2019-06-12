import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex: 1;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
`;

interface TrackProps {
  size: number;
}

const Track = styled.div<TrackProps>`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  position: relative;
  animation: ${spin} 30s infinite linear;
`;

const Box = styled.div<TrackProps>`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  border: 1px solid #222;
  transform: translate(7px, 7px);
  box-shadow: ${p => p.theme.boxShadow};
`;

const rotate = keyframes`
  0% {
    top: 0;
    left: 0;
  }
  
  8% {
    top: 0;
    left: 90%;
  }

  12% {
    top: 0;
    left: 90%;
  }

  20% {
    top: 0;
    left: 100%;
  }
  
  28% {
    top: 10%;
    left: 100%;
  }
  
  32% {
    top: 90%;
    left: 100%;
  }
  
  40% {
    top: 100%;
    left: 100%;
  }
  
  48% {
    top: 100%;
    left: 90%;
  }
  
  52% {
    top: 100%;
    left: 10%;
  }
  
  60% {
    top: 100%;
    left: 0%;
  }
  
  68% {
    top: 90%;
    left: 0%;
  }
  
  72% {
    top: 10%;
    left: 0%;
  }
  
  80% {
    top: 0%;
    left: 0%;
  }
  
`;

const Handle = styled.span`
  position: absolute;
  width: 15px;
  height: 15px;
  border: 6px solid ${p => p.theme.colors.primary.hex};
  background: #222;
  box-shadow: ${p => p.theme.boxShadow};
  z-index: 1;
  transition: 2s;
  animation: ${rotate} 2s infinite linear;
`;

interface LoaderProps {
  size?: number;
}

export const Loading = ({ size = 48 }: LoaderProps) => {
  return (
    <Wrapper>
      <Track size={size}>
        <Handle />
        <Box size={size} />
      </Track>
    </Wrapper>
  );
};
