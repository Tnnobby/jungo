import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  StyleSheet,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

export interface NavigationPageProps extends SafeAreaViewProps {
  statusBarColor?: string;
  keyboardSafe?: boolean;
}

export default function NavigationPage({
  children,
  statusBarColor,
  style,
  keyboardSafe = true,
  ...props
}: NavigationPageProps) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    // Keyboard.addListener('keyboardDidShow', (ev) => {
    // })
  }, []);

  return (
    <SafeAreaView
      style={[{ backgroundColor: "white" }, { flex: 1 }]}
      {...props}
    >
      <StatusBar backgroundColor={statusBarColor || "white"} />
      {keyboardSafe ? (
        <Pressable style={[{ flex: 1 }, style]} onPress={dismissKeyboard}>
          {children}
        </Pressable>
      ) : (
        children
      )}
    </SafeAreaView>
  );
}
