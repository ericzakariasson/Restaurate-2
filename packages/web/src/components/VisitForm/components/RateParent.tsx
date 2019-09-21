import * as React from 'react';
import styled from 'styled-components';
import { SetRatePayload, RateStateNode } from '../rateReducer';
import { InputSlider } from 'components/Slider';
import { RateSliderChild } from './RateChild';
import { calculateAverageNodeScore } from '../rateHelper';
import { ActionButton } from 'components';
import { X } from 'react-feather';

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
  display: flex;
  align-items: center;
`;

const Separator = styled.span`
  margin: 0 5px;
`;

interface ScoreProps {
  disabled: boolean;
}

const Score = styled.span<ScoreProps>`
  font-size: 1.625rem;
  font-weight: 700;
  color: ${p => (p.disabled ? '#CCC' : '#222')};
  transition: ${p => p.theme.transition};
`;

interface RateHeaderProps {
  label: string;
  score: number | null;
  resetScore?: () => void;
}

export const RateHeader = ({ label, score, resetScore }: RateHeaderProps) => (
  <Text>
    <span>{label}</span>
    <Separator>–</Separator>
    <Score disabled={score === 0}>{score}</Score>
    {resetScore && score !== 0 && (
      <ActionButton onClick={resetScore} icon={<X size={18} color="#666" />} />
    )}
  </Text>
);

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
  const s =
    controlled && children
      ? calculateAverageNodeScore(children || []) || 0
      : score || 0;

  return (
    <Wrapper>
      <ParentArea>
        <RateHeader
          label={label}
          score={s}
          resetScore={() => setScore({ name, score: 0 })}
        />
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
