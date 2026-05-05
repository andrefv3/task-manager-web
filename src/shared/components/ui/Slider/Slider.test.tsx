import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Slider } from './Slider';

describe('Slider Component', () => {
  it('You must render the label correctly', () => {
    render(<Slider label="Impact" value={5} onChange={() => {}} />);
    // We use a simple string to avoid issues with type overloads
    const labelElement = screen.getByText('Impact');
    expect(labelElement).toBeInTheDocument();
  });

  it('You must display the current value', () => {
    render(<Slider label="Impact" value={7} onChange={() => {}} />);
    const valueElement = screen.getByText('7');
    expect(valueElement).toBeInTheDocument();
  });

  it('You must call onChange when the value changes', () => {
    const handleChange = vi.fn();
    render(<Slider label="Impact" value={5} onChange={handleChange} />);
    
    // We look for the accessibility role of the range input
    const sliderInput = screen.getByRole('slider');
    
    // We simulate the change
    fireEvent.change(sliderInput, { target: { value: '8' } });
    
    expect(handleChange).toHaveBeenCalledWith(8);
  });
});