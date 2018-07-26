import React from 'react';
import styled, { withTheme } from 'styled-components';

import { Transition, animated } from 'react-spring';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SliderWrapper = styled(animated.div)`
  display: flex;
  flex-direction: column;
`;

const HandleWrapper = styled.div`
`;

const TooltipWrapper = styled.div`
  padding: 10px 15px;
  background: ${p => p.theme.visit};
  display: inline-block;
  border-radius: 5px;
  position: absolute;
  transform: translate(-50%, -130%);
  transition: 0.2s;
  transform-origin: 50% 100%;
`;

const TooltipText = styled.h1`
  color: #FFF;
  font-size: 3.6rem;
`;

const Handle = ({ dragging, value, style, ...props }) => {
  return (
    <HandleWrapper>
      <TooltipWrapper style={{
        left: `${value * 10}%`,
        opacity: dragging ? 1 : 0,
        transform: `translate(-50%, -150%) scale(${dragging ? 1 : 0})`,
      }}>
        <TooltipText>{value}</TooltipText>
      </TooltipWrapper>

      <Slider.Handle value={value} style={{ ...style, transform: `translate(-50%, -50%) scale(${dragging ? 1.2 : 1})` }} {...props} />
    </HandleWrapper>
  )
}

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const TextButton = styled.button`
  border: none;
  outline: none;
  font-size: 1.8rem;
  padding: 0;
  background: none;
  font-family: ${p => p.theme.fonts.text};
  font-weight: 500;
`;

const Cancel = TextButton.extend`
  color: ${p => p.theme.danger};
`;

const Save = TextButton.extend`
  color: ${p => p.theme.action};
`;

const RateSlider = ({ style, onChange, value, onCancel, onSave, isRated, ...props }) => {
  return (
    <SliderWrapper style={style}>
      <Slider
        style={{ margin: '40px 0' }}
        min={0}
        max={10}
        onChange={onChange}
        value={value}
        handle={Handle}
        handleStyle={{
          height: 24,
          width: 24,
          borderColor: props.theme.visit,
          boxShadow: props.theme.boxShadow,
          transition: '0.2s',
          margin: 0
        }}
        trackStyle={{
          height: 10,
          background: props.theme.visit,
          transition: '0.2s',
        }}
        railStyle={{
          height: 10,
          borderRadius: 100,
          background: '#EEE'
        }}
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      />
      <Buttons>
        <Cancel onClick={onCancel}>Avbryt</Cancel>
        <Save onClick={onSave}>Spara</Save>
      </Buttons>
    </SliderWrapper>
  )
}

export default withTheme(RateSlider);