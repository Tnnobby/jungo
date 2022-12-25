import { StyleSheet, Pressable } from "react-native";

export default function CircleButton({ icon, style = {}, ...props }) {
  return (
    <Pressable style={{ ...styles.main, ...style }} {...props}>
      {icon && icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#EAEAEA",
    borderRadius: 100,
    height: 38,
    width: 38,
    justifyContent: "center",
    alignItems: "center",
  },
});
