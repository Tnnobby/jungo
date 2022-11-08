import * as React from "react";
import Svg, { Path } from "react-native-svg";

const FacebookLogo = ({ fill, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width='100%'
    height='100%'
    viewBox="0 0 8 15.43"
    {...props}
  >
    <Path
      d="M517.788 71.372h2.636v2.908h-.3c-.643 0-1.287 0-1.932.01-.281 0-.42.1-.43.343-.02.514-.006 1.029-.006 1.569h2.655a.538.538 0 0 1 .008.073c-.094.89-.19 1.78-.28 2.671-.015.149-.1.162-.216.162h-2.511v7.7h-2.992v-7.692h-2v-2.921h2v-1.418a3.167 3.167 0 0 1 2.329-3.172c.343-.105.694-.157 1.039-.233Z"
      transform="translate(-512.424 -71.372)"
      style={{
        fill: fill || "#fff",
      }}
    />
  </Svg>
);

export default FacebookLogo;
