import * as React from 'react';
import styled from 'styled-components';
import { RateNode, SetRatePayload, RateStateNode } from '../rateReducer';
import { InputSlider } from 'components/Slider';
import { RateSliderChild } from './RateChild';
import { calculateAverageNodeScore } from '../rateHelper';

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;

  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;

const ParentArea = styled.div``;

const ChildArea = styled.ul`
  padding-top: 10px;
  list-style: none;
  margin-left: 6px;
  padding-left: 12px;
  position: relative;
  /* border-left: 1px solid #eee; */

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    height: calc(
      100% - 16px
    ); /* Half height of small input slider 32 / 2 = 16 */
    background: #eee;
  }
`;

const Text = styled.h2`
  margin-bottom: 5px;
  font-size: ${p => p.theme.fontSize.xxl};
  font-weight: 400;
  color: #222;
`;

const Score = styled.span`
  font-size: 1.625rem;
  font-weight: 700;
  color: #222;
`;

export interface RateSliderProps {
  label: string;
  name: string;
  score: number | null;
  setScore: (payload: SetRatePayload) => void;
}

interface RateSliderParentProps extends RateSliderProps {
  controlled: boolean;
  children?: RateStateNode[];
}

export const RateSliderParent = ({
  label,
  name,
  score,
  setScore,
  children,
  controlled
}: RateSliderParentProps) => {
  const averageScore = calculateAverageNodeScore(children || []) || 0;

  const s = controlled && children ? averageScore : score || 0;

  return (
    <Wrapper>
      <ParentArea>
        <Text>
          <span>{label} – </span>
          <Score>{s}</Score>
        </Text>
        <InputSlider
          value={s}
          onChange={score => setScore({ name, score })}
          controlled={controlled}
        />
      </ParentArea>
      {children && (
        <ChildArea>
          {children.map(child => (
            <RateSliderChild
              key={child.name}
              setScore={setScore}
              name={child.name}
              label={child.label}
              score={child.score}
              parent={name}
            />
          ))}
        </ChildArea>
      )}
    </Wrapper>
  );
};
