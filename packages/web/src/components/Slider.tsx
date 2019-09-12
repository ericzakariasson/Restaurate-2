import * as React from 'react';
import styled, { css } from 'styled-components';
import {
  Slider,
  Handles,
  Tracks,
  SliderItem,
  TrackItem,
  GetTrackProps,
  GetHandleProps
} from 'react-compound-slider';

const HANDLE_WIDTH = 12;

interface StyledSliderProps {
  small: boolean;
}

const StyledSlider = styled(Slider)<StyledSliderProps>`
  position: relative;
  height: ${p => (p.small ? 32 : 46)}px;
`;

const Rail = styled.div`
  height: 100%;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  position: relative;
  box-shadow: ${p => p.theme.boxShadow};
`;

const HandleTrack = styled.div`
  /* Cancel out the handle width */
  width: calc(100% - ${HANDLE_WIDTH}px);
  height: 100%;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
`;

const StyledTracks = styled.div`
  width: calc(100% - ${HANDLE_WIDTH}px);
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const StepLines = styled.div`
  width: calc(100% - ${HANDLE_WIDTH * 4}px);
  height: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StepLine = styled.span`
  width: 1px;
  height: 18px;
  background: #aaa;
  opacity: 0.2;
`;

const defaultDomain = [1, 10];

interface InputSliderProps {
  value: number;
  onInput?: (value: number) => void;
  domain?: number[];
  onChange: (value: number) => void;
  onSlideStart?: (values: readonly number[]) => void;
  onSlideEnd?: (values: readonly number[]) => void;
  small?: boolean;
  controlled?: boolean;
}

export const InputSlider = ({
  value,
  onInput,
  domain = defaultDomain,
  onChange,
  onSlideStart,
  onSlideEnd,
  controlled,
  small = false
}: InputSliderProps) => {
  const [touched, setTouched] = React.useState(false);
  const [touching, setTouching] = React.useState(false);
  const handleUpdate = (values: readonly number[]) =>
    !controlled && onInput && onInput(values[0]);

  const handleChange = (values: readonly number[]) =>
    !controlled && onChange(values[0]);

  const handleSlideStart = (values: readonly number[]) => {
    onSlideStart && onSlideStart(values);
    setTouched(true);
    setTouching(true);
  };

  const handleSlideEnd = (values: readonly number[]) => {
    onSlideEnd && onSlideEnd(values);
    setTouching(false);
  };

  const handleStepClick = (value: number) => {
    if (!controlled) {
      onChange(value);
      setTouched(true);
    }
  };

  const [min, max] = domain;
  const stepLines = max - min - 1;

  const stepPercent = 100 / stepLines;

  return (
    <StyledSlider
      step={1}
      values={[controlled ? value * 2 : value]}
      domain={controlled ? [1, 20] : domain}
      onUpdate={handleUpdate}
      onChange={handleChange}
      onSlideStart={handleSlideStart}
      onSlideEnd={handleSlideEnd}
      small={small}
      disabled={controlled}
    >
      <Handles>
        {({ handles, getHandleProps, activeHandleID }) => (
          <HandleTrack>
            {handles.map(handle => (
              <Handle
                key={handle.id}
                active={handle.id === activeHandleID}
                handle={handle}
                getHandleProps={getHandleProps}
                touched={touched}
                touching={touching}
                controlled={controlled}
              />
            ))}
            <StepLines
              style={{
                left: `${stepPercent}%`,
                width: `calc(100% - ${HANDLE_WIDTH * 2}px - ${stepPercent}%)`
              }}
            >
              {Array.from({ length: stepLines }, (_, i) => (
                <StepLine key={i} onClick={() => handleStepClick(i + 2)} />
              ))}
            </StepLines>
          </HandleTrack>
        )}
      </Handles>
      <Tracks right={false}>
        {({ tracks, getTrackProps }) => (
          <StyledTracks>
            {tracks.map(track => (
              <Track
                key={track.id}
                track={track}
                getTrackProps={getTrackProps}
              />
            ))}
          </StyledTracks>
        )}
      </Tracks>
      <Rail />
    </StyledSlider>
  );
};

interface StyledHandleProps {
  active: boolean;
  touched: boolean;
  touching: boolean;
  controlled?: boolean;
}

const StyledHandle = styled.div<StyledHandleProps>`
  position: absolute;
  top: 0;
  height: 100%;
  width: ${HANDLE_WIDTH}px;
  cursor: pointer;
  padding: 0 20px;
  z-index: 2;
  transform: translateX(-${HANDLE_WIDTH + 2}px);
  

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: calc(100% - 10px);
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${p => p.theme.colors.primary.default};
    transition: all ${p => p.theme.transition};
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    border-radius: 8px;
    border: 1px solid #222;
    width: ${HANDLE_WIDTH}px;
    height: 100%;
    transition: width ${p => p.theme.transition};
    background: #fff;
    box-sizing: border-box;
    transform: translateX(-50%);
  }

  ${p =>
    !p.touched &&
    css`
      &::before {
        width: 4px;
      }

      &::after {
        width: 16px;
      }
      width: 16px;
    `}

  ${p =>
    p.touching &&
    css`
      &::before {
        width: 6px;
        height: calc(100% - 6px);
      }
    `}
  
  ${p =>
    p.controlled &&
    css`
      &::before {
        width: 2px;
        height: calc(100% - 6px);
        transform: translate(-2px, -50%);
      }

      &::after {
        width: 8px;
        background: #222;
      }
    `}
`;

interface HandleProps {
  handle: SliderItem;
  getHandleProps: GetHandleProps;
  active: boolean;
  touched: boolean;
  touching: boolean;
  controlled?: boolean;
}

const Handle = ({
  handle: { id, value, percent },
  getHandleProps,
  active,
  touched,
  touching,
  controlled
}: HandleProps) => {
  return (
    <StyledHandle
      style={{
        left: `${percent}%`
      }}
      active={active}
      touched={touched}
      touching={touching}
      controlled={controlled}
      {...getHandleProps(id)}
    />
  );
};

const StyledTrack = styled.div`
  position: absolute;
  background: #222;
  margin: 0;
  top: 0;
  height: 100%;
  z-index: 1;
  box-shadow: none;
  border-radius: 10px 8px 8px 10px;
`;

interface TrackProps {
  track: TrackItem;
  getTrackProps: GetTrackProps;
}

const Track = ({ track: { source, target }, getTrackProps }: TrackProps) => {
  return (
    <StyledTrack
      style={{
        left: `${source.percent}%`,
        width: `calc(${target.percent - source.percent}% + ${HANDLE_WIDTH -
          2}px)`
      }}
      {...getTrackProps()}
    />
  );
};
