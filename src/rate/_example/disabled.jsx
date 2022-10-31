import React from 'react';
import { Rate } from 'tdesign-mobile-react';
import CustomCell from './custom-cell';

export default function Base() {
  return (
    <CustomCell title="仅展示">
      <Rate value={3} variant="filled" disabled />
    </CustomCell>
  );
}
