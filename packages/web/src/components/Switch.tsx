import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

interface Elementrops {
  on: boolean;
}

const Base = styled.button<Elementrops>`
  width: 60px;
  height: 28px;
  border-radius: 6px;
  box-shadow: ${p => p.theme.boxShadow};
  padding: 4px;
  border: 1px solid ${p => (p.on ? '#999' : '#EEE')};
  background: #fff;
  position: relative;
  margin: 0 10px;

  &::before {
    content: '';
    position: absolute;
    top: 6px;
    right: 6px;
    bottom: 6px;
    left: 6px;
    border-radius: 3px;
    background: #eee;
  }
`;

const Toggle = styled.div<Elementrops>`
  background: ${p => (p.on ? '#222' : '#222')};
  box-shadow: ${p => p.theme.boxShadow};
  width: 50%;
  height: 100%;
  border-radius: 4px;
  transform: translateX(${p => (p.on ? 100 : 0)}%);
  transition: ${p => p.theme.transition};
`;

interface LabelProps {
  active: boolean;
}

const Label = styled.span<LabelProps>`
  font-family: ${p => p.theme.fonts.monospace};
  text-transform: uppercase;
  color: #666;
  margin-bottom: -5px; /* Compensate for monospace */
  opacity: ${p => (p.active ? 1 : 0.5)};
  transition: ${p => p.theme.transition};
  font-weight: 700;
  font-size: 0.95rem;
`;

interface SwitchProps {
  onChange: (on: boolean) => void;
  defaultOn?: boolean;
  offLabel?: string;
  onLabel?: string;
}

export const Switch = ({
  onChange,
  defaultOn = false,
  onLabel = 'Ja',
  offLabel = 'Nej'
}: SwitchProps) => {
  const [touched, setTouched] = React.useState(false);
  const [on, setOn] = React.useState(defaultOn);

  React.useEffect(() => {
    onChange(on);
  }, [on, onChange]);

  const set = (value: boolean) => {
    setOn(value);
    if (!touched) {
      setTouched(true);
    }
  };

  const toggle = () => {
    setOn(state => !state);
    if (!touched) {
      setTouched(true);
    }
  };

  return (
    <Wrapper>
      <Label active={touched && !on} onClick={() => set(false)}>
        {offLabel}
      </Label>
      <Base onClick={toggle} on={on}>
        <Toggle on={on} />
      </Base>
      <Label active={touched && on} onClick={() => set(true)}>
        {onLabel}
      </Label>
    </Wrapper>
  );
};
