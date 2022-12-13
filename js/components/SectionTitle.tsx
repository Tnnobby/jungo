import { Text } from "react-native";
import { colors } from "../constants";

const styles = {
  fontSize: 26,
  fontFamily: "Rubik_700",
  marginBottom: 10,
  color: colors.primary_color
};

type SectionTitleProps = {
  children?: string
}

export const SectionTitle: React.FC<SectionTitleProps> = ({children}) => <Text style={styles}>{children}</Text>;
