import * as React from 'react';
import Foursquare from '../images/powered-by-foursquare-black-300.png';
import styled from 'styled-components';

type Margin = 'top' | 'bottom';

interface ImageProps {
  margin?: Margin[];
}

const Link = styled.a`
  text-decoration: none;
  text-align: center;
`;

const Image = styled.img<ImageProps>`
  max-width: 200px;
  width: 100%;
  margin: 0 auto;
  opacity: 0.5;

  ${p =>
    p.margin &&
    p.margin.map(direction => `margin-${direction}: 10px;`).join('\n')}
`;

interface PoweredByProps {
  margin?: Margin[];
  url?: string;
}

export const PoweredBy = ({ margin, url }: PoweredByProps) => {
  if (url) {
    return (
      <Link
        href={url}
        target="_blank"
        rel={process.env.REACT_APP_FOURSQUARE_CLIENT_ID}
      >
        <Image src={Foursquare} margin={margin} />
      </Link>
    );
  }
  return <Image src={Foursquare} margin={margin} />;
};
