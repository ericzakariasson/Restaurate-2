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
  width: 100%;
  height: 8px;
  margin: 12px 0;
  /* 9 * 2 + 6 = 24 = handle height */
  border-radius: 5px;
  background-color: #eee;
  position: relative;
`;

const HandleTrack = styled.div`
  /* Cancel out the handle width */
  width: calc(100% - 32px);
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 2;
`;

const defaultDomain = [1, 10];

interface InputSliderProps {
  domain?: number[];
  value: number;
  setValue: (values: number) => void;
}

export const InputSlider = ({
  value,
  setValue,
  domain = defaultDomain
}: InputSliderProps) => {
  const handleChange = (values: readonly number[]) => setValue(values[0]);

  return (
    <StyledSlider
      step={1}
      values={[value]}
      domain={domain}
      onUpdate={handleChange}
    >
      <Rail />
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
    </StyledSlider>
  );
};

interface StyledHandleProps {
  active: boolean;
}

const StyledHandle = styled.div<StyledHandleProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid ${p => (p.active ? '#AAA' : '#EEE')};
  position: absolute;
  top: 0;
  transform: translateY(-50%) scale(${p => (p.active ? 1 : 1.2)});
  transition: ${p => p.theme.transition} border,
    ${p => p.theme.transition} transform;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    background: ${p => p.theme.colors.primary.hex};
    transform: translate(-50%, -50%);
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
  active
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

const StyledTrack = styled(Rail)`
  position: absolute;
  background: ${p => p.theme.colors.primary.gradient};
  margin: 0;
  top: 0;
  z-index: 1;
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
