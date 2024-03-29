import { StyleSheet } from "react-native";
import { shadows } from "../constants";
import AddCircleFilled from "../svg/jsx/AddCircleFilled";
import { AnimatedButton } from "./AnimatedButton";

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: 'white'
  },
  svg: {
    borderRadius: 100,
  },
});

export default function FloatingAddButton({ ...props }) {
  return (
    <AnimatedButton
      style={(state) => [
        styles.button,
        state.pressed ? shadows.elevation0 : shadows.elevation2,
      ]}
      {...props}
    >
      <AddCircleFilled style={styles.svg} />
    </AnimatedButton>
  );
}
