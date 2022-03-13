export const FreeSelector = ({
  parsedColor,
  satCoords,
  hueCoords,
  onSaturationChange,
  onHueChange
}) => {

  return (
    <div className="cp-free-root">
      <div
        className="cp-saturation"
        style={{
          backgroundColor: `hsl(${parsedColor.hsv.h}, 100%, 50%)`
        }}
        onClick={onSaturationChange}
      >
        <div
          className="cp-saturation-indicator"
          style={{
            backgroundColor: parsedColor.rbg,
            left: (satCoords?.[0] ?? 0) + "%",
            top: (satCoords?.[1] ?? 0) + "%"
          }}
        />
      </div>
      <div className="cp-hue" onClick={onHueChange}>
        <div
          className="cp-hue-indicator"
          style={{
            backgroundColor: parsedColor.rbg,
            left: (hueCoords ?? 0) + "%"
          }}
        />
      </div>
    </div>
  )
}