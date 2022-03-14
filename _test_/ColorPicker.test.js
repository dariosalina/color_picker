
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ColorPicker } from '../components/ColorPicker'

describe('Color Picker', () => {
  const props = {
        color: '#000000',
        onChange: jest.fn(),
    };

  it('renders a selector component', () => {
    const { container } = render(<ColorPicker {...props}/>);

    const selector = container.getElementsByClassName('cp-free-root');

    expect(selector).toBeTruthy();
  });

  it('renders a input component', () => {
    render(<ColorPicker {...props}/>);

    const inputs = screen.getAllByRole('textbox');

    expect(inputs).toBeTruthy();
  });
})