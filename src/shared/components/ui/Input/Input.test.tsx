import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Input } from './Input';

describe('Input Component', () => {
  it('must render the label and link it to the input via id', () => {
    render(<Input label="Email" placeholder="test@test.com" />);
    // We use string instead of regex if the i-flag causes issues in your config
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  it('must update the value when typing', () => {
    render(<Input placeholder="Name" />);
    const input = screen.getByPlaceholderText(/Name/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'John Doe' } });
    expect(input.value).toBe('John Doe');
  });

  it('must display the error message and apply error styles', () => {
    render(<Input label="Field" error="Required field" />);
    expect(screen.getByText(/Required field/i)).toBeInTheDocument();
    
    // If toHaveClass still fails in your IDE, use this vanilla Vitest approach:
    const input = screen.getByLabelText(/Field/i);
    expect(input.className).toContain('border-red-500');
  });

  it('should toggle password visibility when clicking the eye icon', () => {
    render(<Input label="Password" iconType="password" />);
    const input = screen.getByLabelText(/Password/i) as HTMLInputElement;
    
    expect(input.type).toBe('password');
    
    // We look for the button that contains the eye SVG
    const toggleBtn = screen.getByRole('button');
    fireEvent.click(toggleBtn);
    
    expect(input.type).toBe('text');
    
    fireEvent.click(toggleBtn);
    expect(input.type).toBe('password');
  });

  it('should render as a textarea when isTextArea is true', () => {
    render(<Input label="Description" isTextArea />);
    const input = screen.getByLabelText(/Description/i);
    
    expect(input.tagName).toBe('TEXTAREA');
    expect(input.className).toContain('min-h-[120px]');
  });

  it('should apply specific padding when iconType is search', () => {
    render(<Input placeholder="Search tasks" iconType="search" />);
    // Avoiding the slash /tasks/ error by using a partial string
    const input = screen.getByPlaceholderText(/Search/i);
    expect(input.className).toContain('pl-11');
  });

  it('should use a custom id if provided', () => {
    render(<Input label="Custom" id="my-unique-id" />);
    const input = screen.getByLabelText(/Custom/i);
    expect(input.id).toBe('my-unique-id');
  });
});