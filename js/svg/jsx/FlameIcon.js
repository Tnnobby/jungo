import * as React from "react"
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"

const FlameIcon = ({scale, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={scale ? 16.842 * scale : 16.842}
    height={scale ? 21.943 * scale : 21.943}
    viewBox='0 0 16.842 21.943'
    {...props}
  >
    <Defs>
      <ClipPath id="a">
        <Path
          style={{
            fill: "none",
          }}
          d="M0 0h16.842v21.943H0z"
        />
      </ClipPath>
    </Defs>
    <G
      data-name="Fire symbol"
      style={{
        clipPath: "url(#a)",
      }}
    >
      <G data-name="Group 274">
        <G data-name="Group 273">
          <Path
            data-name="Path 255"
            d="M177.064 178.181c.283.089.57.166.848.267a6.228 6.228 0 0 1 3.383 2.7 3.87 3.87 0 0 1 .5 1.84c.032.81.022 1.621.053 2.431a5.79 5.79 0 0 0 .134 1.038c.093.417.322.542.747.472.6-.1.878-.446.909-1.168.009-.211-.013-.423-.021-.634 0-.073-.015-.146-.012-.219a.382.382 0 0 1 .262-.389.355.355 0 0 1 .433.17c.24.366.481.732.7 1.112a15.271 15.271 0 0 1 1.937 5.764 12.069 12.069 0 0 1 .086 2.73 6.043 6.043 0 0 1-1.362 3.195 8.24 8.24 0 0 1-3.533 2.5.419.419 0 0 1-.53-.112.41.41 0 0 1 .112-.532 3.8 3.8 0 0 0 1.08-1.941 2.561 2.561 0 0 0-.714-2.493c-.4-.383-.82-.748-1.228-1.124a5.306 5.306 0 0 1-1.77-3.369c-.035.023-.064.033-.077.053a25.157 25.157 0 0 1-2.626 3.28 4.449 4.449 0 0 0-1.164 2.192 4.767 4.767 0 0 0 .379 2.839c.1.225.218.445.334.665a.437.437 0 0 1-.013.53.429.429 0 0 1-.522.093 8.155 8.155 0 0 1-4-2.9 6.04 6.04 0 0 1-1.167-3.535 9.428 9.428 0 0 1 1.246-4.987 17.865 17.865 0 0 1 2.186-2.843c.688-.765 1.381-1.529 2.019-2.335a5.009 5.009 0 0 0 1.108-2.695 6.017 6.017 0 0 0-.208-2.036.456.456 0 0 1 .183-.568Z"
            transform="translate(-170.222 -178.181)"
            style={{
              fill: "#ff9655",
            }}
          />
        </G>
      </G>
    </G>
  </Svg>
)

export default FlameIcon
