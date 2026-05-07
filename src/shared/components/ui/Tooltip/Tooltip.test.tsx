import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('renders the children correctly', () => {
    render(
      <Tooltip text="Helpful info">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: /hover me/i })).toBeInTheDocument();
  });

  it('does not show the tooltip initially', () => {
    render(
      <Tooltip text="Hidden text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows the tooltip after the specified delay', async () => {
    render(
      <Tooltip text="Delayed tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button');
    fireEvent.mouseEnter(trigger);

    // We advance time within act() so React processes the setTimeout
    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByText('Delayed tooltip')).toBeInTheDocument();
  });

  it('hides the tooltip immediately on mouse leave', () => {
    render(
      <Tooltip text="Visible tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button');
    
    // 1. Show it
    fireEvent.mouseEnter(trigger);
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    // 2. Exit with the mouse
    fireEvent.mouseLeave(trigger);
    
    // Since it's an immediate setState, it doesn't need advanceTimers
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('applies the correct floating styles', () => {
    render(
      <Tooltip text="Position test">
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByRole('button'));
    act(() => {
      vi.advanceTimersByTime(400);
    });

    const tooltip = screen.getByRole('tooltip');
    
    // We check the actual classes of your component
    expect(tooltip).toHaveClass('absolute');
    expect(tooltip).toHaveClass('bottom-full');
    expect(tooltip).toHaveClass('mb-3');
  });
});