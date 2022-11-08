import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { launchCamera } from "../../redux/reducers/cameraReducer";
import {
  setNewRecipeField,
  setRecipeTitle,
} from "../../redux/reducers/newRecipeReducer";
import NutritionDetails from "../components/bedsheets/NutritionDetails";
import Preheat from "../components/bedsheets/Preheat";
import GeneralStyles from "../components/GeneralStyles";
import constants from "../constants";
import useCamera from "../hooks/useCamera";
import { useOverlay } from "../hooks/useOverlay";
import Camera from "../svg/jsx/Camera";
import ChefHat from "../svg/jsx/ChefHat";
import FireIcon from "../svg/jsx/FireIcon";
import FlameIcon from "../svg/jsx/FlameIcon";
import TimerIcon from "../svg/jsx/TimerIcon";

const styles = StyleSheet.create({
  startMain: {
    paddingTop: 30,
    paddingHorizontal: 20,
    flexGrow: 1
  },
  titleRow: {
    flexDirection: "row",
  },
  photoPressable: {
    height: 80,
    width: 80,
    borderRadius: 15,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    overflow: "hidden",
  },
  titleColumn: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-around",
  },
  titleInput: {
    fontSize: 24,
    fontFamily: "Rubik_500",
  },
  tagPressable: {
    marginBottom: 10,
  },
  tagText: {
    fontFamily: "Rubik_400",
    fontSize: 14,
    color: "#707070",
  },

  gettingStartedContainer: {
    flexDirection: "column",
    marginTop: 20,
  },
  gsRowContainer: {
    flexDirection: "column",
  },
  gsRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  gsRowFront: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  gsRowBack: {},
  gsIconBack: {
    backgroundColor: "#F0F0F0",
    width: 42,
    height: 42,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  gsRowText: {
    fontSize: 18,
    fontFamily: "Rubik_500",
  },
  gsAction: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  actionText: {
    fontSize: 18,
    lineHeight: 20,
    fontFamily: "Rubik_500",
  },
  descriptionInput: {
    padding: 5,
    backgroundColor: "#F5F5F5",
    borderColor: "#B4B4B4",
    borderWidth: 1,
    borderRadius: 8,
    height: 150,
  },
  nextContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  nextButton: {
    width: 125,
    backgroundColor: constants.primary_color,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 100,
    elevation: 2,
  },
  nextButtonText: {
    fontFamily: "Rubik_500",
    fontSize: 20,
    color: "white",
  },
});

