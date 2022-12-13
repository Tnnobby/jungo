import { StyleSheet, View } from "react-native";
import Button from "../components/Button";
import { colors } from "../constants";
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
    borderColor: colors.primary_color,
    backgroundColor: colors.primary_color
  },
  active:{
    ...styles.button,
    borderColor: colors.primary_color,
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
        <SVGIcon icon='NotificationBell' fill={!active ? '#fff' : colors.primary_color}/>
      </View>
    </Button>
  )
}