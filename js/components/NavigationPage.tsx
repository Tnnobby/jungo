import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Pressable,
  Keyboard,
} from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

interface NavigationPageProps extends SafeAreaViewProps {
  statusBarColor?: string;
}

export default function NavigationPage({
  children,
  statusBarColor,
  style,
  ...props
}: NavigationPageProps) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={[{backgroundColor: 'white'}, style, { flex: 1 }]} {...props}>
      <StatusBar backgroundColor={statusBarColor || "white"} />
      <Pressable
        style={{ flex: 1 }}
        onPress={dismissKeyboard}
        onLayout={(ev) =>
          console.log("NavigationPage>Pressable:", ev.nativeEvent.layout)
        }
      >
        {children}
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    overflow: "hidden",
  },
});
