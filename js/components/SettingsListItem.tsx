import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { shadows } from "../constants";

export interface SettingsListItemProps extends PressableProps {}

type StyleFunction = (
  state: PressableStateCallbackType
) => StyleProp<ViewStyle>;

export const SettingsListItem: React.FC<SettingsListItemProps> = ({
  children,
  style,
  ...props
}) => {
  const calculateStyle = (state: PressableStateCallbackType) => [
    styles.container,
    (style as StyleFunction)(state),
  ];

  return (
    <Pressable
      style={
        typeof style === "function" ? calculateStyle : [styles.container, style]
      }
      {...props}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    minHeight: 50,
    borderRadius: 8,
  },
});
