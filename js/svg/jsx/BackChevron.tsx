import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const BackChevron: React.FC<SvgProps> = (props) => (
  <Svg
    width={12.521}
    height={22.042}
    {...props}
  >
    <Path
      data-name="Path 188"
      d="m10.4 2.122-8.9 8.9 8.9 8.9"
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
    />
  </Svg>
)

export default BackChevron
