import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Slider } from './Slider';

describe('Slider Component', () => {
  it('debe renderizar el label correctamente', () => {
    render(<Slider label="Impact" value={5} onChange={() => {}} />);
    // Usamos una string simple para evitar problemas con Overloads de tipos
    const labelElement = screen.getByText('Impact');
    expect(labelElement).toBeInTheDocument();
  });

  it('debe mostrar el valor actual', () => {
    render(<Slider label="Impact" value={7} onChange={() => {}} />);
    const valueElement = screen.getByText('7');
    expect(valueElement).toBeInTheDocument();
  });

  it('debe llamar a onChange cuando el valor cambia', () => {
    const handleChange = vi.fn();
    render(<Slider label="Impact" value={5} onChange={handleChange} />);
    
    // Buscamos por el rol de accesibilidad del input range
    const sliderInput = screen.getByRole('slider');
    
    // Simulamos el cambio
    fireEvent.change(sliderInput, { target: { value: '8' } });
    
    expect(handleChange).toHaveBeenCalledWith(8);
  });
});