import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import BackChevron from "../../svg/jsx/BackChevron";

const styles = StyleSheet.create({
  main: {
    width: "100%",
    flexDirection: "row",
    height: 46,
    backgroundColor: "white",
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  infoCont: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  iconCont: {
    height: "100%",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 18,
    fontFamily: "Rubik_600",
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: "Rubik_300",
  },
});

export interface InstructionItemProps extends PressableProps {
  step?: number;
  description?: string;
}

const InstructionItem = ({
  style,
  step,
  description,
  ...props
}: InstructionItemProps) => (
  <Pressable style={[styles.main, style as StyleProp<ViewStyle>]} {...props}>
    <View style={styles.infoCont}>
      <Text style={styles.titleText}>Step {step}</Text>
      <Text style={styles.descriptionText} numberOfLines={1}>
        {description}
      </Text>
    </View>
    <View style={styles.iconCont}>
      <BackChevron style={{ transform: [{ rotate: "180deg" }] }} />
    </View>
  </Pressable>
);

export default InstructionItem;
