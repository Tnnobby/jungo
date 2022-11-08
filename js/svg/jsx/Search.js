import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

const SearchIcon = (props) => (
  <Svg
    data-name="Group 682"
    xmlns="http://www.w3.org/2000/svg"
    width='100%'
    height='100%'
    viewBox='0 0 18.088 20.702'
    {...props}
  >
    <G
      data-name="Ellipse 42"
      style={{
        stroke: "#000",
        strokeWidth: "2.5px",
        fill: "none",
      }}
    >
      <Circle
        cx={7.842}
        cy={7.842}
        r={7.842}
        style={{
          stroke: "none",
        }}
        stroke="none"
      />
      <Circle
        cx={7.842}
        cy={7.842}
        r={6.592}
        style={{
          fill: "none",
        }}
      />
    </G>
    <Path
      data-name="Line 20"
      transform="translate(12.417 13.724)"
      style={{
        strokeLinecap: "round",
        stroke: "#000",
        strokeWidth: "2.5px",
        fill: "none",
      }}
      d="m0 0 3.921 5.228"
    />
  </Svg>
)

export default SearchIcon
