import { Pressable, PressableProps, StyleSheet, View } from "react-native";
import SettingsIcon from "../../svg/jsx/SettingsIcon";

interface SettingsButtonProps extends PressableProps {}

export const SettingsButton: React.FC<SettingsButtonProps> = ({ ...props }) => (
  <Pressable style={styles.pressable} {...props}>
    <View style={{ height: 20, width: 20}}>
      <SettingsIcon fill="black" />
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  pressable: {
    height: 35,
    width: 35,
    borderRadius: 100,
    backgroundColor: "#EAEAEA",
    justifyContent: 'center',
    alignItems: 'center'
  },
  svg: {},
});
