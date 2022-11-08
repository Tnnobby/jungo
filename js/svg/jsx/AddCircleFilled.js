import * as React from "react"
import Svg, { Defs, G, Circle, Rect } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const AddCircleFilled = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 30.99 30.99"
    {...props}
  >
    <G transform="translate(-.002 -.002)">
      <Circle
        data-name="Ellipse 89"
        cx={15.498}
        cy={15.498}
        r={15.498}
        fill="#498cf7"
      />
    </G>
    <G
      data-name="Add to - Recipe Viewer"
      transform="translate(-318.178 -41.178)"
    >
      <G transform="translate(309.18 35.18)" filter="url(#b)">
        <Rect
          data-name="Rectangle 117"
          width={2.837}
          height={17.022}
          rx={1.419}
          transform="translate(23.18 12.85)"
          fill="#fdfdfd"
        />
      </G>
      <Rect
        data-name="Rectangle 118"
        width={2.837}
        height={17.022}
        rx={1.419}
        transform="rotate(-90 191.536 -133.488)"
        fill="#fdfdfd"
      />
    </G>
  </Svg>
)

export default AddCircleFilled
