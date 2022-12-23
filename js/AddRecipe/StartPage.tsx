import { useEffect, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { isTablet } from "../../App";
import {
  addPhoto,
  selectRecipeFields,
  setRecipeTitle,
} from "../../redux/reducers/newRecipeReducer";
import { AddRecipePageProps } from "../../routes/routes";
import { AnimatedButton } from "../components/AnimatedButton";
import GeneralStyles from "../components/GeneralStyles";
import { KeyboardSafeView, KeyboardSafeViewRef } from "../components/KeyboardSafeView";
import NavigationPage from "../components/NavigationPage";
import { TextArea } from "../components/TextArea";
import { colors, shadows } from "../constants";
import { useCamera } from "../hooks/useCamera";
import Camera from "../svg/jsx/Camera";
import ChefHat from "../svg/jsx/ChefHat";
import FireIcon from "../svg/jsx/FireIcon";
import FlameIcon from "../svg/jsx/FlameIcon";
import TimerIcon from "../svg/jsx/TimerIcon";
import AddRecipeHeader from "./add-recipe-header";

const styles = StyleSheet.create({
  startMain: {
    paddingTop: 30,
    paddingHorizontal: 20,
    flexGrow: 1,
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
    right: 20,
    justifyContent: "flex-end",
    width: "100%",
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 125,
    backgroundColor: colors.primary_color,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 100,
    ...shadows.elevation2
  },
  nextButtonText: {
    fontFamily: "Rubik_500",
    fontSize: 20,
    color: "white",
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

type StartPageProps = AddRecipePageProps<"pageone">;

export default function StartPage({ navigation }: StartPageProps) {
  const descriptionRef = useRef<TextInput>(null);
  const keyboardSafeRef = useRef<KeyboardSafeViewRef>()
  const dispatch = useDispatch();
  const { preheat, cooktime, preptime, nutrition_facts, title, photo } =
    useSelector(selectRecipeFields);
  const [cameraPressing, setCameraPressing] = useState(false);
  const [keyboardUp, setKeyboardUp] = useState(false);
  const { open } = useCamera();

  const cameraPress = () => {
    open((picture) => picture && dispatch(addPhoto(picture.uri)))
  };
  const cameraPressIn = () => setCameraPressing(true);
  const cameraPressOut = () => setCameraPressing(false);

  const preheatActionTrigger = () =>
    navigation.navigate("temperature-bedsheet", { initialValue: preheat });

  const cookTimeActionTrigger = () =>
    navigation.navigate("timer-bedsheet", { initialValue: cooktime, fieldName: 'cooktime' });

  const prepTimeActionTrigger = () =>
    navigation.navigate("timer-bedsheet", { initialValue: preptime, fieldName: 'preptime' });

  const caloriesActionTrigger = () =>
    navigation.navigate("nutrition-bedsheet", {
      initialValue: nutrition_facts,
    });

  const nextHandle = () => {
    if (keyboardUp) {
      Keyboard.dismiss();
    } else goNext();
  };

  const goNext = () => navigation.navigate("pagetwo");
  const updateTitle = (ev) => dispatch(setRecipeTitle(ev.nativeEvent.text));

  const keyboardHandler = () => {
    !isTablet && keyboardSafeRef.current.raise()
  }

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
    <NavigationPage>
      <AddRecipeHeader />
      <KeyboardSafeView ref={keyboardSafeRef} style={styles.body}>
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
            {!photo ? (
              <Camera /* Camera Icon */ />
            ) : (
              <Image source={{ uri: photo, height: 80, width: 80 }} />
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
        <TextArea
          placeholder="Enter Description"
          multiline={true}
          onFocus={keyboardHandler}
          ref={descriptionRef}
        />
      </KeyboardSafeView>
      <AnimatedButton
        style={(state) => {
          return !state.pressed
            ? styles.nextButton
            : {
                ...styles.nextButton,
                ...shadows.elevation0,
              };
        }}
        onPress={nextHandle}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </AnimatedButton>
    </NavigationPage>
  );
}
