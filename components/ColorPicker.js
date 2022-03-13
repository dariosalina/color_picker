import React from "react";
import {
  clamp,
  getHueCoordinates,
  getSaturationCoordinates,
  parseColor,
} from "../utils/utils";
import { FreeSelector } from "./FreeSelector";
import colorsys from 'colorsys'

export const ColorPicker = ({ color, onChange }) => {
  const parsedColor = parseColor(color);
  const satCoords = getSaturationCoordinates(parsedColor);
  const hueCoords = getHueCoordinates(parsedColor);
  const {
      hsvToRgb,
      rgbToHex,
      hexToRgb,
  } = colorsys

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
      }
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
    return ;
  }

  return (
    <div className="cp-container">
        <FreeSelector
          parsedColor={parsedColor}
          satCoords={satCoords}
          hueCoords={hueCoords}
          onSaturationChange={handleSaturationChange}
          onHueChange={handleHueChange}
        />
        <div className="cp-input-container">
          <div className="cp-input-group">
            <div>
              <label className="cp-input-label" htmlFor="cp-input-r">
                R
              </label>
              <input
                id="cp-input-r"
                className="cp-rgb-input"
                placeholder="R"
                value={parsedColor.rgb.r}
                onChange={(event) => handleRgbChange("r", event.target.value)}
                inputMode="numeric"
                maxLength="3"
              />
            </div>
            <div>
              <label className="cp-input-label" htmlFor="cp-input-g">
                  G
              </label>
              <input
                id="cp-input-g"
                className="cp-rgb-input"
                placeholder="G"
                value={parsedColor.rgb.g}
                onChange={(event) => handleRgbChange("g", event.target.value)}
                inputMode="numeric"
                maxLength="3"
              />
            </div>
            <div>
              <label className="cp-input-label" htmlFor="cp-input-b">
                  B
              </label>
              <input
                id="cp-input-b"
                className="cp-rgb-input"
                placeholder="B"
                value={parsedColor.rgb.b}
                onChange={(event) => handleRgbChange("b", event.target.value)}
                inputMode="numeric"
                maxLength="3"
              />
            </div>
          </div>
          <div className="cp-input-button">
            <div className="cp-input-button-container">
              <button onClick={handleClickCopy}>Copy RGB to clipboard</button>
            </div>
          </div>
        </div>
      </div>
    )
}