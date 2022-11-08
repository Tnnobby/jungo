import { StyleSheet, View } from "react-native";
import Button from "../components/Button";
import constants from "../constants";
import SVGIcon from "../svg/icons";

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 40
  },
  icon: {
    top: 1,
    height: 20,
    width: 20
  }
})

const STATE_STYLES = {
  inactive:{
    ...styles.button,
    borderColor: constants.primary_color,
    backgroundColor: constants.primary_color
  },
  active:{
    ...styles.button,
    borderColor: constants.primary_color,
    backgroundColor: 'white'
  }
}

export default function NotificationButton ({active, ...props}) {

  return (
    <Button
      style={active ? STATE_STYLES.active : STATE_STYLES.inactive}
      {...props}
    >
      <View style={styles.icon} >
        <SVGIcon icon='NotificationBell' fill={!active ? '#fff' : constants.primary_color}/>
      </View>
    </Button>
  )
}