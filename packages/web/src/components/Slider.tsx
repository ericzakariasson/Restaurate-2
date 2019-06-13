import * as React from 'react';
import styled from 'styled-components';
import {
  Slider,
  Handles,
  Tracks,
  SliderItem,
  TrackItem,
  GetTrackProps,
  GetHandleProps
} from 'react-compound-slider';

const StyledSlider = styled(Slider)`
  position: relative;
`;

const Rail = styled.div`
  height: 58px;
  /* 9 * 2 + 6 = 24 = handle height */
  border-radius: 3px;
  background-color: #FFF;
  border: 1px solid #CCC;
  position: relative;
  box-shadow: ${p => p.theme.boxShadow};
`;

const HandleTrack = styled.div`
  /* Cancel out the handle width */
  width: calc(100% - 12px);
  height: 100%;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
`;

const Label = styled.span`
  position: relative;
  font-size: 1.25rem;
  z-index: 2;
  mix-blend-mode: difference;
  color: #FFF;
`;

const Value = styled(Label)`
  font-size: 1.35rem;
`

const Text = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;

  /* mix-blend-mode: difference; */
  color: #222;
  font-weight: 400;
`;

const defaultDomain = [1, 10];

interface InputSliderProps {
  value: number;
  onInput: (value: number) => void;
  label?: string;
  domain?: number[];
  onChange?: (values: readonly number[]) => void;
  onSlideStart?: (values: readonly number[]) => void;
  onSlideEnd?: (values: readonly number[]) => void;
}

export const InputSlider = ({
  value,
  onInput,
  label,
  domain = defaultDomain,
  onChange,
  onSlideStart,
  onSlideEnd,
}: InputSliderProps) => {
  const handleUpdate = (values: readonly number[]) => onInput(values[0]);

  return (
    <StyledSlider
      step={1}
      values={[value]}
      domain={domain}
      onUpdate={handleUpdate}
      onChange={onChange}
      onSlideStart={onSlideStart}
      onSlideEnd={onSlideEnd}
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
              />
            ))}
          </HandleTrack>
        )}
      </Handles>
      <Text>
        <Label>{label}</Label>
        <Value>{value}</Value>
      </Text>
      <Tracks right={false}>
        {({ tracks, getTrackProps }) => (
          <>
            {tracks.map(track => (
              <Track
                key={track.id}
                track={track}
                getTrackProps={getTrackProps}
              />
            ))}
          </>
        )}
      </Tracks>
      <Rail />
    </StyledSlider>
  );
};

interface StyledHandleProps {
  active: boolean;
}

const StyledHandle = styled.div<StyledHandleProps>`
  position: absolute;
  top: 0;
  z-index: 2;
  cursor: pointer;
  transform: translateX(-24px);
  padding: 29px 30px;
  user-select: none;

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 48px;
    border-radius: 2px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${p => p.theme.colors.primary.hex};
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3px;
    background: #fff;
    border: 1px solid #222;
    width: 12px;
    height: 58px;
    z-index: -1;
  }
`;

interface HandleProps {
  handle: SliderItem;
  getHandleProps: GetHandleProps;
  active: boolean;
}

const Handle = ({
  handle: { id, value, percent },
  getHandleProps,
  active,
}: HandleProps) => {
  return (
    <StyledHandle
      style={{
        left: `${percent}%`
      }}
      active={active}
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
  border-radius: 3px;
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
        width: `${target.percent - source.percent}%`
      }}
      {...getTrackProps()}
    />
  );
};
