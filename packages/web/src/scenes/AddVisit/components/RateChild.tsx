import * as React from 'react';
import styled from 'styled-components';
import { RateSliderProps } from './RateParent';
import { InputSlider } from 'components/Slider';

const Wrapper = styled.li`
  &:not(:last-of-type) {
    margin-bottom: 15px;
  }
`;

const SliderWrapper = styled.div`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    right: 100%;
    top: 50%;
    width: 12px;
    height: 1px;
    background: #eee;
  }
`;

const Text = styled.h2`
  margin-bottom: 5px;
  font-size: ${p => p.theme.fontSize.large};
  font-weight: 400;
  color: #222;
`;

const Score = styled.span`
  font-size: ${p => p.theme.fontSize.xl};
  font-weight: 700;
  color: #222;
`;

interface RateSliderChildProps extends RateSliderProps {
  parent: string;
}

export const RateSliderChild = ({
  name,
  label,
  setScore,
  score,
  parent
}: RateSliderChildProps) => {
  return (
    <Wrapper>
      <Text>
        {label} – <Score>{score}</Score>
      </Text>
      <SliderWrapper>
        <InputSlider
          value={score || 0}
          onChange={score => setScore({ name, parent, score })}
          small
        />
      </SliderWrapper>
    </Wrapper>
  );
};
