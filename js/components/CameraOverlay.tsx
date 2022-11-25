import { Camera, CameraType, FlashMode } from "expo-camera";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  addPhoto,
} from "../../redux/reducers/cameraReducer";
import {
  Animated,
  Dimensions,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import CloseX from "../svg/jsx/CloseX";
import * as Haptics from "expo-haptics";
import Flash from "../svg/jsx/Flash";
import CheckIcon from "../svg/jsx/CheckIcon";
import { useNavigation } from "../hooks/useNavigation";

const styles = StyleSheet.create({
  cameraContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    flexDirection: "column",
    backgroundColor: "black",
  },
  camera: {
    height: Dimensions.get("window").width * (16 / 9),
    width: Dimensions.get("window").width,
  },
  upperToolbar: {
    position: "absolute",
    width: "100%",
    height: 50,
    top: 0,
    left: 0,
    backgroundColor: "transparent",
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lowerToolbar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: 'red'
  },
  reviewLowerToolbar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  shutterContainer: {
    height: 75,
    width: 75,
    // backgroundColor: 'white',
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  shutter: {
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: "white",
  },
  closeButton: {
    height: 25,
    width: 25,
  },
  pressableClose: {
    height: 45,
    width: 45,
    borderRadius: 100,
    top: 20,
    right: 20,
    backgroundColor: "#ffffff26",
    justifyContent: "center",
    alignItems: "center",
  },
  pressableGallery: {
    flex: 1,
  },
  pressableFlash: {
    justifyContent: "flex-end",
  },
  flash: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'white'
  },
  flashContainer: {
    flexDirection: "row",
    justifyContent: "center",
    // borderColor: 'white',
    // borderWidth: 2,
    flex: 1,
  },
  checkContainer: {
    height: 90,
    width: 90,
    padding: 20,
    // backgroundColor: 'red',
  },
  closeContainer: {
    height: 90,
    width: 90,
    padding: 25,
    // backgroundColor: 'red'
  }
});

type CameraState = "loading" | "ready" | "processing" | "reviewing";

export default function CameraOverlay({ close, addPicture, ...props }: {
  close: () => void;
  addPicture: (picture: any) => void
}) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraState, setCameraState] = useState<CameraState>("loading");
  const [shutterState, setShutterState] = useState(false);
  const [flashState, setFlashState] = useState(false);
  const [tempPhoto, setTempPhoto] = useState(null);
  const shutterScale = useRef(new Animated.Value(1)).current;
  const cameraRef = useRef<Camera>();

  useEffect(() => {
    Keyboard.dismiss();
    if (!permission) requestPermission();
    if (permission) setCameraState("loading");
  }, [permission]);

  const closeCamera = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    close();
  };
  const onReadyHandle = () => setCameraState("ready");

  const shutterPressIn = () => {
    Animated.timing(shutterScale, {
      toValue: 0.9,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setShutterState(true);
  };
  const shutterPressOut = () => {
    Animated.timing(shutterScale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setShutterState(false);
  };
  const shutterPress = () => {
    setCameraState("processing");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    cameraRef.current.takePictureAsync({base64: true}).then((r) => {
      // dispatch(addPhoto(r))
      setTempPhoto(r);
      setCameraState("reviewing");
    });
  };

  const flashPressIn = () => {};
  const flashPressOut = () => {};
  const flashPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFlashState(!flashState);
  };

  const confirmHandle = () => {
    addPicture(tempPhoto)
    close()
  }
  const retakeHandle = () => {
    setTempPhoto(null)
    setCameraState('ready')
  }

  if (!permission) return <></>;
  return (
    <>
      {permission.granted && (
        <View style={styles.cameraContainer}>
          <View style={styles.upperToolbar}>
            <View></View>
            <Pressable style={styles.pressableClose} onPress={closeCamera}>
              <View style={styles.closeButton}>
                <CloseX fill="#131313" />
              </View>
            </Pressable>
          </View>
          {cameraState === "reviewing" ? (
            <Image style={styles.camera} source={tempPhoto} />
          ) : (
            <Camera
              type={CameraType.back}
              ratio="16:9"
              style={styles.camera}
              onCameraReady={onReadyHandle}
              ref={cameraRef}
              flashMode={flashState ? FlashMode.on : FlashMode.off}
              {...props}
            />
          )}
          {cameraState === "reviewing" ? (
            <View style={styles.reviewLowerToolbar}>
              <Pressable style={styles.checkContainer} onPress={confirmHandle}>
                <CheckIcon fill='white' />
              </Pressable>
              <Pressable style={styles.closeContainer} onPress={retakeHandle}>
                <CloseX fill='white' />
              </Pressable>
            </View>
          ) : (
            <View style={styles.lowerToolbar}>
              <Pressable style={styles.pressableGallery}></Pressable>
              <Pressable
                style={{
                  ...styles.shutterContainer,
                  borderColor: cameraState !== "ready" ? "#afafaf" : "white",
                }}
                onPressIn={cameraState === "ready" && shutterPressIn}
                onPressOut={cameraState === "ready" && shutterPressOut}
                onPress={cameraState === "ready" && shutterPress}
              >
                <Animated.View
                  style={{
                    ...styles.shutter,
                    backgroundColor:
                      cameraState !== "ready"
                        ? "#afafaf"
                        : shutterState === true
                        ? "#d9d9d9"
                        : "white",
                    transform: [{ scale: shutterScale }],
                  }}
                />
              </Pressable>
              <View style={styles.flashContainer}>
                <Pressable
                  style={styles.pressableFlash}
                  onPress={flashPress}
                  onPressIn={flashPressIn}
                  onPressOut={flashPressOut}
                >
                  <View style={styles.flash}>
                    <Flash active={flashState} />
                  </View>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      )}
    </>
  );
}
