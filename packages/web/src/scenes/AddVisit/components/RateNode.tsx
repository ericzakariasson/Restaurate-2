import * as React from 'react';
import styled from 'styled-components';

import { RateNode } from '../types/visit';
import { InputSlider } from '../../../components/Slider';

import { Rate } from '../addVisitActions';

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 3px;

  &:not(:last-of-type) {
    margin-bottom: 15px;
  }
`;

interface NodeProps {
  node: RateNode;
  setMoving: (moving: boolean) => void;
  setRate: (rate: Rate) => void;
}

export const Node = ({ node, setMoving, setRate }: NodeProps) => {
  const [value, setValue] = React.useState<number>(0);

  return (
    <Wrapper>
      <InputSlider
        value={value}
        onInput={setValue}
        label={node.label}
        onChange={() => setRate({ name: node.name, score: value })}
        onSlideStart={() => setMoving(true)}
        onSlideEnd={() => setMoving(false)}
      />
    </Wrapper>
  );
};