export default function StartPage({
  preheat,
  cooktime,
  preptime,
  nutrition_facts,
  nextPage,
  title,
  photo,
  ...props
}) {
  const dispatch = useDispatch();
  const { state: cameraState, photos: cameraPhotos } = useSelector(
    (s) => s.camera
  );
  const [cameraPressing, setCameraPressing] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [keyboardUp, setKeyboardUp] = useState(false);
  const keyboardOffset = useRef(new Animated.Value(0)).current;
  const xOffset = useRef(new Animated.Value(0)).current;
  const descriptionRef = useRef();
  const { setBedsheet, valueRef } = useOverlay();
  const camera = useCamera()

  const triggerKeyboardOffset = () => {
    const _show = Keyboard.addListener("keyboardDidShow", (e) => {
      Animated.spring(keyboardOffset, {
        toValue: -e.endCoordinates.height + 20,
        useNativeDriver: true,
      }).start(_show.remove());
    });
    const _hide = Keyboard.addListener("keyboardDidHide", (e) => {
      Animated.spring(keyboardOffset, {
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        _hide.remove();
      });
    });
  };

  useEffect(() => {
    const _up = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardUp(true)
    );
    const _down = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardUp(false)
    );

    return () => {
      _up.remove();
      _down.remove();
    };
  }, []);

  useEffect(() => {
    if (cameraState === "idle" && cameraOpen) {
      cameraPhotos.length > 0 &&
        dispatch(setNewRecipeField({ photo: cameraPhotos }));
      setCameraOpen(false);
    }
  }, [cameraState]);

  const cameraPress = () => {
    setCameraOpen(true);
    camera.open()
  };
  const cameraPressIn = () => setCameraPressing(true);
  const cameraPressOut = () => setCameraPressing(false);

  const preheatActionTrigger = () =>
    setBedsheet({
      element: <Preheat />,
      initialValue: preheat || 350,
      onClose: () => setValue("preheat"),
    });

  const cookTimeActionTrigger = () =>
    openOverlay({ overlay: "timer", id: "cooktime", value: cooktime });
  const prepTimeActionTrigger = () =>
    openOverlay({ overlay: "timer", id: "preptime", value: preptime });

  const caloriesActionTrigger = () =>
    setBedsheet({
      element: <NutritionDetails />,
      initialValue: nutrition_facts,
      onClose: () => setValue('nutrition_facts')
    });

  const setValue = (field) => {
    console.log("setting value to:", valueRef.current);
    dispatch(setNewRecipeField({ [field]: valueRef.current }));
  };

  const openOverlay = (overlay) => {
    setActiveBedsheet(overlay.id);
    // console.log(overlay);
    dispatch(setBedsheet(overlay));
  };

  const descriptionPressHandle = () => descriptionRef.current.focus();

  const nextHandle = () => {
    if (keyboardUp) {
      Keyboard.dismiss();
      // keyboardOffset.addListener(() => {
      //   console.log('done');
      //   keyboardOffset.removeAllListeners();
      //   setTimeout(() => {
      //     goNext();
      //   }, 275)
      // })
    } else goNext();
  };

  const goNext = () => {
    nextPage(
      new Promise((resolve, reject) => {
        Animated.timing(xOffset, {
          toValue: -Dimensions.get("screen").width,
          duration: 250,
          useNativeDriver: true,
        }).start(() => resolve(true));
      })
    );
  };
  const updateTitle = (ev) => dispatch(setRecipeTitle(ev.nativeEvent.text));

  const items = [
    {
      title: "Preheat Oven",
      item_value: <Text style={styles.gsRowText}>{preheat} ℉</Text>,
      icon: <FireIcon scale={1.25} />,
      triggerHandle: preheatActionTrigger,
    },
    {
      title: "Cook Time",
      icon: <TimerIcon scale={1.25} />,
      item_value: (
        <Text
          style={styles.gsRowText}
        >{`${cooktime.hours} hr ${cooktime.minutes} min`}</Text>
      ),
      triggerHandle: cookTimeActionTrigger,
    },
    {
      title: "Prep Time",
      icon: (
        <View style={{ height: 25, width: 25 }}>
          <ChefHat fill="#498CF7" />
        </View>
      ),
      item_value: (
        <Text
          style={styles.gsRowText}
        >{`${preptime.hours} hr ${preptime.minutes} min`}</Text>
      ),
      triggerHandle: prepTimeActionTrigger,
    },
    {
      title: "Calories",
      triggerHandle: caloriesActionTrigger,
      item_value: (
        <Text style={styles.gsRowText}>{nutrition_facts.calories} cal</Text>
      ),
      icon: <FlameIcon scale={1.25} />,
    },
  ];

  return (
    <Animated.View
      style={{
        ...styles.startMain,
        transform: [{ translateY: keyboardOffset }, { translateX: xOffset }],
      }}
    >
      {/* TITLE ROW */}
      <View style={styles.titleRow}>
        <Pressable
          style={{
            ...styles.photoPressable,
            backgroundColor: cameraPressing ? "#cecece" : "#E0E0E0",
          }}
          onPressIn={cameraPressIn}
          onPressOut={cameraPressOut}
          onPress={cameraPress}
        >
          {photo.length < 1 ? (
            <Camera /* Camera Icon */ />
          ) : (
            <Image source={{ ...photo[0], width: "100%", height: "100%" }} />
          )}
        </Pressable>
        <View style={styles.titleColumn}>
          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            defaultValue={title}
            showSoftInputOnFocus={true}
            multiline={false}
            onEndEditing={updateTitle}
          />
          <Pressable style={styles.tagPressable}>
            <Text style={styles.tagText}></Text>
          </Pressable>
        </View>
      </View>
      {/* END OF TITLE ROW */}
      {/* GETTING STARTED SECTION */}
      <View style={styles.gettingStartedContainer}>
        <Text style={{ ...GeneralStyles.header, color: "#498CF7" }}>
          Getting Started
        </Text>

        {/* Preheat Oven */}
        <View style={styles.gsRowContainer}>
          {items.map((item, index) => {
            return (
              <View key={`row_${index}`} style={styles.gsRow}>
                <View style={styles.gsRowFront}>
                  <View style={styles.gsIconBack}>{item.icon}</View>
                  <Text style={styles.gsRowText}>{item.title}</Text>
                </View>
                <View style={styles.gsRowBack}>
                  <Pressable
                    style={styles.gsAction}
                    onPress={item.triggerHandle}
                  >
                    {item.item_value}
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      </View>
      {/* DESCRIPTION SECTION */}
      <Text
        style={{
          ...GeneralStyles.header,
          color: "#498CF7",
          marginVertical: 20,
        }}
      >
        Description
      </Text>
      <Pressable
        style={styles.descriptionInput}
        onPress={descriptionPressHandle}
      >
        <TextInput
          placeholder="Enter Description"
          multiline={true}
          onFocus={triggerKeyboardOffset}
          ref={descriptionRef}
        />
      </Pressable>
      <View style={styles.nextContainer}>
        <Pressable style={styles.nextButton} onPress={nextHandle}>
          <Text style={styles.nextButtonText}>Next</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}
