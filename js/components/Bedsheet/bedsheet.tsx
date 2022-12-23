import { useNavigation } from "@react-navigation/native";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  Keyboard,
  LayoutChangeEvent,
  LayoutRectangle,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface BedsheetProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export interface BedsheetRef {
  open: () => void;
  close: () => void;
}

type CloseOptions = {
  velocity?: number;
};

export const Bedsheet = forwardRef<BedsheetRef, BedsheetProps>(
  ({ children, onClose }: BedsheetProps, ref) => {
    const dimensions = useWindowDimensions();
    const [bedsheetLayout, setBedsheetLayout] = useState<LayoutRectangle>();
    const navigation = useNavigation();

    //#region declare animated values
    const yOffset = useSharedValue<number>(dimensions.height);
    const opacity = useDerivedValue(() => {
      return (1 - yOffset.value / dimensions.height) * 0.4;
    });

    const swipeHandler = useMemo(
      () =>
        Gesture.Pan()
          .activeOffsetY([-10, 10])
          .runOnJS(true)
          .onBegin((ev) => {})
          .onChange((ev) => {
            if (!bedsheetLayout) return;

            yOffset.value = ev.translationY;
          })
          .onEnd((ev) => {
            if (!bedsheetLayout) return;
            if (ev.translationY >= bedsheetLayout.height / 2) {
              navigation.goBack();
            } else {
              yOffset.value = withSpring(0, { overshootClamping: true });
            }
          }),
      [bedsheetLayout]
    );

    //#region declare custom ref values
    const open = (cb?: () => void) => {
      yOffset.value = withSpring(
        0,
        { overshootClamping: true, mass: 0.15 },
        (finished) => finished && cb && runOnJS(cb)()
      );
    };
    const close = (cb?: () => void) => {
      Keyboard.dismiss();
      yOffset.value = withSpring(
        dimensions.height,
        {
          overshootClamping: true,
          mass: 0.6,
        },
        (finished) => {
          finished && cb && runOnJS(cb)();
        }
      );
    };
    useImperativeHandle(ref, () => ({
      open,
      close,
    }));
    //#endregion

    useEffect(() => {
      open();
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
        close(() => {
          navigation.dispatch(e.data.action);
        });
      });
    }, []);

    const clickBackdropHandle = () => {
      navigation.goBack();
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: Math.max(yOffset.value, 0),
          },
        ],
        paddingBottom: yOffset.value < 0 ? Math.min(-yOffset.value, 100) : 0,
      };
    });
    const animatedBackdropStyles = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
      };
    });

    const layoutHandle = (ev: LayoutChangeEvent) => {
      setBedsheetLayout(ev.nativeEvent.layout);
    };

    return (
      <View style={styles.main}>
        <Pressable onPress={clickBackdropHandle}>
          <Animated.View style={[animatedBackdropStyles, styles.backdrop]} />
        </Pressable>
        <GestureDetector gesture={swipeHandler}>
          <Animated.View
            style={[animatedStyle, styles.sheet]}
            onLayout={layoutHandle}
          >
            <View style={styles.handle} />
            {children}
          </Animated.View>
        </GestureDetector>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  main: {
    position: "relative",
    flex: 1,
  },
  backdrop: {
    height: "100%",
    width: "100%",
    backgroundColor: "#909090",
  },
  sheet: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 6,
    bottom: 0,
    elevation: 10,
  },
  handle: {
    width: 80,
    height: 6,
    borderRadius: 100,
    backgroundColor: "#909090",
    opacity: 0.4,
    marginVertical: 10,
    alignSelf: "center",
  },
});
