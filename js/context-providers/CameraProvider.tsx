import { CameraCapturedPicture } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { createContext, useRef, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CameraOverlay, {
  PictureConfirmCallback,
} from "../components/CameraOverlay";

type CameraContextType = {
  open: (cb: PictureConfirmCallback) => void;
};

export const CameraContext = createContext<CameraContextType>({
  open: () => null,
});

export const CameraProvider = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const callback = useRef<PictureConfirmCallback>(() => null)

  const open = (cb: PictureConfirmCallback) => {
    callback.current = cb;
    setIsOpen(true);
  };

  const pictureHandle = (picture: CameraCapturedPicture) => {
    setIsOpen(false);
    callback.current(picture)
  }

  const cancelHandle = () => {
    setIsOpen(false)
    callback.current(undefined)
  }

  return (
    <CameraContext.Provider value={{ open }}>
      {children}
      {isOpen && (
        <View
          style={{
            position: "absolute",
            height: '100%',
            width: '100%',
            paddingTop: insets.top
          }}
          onLayout={(ev) =>
            console.log("cameraprovider:", ev.nativeEvent.layout)
          }
        >
          <StatusBar style="dark"/>
          <CameraOverlay onPictureConfirm={pictureHandle} onCancel={cancelHandle} />
        </View>
      )}
    </CameraContext.Provider>
  );
};
