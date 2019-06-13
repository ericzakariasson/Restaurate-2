import * as React from 'react';

import { storiesOf } from '@storybook/react';

import { InputSlider } from '../components/Slider';

storiesOf('Slider', module)
  .add('default', () => <InputSlider value={0} onInput={value => {}} />)
  .add('with label', () => (
    <InputSlider value={0} onInput={value => {}} label="Service" />
  ));
