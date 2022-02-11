import React from 'react';
import Color from './color';
import Offset from './offset';
import Base from './Base';
import Shape from './shape';
import Text from './text';
import MaxCount from './max-count';

export default function Dist() {
  return (
    <>
      <Base />
      <MaxCount />
      <Text />
      <Shape />
      <Color />
      <Offset />
    </>
  );
}
