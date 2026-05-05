import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
  it('You must render the content correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('You must call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('You must not call onClick if the button is disabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('You must display the loading state and disable the button', () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    // If you use an emoji or text for the spinner, look for it here
    expect(screen.getByText(/🌀/i)).toBeInTheDocument(); 
  });

  it('should render the left icon when provided', () => {
    render(<Button leftIcon={<span data-testid="btn-icon">🚀</span>}>Launch</Button>);
    
    // This covers the left icon logic branch
    expect(screen.getByTestId('btn-icon')).toBeInTheDocument();
    expect(screen.getByText(/launch/i)).toBeInTheDocument();
  });
});