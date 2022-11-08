import * as React from "react"
import Svg, { Defs, G, Rect } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const Add = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20.837}
    height={35.022}
    {...props}
  >
    <Defs></Defs>
    <G
      data-name="Add to - Recipe Viewer"
      transform="translate(-323.356 -42.024)"
    >
      <G transform="translate(323.36 42.02)" filter="url(#a)">
        <Rect
          data-name="Rectangle 117"
          width={2.837}
          height={17.022}
          rx={1.419}
          transform="translate(9 6)"
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

export default Add
