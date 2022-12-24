import { StyleSheet, Text, TextProps } from "react-native";

export interface SettingsLabelProps extends TextProps {}

export const SettingsLabel: React.FC<SettingsLabelProps> = ({
  children,
  ...props
}) => <Text style={styles.title} selectable={false}>{children}</Text>;

const styles = StyleSheet.create({
  title: {
    fontFamily: "Rubik_600",
    fontSize: 22,
    paddingVertical: 10,
    color: "black",
  },
});
