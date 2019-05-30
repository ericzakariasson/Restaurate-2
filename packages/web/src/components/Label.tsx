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

interface SmallLabelStyleProps {
  textAlign: string;
}

const Small = styled(Normal)<SmallLabelStyleProps>`
  font-size: 1rem;
  font-weight: 500;
  text-align: ${p => p.textAlign};
`;

interface SmallLabelProps extends LabelProps {
  textAlign?: string;
}

export const SmallLabel = ({
  text,
  textAlign = 'center',
  marginBottom = '15px'
}: SmallLabelProps) => (
  <Small as="span" marginBottom={marginBottom} textAlign={textAlign}>
    {text}
  </Small>
);
