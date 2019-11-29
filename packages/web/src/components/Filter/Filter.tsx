import * as React from 'react';
import { FilterBox } from './components/FilterBox';
import { List as ListIcon, Filter as FilterIcon } from 'react-feather';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

export const Filter = () => {
  return (
    <Wrapper>
      <FilterBox title="Sortera" icon={ListIcon} />
      <FilterBox title="Filtrera" icon={FilterIcon} />
    </Wrapper>
  );
};
