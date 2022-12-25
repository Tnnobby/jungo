import useFonts from "./js/hooks/useFonts";
import "react-native-get-random-values";
import NavigationRouter from "./routes/RootRouter";
import * as Device from "expo-device";
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
