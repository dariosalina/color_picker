import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import { Selector } from '../components/Selector'

describe('Selector', () => {
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
        satCoords: '',
        hueCoords: '',
        onSaturationChange: jest.fn(),
        onHueChange: jest.fn(),
    };

  it('renders a clickable shade selector component', () => {
    // Arrange
    const { container } = render(<Selector {...props}/>);
    const selector = container.getElementsByClassName('cp-saturation');

    // Act
    fireEvent.click(selector[0]);

    // Assert
    expect(props.onSaturationChange).toHaveBeenCalled();
  });

  it('renders a hue selector component', () => {
    // Arrange
    const { container } = render(<Selector {...props}/>);
    const selector = container.getElementsByClassName('cp-hue');

    // Act
    fireEvent.click(selector[0]);

    // Assert
    expect(props.onHueChange).toHaveBeenCalled();
  });
})