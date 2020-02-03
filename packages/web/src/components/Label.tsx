import * as React from 'react';
import styled from 'styled-components';
import { Size } from 'style/theme';

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
  color: ${p => (p.error ? p.theme.colors.error.default : '#999')};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  margin-bottom: ${p => (p.noMargin ? 0 : '0.5rem')};
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
