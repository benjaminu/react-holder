import React from 'react';
import { storiesOf } from '@storybook/react';
import Holder from '../src/holder';

storiesOf('Holder', module)
  .add('Sample holder', () => (
    <Holder />
  ));
