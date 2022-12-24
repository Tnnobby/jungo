import { RefreshControlProps, View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

interface RefreshControllerProps extends RefreshControlProps {}

export const RefreshController = ({
  refreshing,
  progressViewOffset,
  onRefresh,
}: RefreshControllerProps) => {
  return <Animated.View style={[styles.container, {transform: [{translateY: progressViewOffset * 20}]}]}></Animated.View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
