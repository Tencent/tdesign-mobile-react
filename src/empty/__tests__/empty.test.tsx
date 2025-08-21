import React from 'react';
import { describe, it, expect, render, screen } from '@test/utils';
import Empty from '../Empty';

describe('Empty Component', () => {
  it('renders without crashing', () => {
    render(<Empty />);
    expect(document.querySelector('.t-empty')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    const description = 'No data found';
    render(<Empty description={description} />);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('renders action when provided', () => {
    const action = <button>Reload</button>;
    render(<Empty action={action} />);
    expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument();
  });

  it('renders image when provided as string', () => {
    const image = 'path/to/image.png';
    render(<Empty image={image} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', image);
  });

  it('renders image when provided as ReactNode', () => {
    const image = <div>Image</div>;
    render(<Empty image={image} />);
    expect(screen.getByText('Image')).toBeInTheDocument();
  });

  it('renders icon when provided as ReactNode', () => {
    const icon = <div>Icon</div>;
    render(<Empty icon={icon} />);
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });
});
