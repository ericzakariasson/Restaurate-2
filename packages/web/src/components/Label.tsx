import * as React from 'react';
import styled from 'styled-components';

interface LabelProps {
  text: string;
  marginBottom?: string;
  htmlFor?: string;
  as?: any;
  error?: boolean;
}

interface LabelStyleProps {
  marginBottom?: string;
  error?: boolean;
}

const Normal = styled.label<LabelStyleProps>`
  display: block;
  font-size: 0.875rem;
  color: ${p => (p.error ? p.theme.colors.error.hex : '#CCC')};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  margin-bottom: ${p => p.marginBottom || '5px'};
  font-family: ${p => p.theme.fonts.monospace};
`;

export const Label = ({
  text,
  marginBottom,
  htmlFor,
  as,
  error
}: LabelProps) => (
  <Normal error={error} as={as} htmlFor={htmlFor} marginBottom={marginBottom}>
    {text}
  </Normal>
);

interface SmallLabelStyleProps {
  textAlign: string;
}

const Small = styled(Normal)<SmallLabelStyleProps>`
  font-size: 0.75rem;
  font-weight: 500;
  text-align: ${p => p.textAlign};
`;

interface SmallLabelProps extends LabelProps {
  textAlign?: string;
}

export const SmallLabel = ({
  text,
  textAlign = 'center',
  marginBottom = '10px',
  htmlFor,
  error
}: SmallLabelProps) => (
  <Small
    error={error}
    htmlFor={htmlFor}
    marginBottom={marginBottom}
    textAlign={textAlign}
  >
    {text}
  </Small>
);
