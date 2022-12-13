import { Text } from "react-native"
import Button from "../components/Button"
import { colors } from "../constants"

const STYLES = {
  width: 106
}

const STATE_STYLES = {
  inactive:{
    width: 106,
    borderColor: colors.primary_color,
    backgroundColor: colors.primary_color
  },
  active:{
    width: 106,
    borderColor: colors.primary_color,
    backgroundColor: 'white'
  }
}

export default function FollowButton (props) {

  

  return (
    <Button 
    style={props.active ? STATE_STYLES.active : STATE_STYLES.inactive}
    {...props}
    >
      <Text
      style={{
        fontSize: 18,
        lineHeight: 24,
        fontFamily: 'Rubik_600',
        color: 'white',
        color: props.active ? colors.primary_color : 'white' 
      }}
      >
        {props.active ? 'Following' : 'Follow'}
      </Text>
    </Button>
  )
}