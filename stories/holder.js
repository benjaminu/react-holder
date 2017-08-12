import React from 'react';
import { storiesOf } from '@storybook/react';
import Holder from '../src/holder';

storiesOf('Holder', module)
  .add('Default holder', () => (
    <Holder />
  ))
  .add('Fixed width Holder', () => (
    <Holder width="300px" height="300px" />
  ))
  .add('Variable width Holder', () => (
    <Holder width="100%" height="300" />
  ));
