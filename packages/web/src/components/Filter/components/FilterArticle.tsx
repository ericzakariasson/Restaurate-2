import * as React from 'react';
import styled from 'styled-components';
import { Label } from 'components/Label';

const Article = styled.article`
  margin-bottom: 20px;
`;

interface FilterArticleProps {
  title: string;
}

export const FilterArticle: React.FC<FilterArticleProps> = ({
  title,
  children
}) => {
  return (
    <Article>
      <Label text={title} as="h1" />
      {children}
    </Article>
  );
};
