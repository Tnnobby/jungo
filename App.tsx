import { Dimensions, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import useFonts from "./js/hooks/useFonts";
import store from "./redux/store";
import "react-native-get-random-values";
import FirebaseWrapper from "./js/context-providers/FirebaseProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NavigationRouter from "./routes/RootRouter";

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
