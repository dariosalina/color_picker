import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Inputs } from '../components/Inputs'

describe('Inputs', () => {
    const props = {
        parsedColor: {
            rgb: {
                r: '00',
                g: '00',
                b: '00',
            },
            hex: '#000000',
            hsv: {
                h: '0',
                s: '0',
                v: '0',
            }
        },
        handleRgbChange: jest.fn(),
        handleClickCopy: jest.fn(),
    };

  it('renders a set of input fields', () => {
    // Arrange
    render(<Inputs {...props}/>);
    const inputs = screen.getAllByRole('textbox');

    // Act
    fireEvent.change(inputs[0], {
      target: { value: "255" }
    });

    // Assert
    expect(props.handleRgbChange).toHaveBeenCalledWith("r", "255");
  });

  it('renders a clickable copy button', () => {
    // Arrange
    render(<Inputs {...props}/>);
    const button = screen.getByRole('button');

    // Act
    fireEvent.click(button)

    // Assert
    expect(props.handleClickCopy).toHaveBeenCalled();
  });
})