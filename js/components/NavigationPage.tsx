import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, ViewStyle, Pressable, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface NavigationPageProps {
  bgcolor?: string;
  style?: ViewStyle;
  [key: string]: any;
}

export default function NavigationPage({ children, bgcolor, style }: NavigationPageProps) {
  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  return (
    <Pressable style={[{ backgroundColor: bgcolor || "white" }, styles.page, style]} onPress={dismissKeyboard}>
      <StatusBar backgroundColor={bgcolor || 'white'}/>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    overflow: 'hidden'
  },
});
