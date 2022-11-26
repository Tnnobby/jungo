import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import BackChevron from "../../svg/jsx/BackChevron";
import CloseX from "../../svg/jsx/CloseX";
import { useDispatch } from "react-redux";
import { backPage } from "../../../redux/reducers/navigationReducer";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";

export const SMALL_HEADER_HEIGHT: number = 60;

const styles = StyleSheet.create({
  navMain: {
    height: SMALL_HEADER_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 5, // Experimental
    backgroundColor: "white",
    justifyContent: "space-between",
    zIndex: 10,
  },
  backText: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: "Rubik_500",
    marginLeft: 6,
  },
  backIcon: {
    height: 40,
    width: 30,
  },
  backContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: 'red',
    padding: 4,
  },
  closeContainer: {
    height: 21,
    width: 21,
    marginRight: 5,
  },
  closePressable: {
    height: 40,
    width: 40,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerTextContainer: {},
  headerText: {
    fontSize: 20,
    fontFamily: "Rubik_600",
  },
  piece: {
    flex: 1,
    flexDirection: "row",
  },
});

interface SmallHeaderProps {
  backButtonShown?: boolean;
  backText?: string;
  closeButtonShown?: boolean;
  headerText?: string;
  onBackPress?: () => void;
  onClosePress?: () => void;
  backgroundColor?: string;
  animatedStyle?: SharedValue<ViewStyle>;
  overlapHeader?: boolean;
}

export default function SmallHeader({
  backButtonShown,
  backText = "Back",
  closeButtonShown,
  headerText,
  onBackPress,
  onClosePress,
  backgroundColor,
  animatedStyle,
  overlapHeader,
  ...props
}: SmallHeaderProps) {
  const navigation = useNavigation();

  const backHandle = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }
    navigation.canGoBack() && navigation.goBack();
  };
  const closeButtonHandle = () => {
    if (onClosePress) {
      onClosePress();
      return;
    }
    navigation.canGoBack() && navigation.goBack();
  };
  const computedAnimatedStyles = animatedStyle && useAnimatedStyle(() => {
    return animatedStyle.value;
  });
  return (
    <Animated.View
      style={[
        styles.navMain,
        {
          width: Dimensions.get("window").width,
          position: overlapHeader ? "absolute" : "relative",
        },
        animatedStyle && computedAnimatedStyles,
      ]}
      {...props}
    >
      <View style={{ ...styles.piece, justifyContent: "flex-start" }}>
        {backButtonShown && (
          <Pressable style={styles.backContainer} onPress={backHandle}>
            <BackChevron />
            <Text style={styles.backText}>{backText}</Text>
          </Pressable>
        )}
      </View>

      <View style={{ ...styles.piece, justifyContent: "center", flex: 2 }}>
        {headerText && (
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>{headerText}</Text>
          </View>
        )}
      </View>

      <View style={{ ...styles.piece, justifyContent: "flex-end" }}>
        {closeButtonShown && (
          <Pressable
            onPress={onClosePress ? onClosePress : closeButtonHandle}
            style={styles.closePressable}
          >
            <View style={styles.closeContainer}>
              <CloseX />
            </View>
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}
