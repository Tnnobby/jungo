import { Dimensions, StatusBar, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import useFonts from "./js/hooks/useFonts";
import store from "./redux/store";
import * as Device from "expo-device";
import "react-native-get-random-values";
import FirebaseWrapper from "./js/context-providers/FirebaseProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NavigationRouter from "./routes/RootRouter";
import { SafeAreaProvider } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    position: "relative",
    overflow: "hidden",
    height: Dimensions.get("window").height,
  },
});

export default function App() {
  const fontsLoaded = useFonts();

  return (
    <Provider store={store}>
      {fontsLoaded && (
        <GestureHandlerRootView style={{flex: 1}} onLayout={(ev) => console.log('GestureHandlerRootView:', ev.nativeEvent.layout)}>
          <FirebaseWrapper>
            <NavigationRouter />
          </FirebaseWrapper>
        </GestureHandlerRootView>
      )}
    </Provider>
  );
}
