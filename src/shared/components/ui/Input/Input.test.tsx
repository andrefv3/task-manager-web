import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Input } from './Input';

describe('Input Component', () => {
  it('You must render the label if provided', () => {
    render(<Input label="Email" placeholder="test@test.com" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('You must update the value when typing', () => {
    render(<Input placeholder="Name" />);
    const input = screen.getByPlaceholderText(/name/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Name' } });
    expect(input.value).toBe('Name');
  });

  it('You must display the error message', () => {
    render(<Input error="Required field" />);
    expect(screen.getByText(/required field/i)).toBeInTheDocument();
    // Verify that it has error class (e.g. border-red-500)
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
  });

  it('should render the icon when provided', () => {
    render(<Input placeholder="Search" icon={<span data-testid="search-icon">🔍</span>} />);
    
    // This covers the conditional rendering of the icon
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    
    // This ensures that the class logic (pl-10 vs pl-3) is also tested
    expect(screen.getByPlaceholderText(/search/i)).toHaveClass('pl-10');
  });

  it('should use the provided id instead of the auto-generated one', () => {
    // This covers the ID initialization logic
    render(<Input label="Username" id="custom-id" />);
    const input = screen.getByLabelText(/username/i);
    expect(input).toHaveAttribute('id', 'custom-id');
  });
});