import { Button } from '../../src';
import React from 'react';
// React 16, 17
import { mount } from 'cypress/react';

describe('button.cy.ts', () => {
  it('playground', () => {
    mount(<Button>button</Button>);
  });
});
