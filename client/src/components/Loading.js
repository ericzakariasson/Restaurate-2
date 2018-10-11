import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
`;

const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 4px solid #EEE;
  border-top-color: ${p => p.theme.action};
  animation: ${rotate360} 2s infinite linear;
`;

const Loading = () => {
  return (
    <Spinner />
  )
}

export default Loading;