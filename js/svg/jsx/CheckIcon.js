import * as React from "react"
import Svg, { Path } from "react-native-svg"

const CheckIcon = ({fill, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width='100%'
    height='100%'
    viewBox='0 0 21.476 15.66'
    {...props}
  >
    <Path
      data-name="Path 191"
      d="m2059.043 78.358 6 6.434 11.234-12.04"
      transform="translate(-2056.923 -70.631)"
      style={{
        fill: "none",
        stroke: fill || '#000',
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 3,
      }}
    />
  </Svg>
)

export default CheckIcon
