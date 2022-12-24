import { Text, TextProps } from "react-native";
import { colors } from "../constants";

const styles = {
  fontSize: 26,
  fontFamily: "Rubik_700",
  marginVertical: 6,
  color: colors.primary_color,
};

type SectionTitleProps = TextProps;

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  style,
  ...props
}) => (
  <Text style={[styles, style]} {...props}>
    {children}
  </Text>
);
