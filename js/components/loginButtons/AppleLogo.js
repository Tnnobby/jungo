import * as React from "react"
import Svg, { Path } from "react-native-svg"

const AppleLogo = ({fill, stroke, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width='100%'
    height='100%'
    viewBox='0 0 13.129 15.93'
    {...props}
  >
    <Path
      data-name="Apple Logo"
      d="M7.814 14.719a3.852 3.852 0 0 0-3.088.01A1.913 1.913 0 0 1 2.5 14.3 7.334 7.334 0 0 1 .023 8.318 3.522 3.522 0 0 1 1.48 5.675a3.465 3.465 0 0 1 3.3-.545 1.116 1.116 0 0 1 .149.049 2.674 2.674 0 0 0 2.339 0 3.834 3.834 0 0 1 4.142.791c.066.072.122.151.182.226-2.376 1.627-1.83 4.304.408 5.235a1.824 1.824 0 0 1-.158.427 26.177 26.177 0 0 1-1.608 2.324 1.85 1.85 0 0 1-1.458.747 2.556 2.556 0 0 1-.962-.21ZM5.338 4.726C4.808 2.678 7.043.009 9.3 0c.418 1.9-1.481 4.729-3.813 4.73q-.076 0-.149-.004Z"
      transform="translate(.5 .502)"
      style={{
        fill: fill || "#000",
        stroke: stroke || "transparent",
        strokeMiterlimit: 10,
      }}
    />
  </Svg>
)

export default AppleLogo
