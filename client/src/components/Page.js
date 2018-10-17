import React from 'react';
import styled from 'styled-components';

const Padding = styled.div`
  padding: 20px;
`;

const Page = ({ children }) => (
  <Padding>{children}</Padding>
)

export default Page;