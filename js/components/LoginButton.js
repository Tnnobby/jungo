import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants";
import ContinueArrow from "../svg/jsx/ContinueArrow";
import StatefulPressable from "./StatefulPressable";

const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: colors.button_color,
    borderRadius: 100,
    padding: 10,
    height: 42,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  submitTxt: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Rubik_600'
  },
  arrowCont: {
    height: 18,
    width: 18,
    marginLeft: 6
  }
})

export default LoginButton = (props) => (
  <StatefulPressable style={styles.submitBtn} {...props}>
    <Text style={styles.submitTxt}>Continue</Text>
    <View style={styles.arrowCont}>
      <ContinueArrow />
    </View>
  </StatefulPressable>
);
