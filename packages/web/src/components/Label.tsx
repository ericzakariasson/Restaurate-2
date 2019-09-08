import * as React from 'react';
import styled from 'styled-components';
import { Size } from 'style';

interface LabelProps {
  text: string;
  noMargin?: boolean;
  htmlFor?: string;
  as?: any;
  error?: boolean;
  size?: Size;
}

interface LabelStyleProps {
  noMargin?: boolean;
  error?: boolean;
  size: Size;
}

const Normal = styled.label<LabelStyleProps>`
  display: block;
  font-size: ${p => p.theme.fontSize[p.size]};
  color: ${p => (p.error ? p.theme.colors.error.hex : '#CCC')};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  margin-bottom: ${p => (p.noMargin ? 0 : '5px')};
  font-family: ${p => p.theme.fonts.monospace};
`;

export const Label = ({
  text,
  noMargin,
  htmlFor,
  as,
  error,
  size = 'small'
}: LabelProps) => (
  <Normal
    error={error}
    as={as}
    htmlFor={htmlFor}
    noMargin={noMargin}
    size={size}
  >
    {text}
  </Normal>
);
