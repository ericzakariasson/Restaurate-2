import React from 'react';
import styled, { StyledComponentProps } from 'styled-components';

interface LabelProps {
  text: string;
  marginBottom?: string;
  htmlFor?: string;
  as?: any;
}

interface LabelStyleProps {
  marginBottom?: string;
}

const Normal = styled.label<LabelStyleProps>`
  margin-bottom: 10px;
  display: block;
  text-align: center;
  font-size: 1.125rem;
  color: #ccc;
  font-weight: 400;
  margin-bottom: ${p => p.marginBottom};
`;

export const Label = ({ text, marginBottom, htmlFor, as }: LabelProps) => (
  <Normal as={as} htmlFor={htmlFor} marginBottom={marginBottom}>
    {text}
  </Normal>
);

const Small = styled(Normal)`
  font-size: 1rem;
  font-weight: 500;
`;

interface SmallLabelProps extends LabelProps {}

export const SmallLabel = ({
  text,
  marginBottom = '15px'
}: SmallLabelProps) => (
  <Small as="span" marginBottom={marginBottom}>
    {text}
  </Small>
);
