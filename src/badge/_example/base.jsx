import React from 'react';
import Color from './color';
import Offset from './offset';
import Dist from './dist';
import Shape from './shape';
import Text from './text';
import MaxCount from './max-count';

export default function Base() {
  return (
    <>
      <Dist />
      <MaxCount />
      <Text />
      <Shape />
      <Color />
      <Offset />
    </>
  );
}
