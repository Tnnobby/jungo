import { Dimensions, LogBox, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import useFonts from "./js/hooks/useFonts";
import store from "./redux/store";
import Router from "./Router";
import * as Device from "expo-device";
import "react-native-get-random-values";
import FirebaseWrapper from "./js/context-providers/FirebaseProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NavigationRouter from "./NavigationRouter";
// import { decode, encode } from "base-64";

// if (!global.btoa) {
//   global.btoa = encode;
// }

// if (!global.atob) {
//   global.atob = decode;
// }

const Constants = {
  STATUS_BAR: Device.osName === "iOS" ? 44 : 24,
};

const styles = StyleSheet.create({
  container: {
    top: Constants.STATUS_BAR,
    backgroundColor: "#fff",
    position: "relative",
    overflow: "hidden",
    height: Dimensions.get("window").height - Constants.STATUS_BAR,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'red'
  },
});

export default function App() {
  const fontsLoaded = useFonts();

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        {fontsLoaded && (
          <FirebaseWrapper>
            <View
              style={{
                ...styles.container,
                height:
                  Device.osName === "iOS"
                    ? Dimensions.get("window").height - 66
                    : Dimensions.get("window").height,
                width: Dimensions.get("window").width,
              }}
            >
              <NavigationRouter />
            </View>
          </FirebaseWrapper>
        )}
      </Provider>
    </GestureHandlerRootView>
  );
}
