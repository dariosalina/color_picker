import Image from 'next/image'

export const Inputs = ({
  parsedColor,
  handleRgbChange,
  handleClickCopy
 }) => {

   return (
    <div className="cp-input-container">
      <div className="cp-input-group">
        <div className="cp-input-unit">
          <label className="cp-input-label" htmlFor="cp-input-r">
            R:
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
        <div className="cp-input-unit">
          <label className="cp-input-label" htmlFor="cp-input-g">
              G:
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
        <div className="cp-input-unit">
          <label className="cp-input-label" htmlFor="cp-input-b">
              B:
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
          <button
            onClick={handleClickCopy}
            title="Copy RGB to clipboard"
          >
            <Image src="/clipboard.svg" alt="Clipboard Icon" width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  )
}