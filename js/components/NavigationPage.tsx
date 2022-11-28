import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface NavigationPageProps {
  bgcolor?: string;
  style?: ViewStyle;
  [key: string]: any;
}

export default function NavigationPage({ children, bgcolor, style }: NavigationPageProps) {
  return (
    <SafeAreaView style={[{ backgroundColor: bgcolor || "white" }, styles.page, style]}>
      <StatusBar backgroundColor={bgcolor || 'white'}/>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    overflow: 'hidden'
  },
});
