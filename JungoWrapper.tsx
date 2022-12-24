import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { ErrorHandler } from "./js/components/error-handler";
import LoadingHandler from "./js/components/Loading/LoadingHandler";
import { CameraProvider } from "./js/context-providers/CameraProvider";
import FirebaseWrapper from "./js/context-providers/FirebaseProvider";
import store from "./redux/store";

const JungoWrappers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ErrorHandler>
          <LoadingHandler>
            <SafeAreaProvider>
              <CameraProvider>
                <FirebaseWrapper>{children}</FirebaseWrapper>
              </CameraProvider>
            </SafeAreaProvider>
          </LoadingHandler>
        </ErrorHandler>
      </GestureHandlerRootView>
    </Provider>
  );
};

export { JungoWrappers };
