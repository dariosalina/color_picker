import {
  clamp,
  getHueCoordinates,
  getSaturationCoordinates,
  parseColor,
} from "../utils/utils";
import { Selector } from "./Selector";
import colorsys from 'colorsys'
import { Inputs } from './Inputs';

export const ColorPicker = ({ color, onChange }) => {
  const parsedColor = parseColor(color);
  const satCoords = getSaturationCoordinates(parsedColor);
  const hueCoords = getHueCoordinates(parsedColor);
  const {
    hsvToRgb,
    rgbToHex,
    hexToRgb,
  } = colorsys;

  const handleRgbChange = (component, value) => {
    const { r, g, b } = parsedColor.rgb;

    switch (component) {
      case "r":
        onChange(rgbToHex({ r: value ?? 0, g, b }));
        return;
      case "g":
        onChange(rgbToHex({ r, g: value ?? 0, b }));
        return;
      case "b":
        onChange(rgbToHex({ r, g, b: value ?? 0 }));
        return;
      default:
        return;
    };
  };

  const handleSaturationChange = (event) => {
    const { width, height, left, top } = event.target.getBoundingClientRect();
    const x = clamp(event.clientX - left, 0, width);
    const y = clamp(event.clientY - top, 0, height);

    const s = 100 - (y / height) * 100;
    const v = (x / width) * 100;

    const rgb = hsvToRgb({ h: parsedColor?.hsv.h, s, v });

    onChange(rgbToHex(rgb));
  };

  const handleHueChange = (event) => {
    const { width, left } = event.target.getBoundingClientRect();
    const x = clamp(event.clientX - left, 0, width);
    const h = Math.round((x / width) * 360);
    const hsv = { h, s: parsedColor?.hsv.s, v: parsedColor?.hsv.v };
    const rgb = hsvToRgb(hsv);
    onChange(rgbToHex(rgb));
  };

  const handleClickCopy = () => {
    const { r, g, b } = hexToRgb(color);
    const str = `rgb(${r}, ${g}, ${b})`;
    if (navigator && navigator.clipboard && navigator.clipboard.writeText){
      return navigator.clipboard.writeText(str);
    };
    // Fallback solution
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    return;
  };

  return (
    <>
      <div className="cp-container">
        <Selector
          parsedColor={parsedColor}
          satCoords={satCoords}
          hueCoords={hueCoords}
          onSaturationChange={handleSaturationChange}
          onHueChange={handleHueChange}
        />
        <Inputs
          parsedColor={parsedColor}
          handleRgbChange={handleRgbChange}
          handleClickCopy={handleClickCopy}
        />
      </div>
    </>
  )
}