import * as React from 'react';
import styled, { keyframes, css } from 'styled-components';

const popIn = keyframes`
  from {
    transform: scale(0)
  }
  
  to {
    transform: scale(1)
  }
`;

interface WrapperProps {
  fullscreen: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex: 1;
  /* animation: ${popIn} ease-in-out 0.25s; */

  ${p =>
    p.fullscreen &&
    css`
      width: 100vw;
      height: calc(100vh - 58px);
    `}
`;

interface LoaderProps {
  size?: number;
  fullscreen?: boolean;
}

const DOTS = 3;

export const Loading = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ size = 48, fullscreen = true }, forwardRef) => {
    return (
      <Wrapper fullscreen={fullscreen} ref={forwardRef}>
        {Array.from({ length: DOTS }, (_, i) => (
          <Dot key={i} index={i} />
        ))}
      </Wrapper>
    );
  }
);

const wave = keyframes`
  0% {
    transform: translateY(0);
  }
  
  50% {
    transform: translateY(0.75rem);
  }
  
  100% {
    transform: translateY(0);
  }
`;

interface DotProps {
  index: number;
}

const Dot = styled.div<DotProps>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 0.75rem;
  box-shadow: ${p => p.theme.boxShadow};
  background: #222;
  will-change: transform;
  animation: ${wave} 1.2s ease-in-out infinite;
  animation-delay: ${p => p.index / 5}s;

  &:not(:last-of-type) {
    margin-right: 1rem;
  }
`;
