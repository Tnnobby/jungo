import * as React from "react"
import Svg, { Defs, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

const CloseX = ({fill = '#000',  ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 20.425 20.332"
    stroke={fill}
    strokeLinecap="round"
    strokeWidth={3}
    {...props}
  >
    <G id="Group_264" data-name="Group 264" transform="translate(3.849 3.839)">
      <Path
        id="Path_32"
        data-name="Path 32"
        className="cls-1"
        d="m1151.71-1201.677-16.089 16.089"
        transform="translate(-1137.256 1199.959)"
      />
      <Path
        id="Path_33"
        data-name="Path 33"
        className="cls-1"
        d="m1135.621-1201.677 16.089 16.089"
        transform="translate(-1137.349 1199.959)"
      />
    </G>
  </Svg>
)

export default CloseX
