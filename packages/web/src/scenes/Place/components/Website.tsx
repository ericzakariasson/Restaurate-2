import * as React from 'react';
import styled from 'styled-components';
import { formatURL } from 'utils/format';

const Link = styled.a`
  color: #222;
  text-decoration: none;
  font-size: ${p => p.theme.fontSize.large};
`;

interface WebsiteProps {
  url: string;
}

export const Website = ({ url }: WebsiteProps) => (
  <Link href={url} target="_blank" rel="noopener">
    {formatURL(url)}
  </Link>
);
