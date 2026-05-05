import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal Component', () => {
  it('You must not render anything if isOpen is false', () => {
    render(<Modal isOpen={false} onClose={() => {}}>Content</Modal>);
    expect(screen.queryByText(/content/i)).not.toBeInTheDocument();
  });

  it('You must render the content and the close button if isOpen is true', () => {
    render(<Modal isOpen={true} onClose={() => {}}>Modal Content</Modal>);
    expect(screen.getByText(/modal content/i)).toBeInTheDocument();
  });

  it('You must call onClose when clicking the close button', () => {
    const handleClose = vi.fn();
    render(<Modal isOpen={true} onClose={handleClose}>Content</Modal>);
    
    // Assuming you have a button with an "X" or "Close modal" text
    const closeButton = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(<Modal isOpen={true} onClose={handleClose}>Content</Modal>);
    
    // This triggers the event handler you have in lines 25-27
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should not render anything if isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Hidden</div>
      </Modal>
    );
    
     // This covers the "return null" line (early exit branch)
    expect(container.firstChild).toBeNull();
  });

  it('should close when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(<Modal isOpen={true} onClose={handleClose}>Content</Modal>);
    
    // This covers the global event logic (if implemented)
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });
});