import { Dimensions, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import useFonts from "./js/hooks/useFonts";
import store from "./redux/store";
import "react-native-get-random-values";
import FirebaseWrapper from "./js/context-providers/FirebaseProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NavigationRouter from "./routes/RootRouter";
import * as Device from "expo-device";
import { ErrorHandler } from "./js/components/error-handler";
import LoadingHandler from "./js/components/Loading/LoadingHandler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { JungoWrappers } from "./JungoWrapper";

export const isTablet = Device.osName === "iPadOS";

export default function App() {
  const fontsLoaded = useFonts();

  return (
    <>
      {fontsLoaded && (
        <JungoWrappers>
          <NavigationRouter />
        </JungoWrappers>
      )}
    </>
  );
}
