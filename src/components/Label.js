import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

const StyledLabel = styled.label`
  font-size: 1.8rem;
  color: #444;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Label = ({ children, htmlFor, ...props }) => (
  <StyledLabel htmlFor={htmlFor} {...props}>{children}</StyledLabel>
)

Label.propTypes = {
  children: PropTypes.string.isRequired,
  htmlFor: PropTypes.string
}

export default Label;