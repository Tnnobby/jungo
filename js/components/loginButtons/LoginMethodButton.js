import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import AppleLogo from "./AppleLogo";
import GoogleLogo from "./GoogleLogo";
import StatefulPressable from "../StatefulPressable";
import FacebookLogo from "./FacebookLogo";
import { useRef } from "react";
import { useEffect } from "react";

const WIDTH = Dimensions.get("screen").width - 40;

const styles = StyleSheet.create({
  main: {
    width: WIDTH,

    borderRadius: 100,
    marginBottom: 10,
    marginRight: 10,
    height: 42,
    overflow: "hidden",
  },
  content: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  facebookMain: {
    backgroundColor: "#0077AC",
  },
  appleMain: {
    backgroundColor: "#000000",
  },

  googleMain: {
    backgroundColor: "#EAEAEA",
  },
  logoContainer: {
    height: 17,
    width: 17,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
});

function ExternalSigninButton({
  backgroundColor,
  color: textColor,
  icon,
  text,
  expanded = 1,
  ...props
}) {
  const animateState = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (expanded) {
      Animated.spring(animateState, {
        toValue: 1,
        useNativeDriver: false,
        overshootClamping: true
      }).start();
    } else {
      Animated.spring(animateState, {
        toValue: 0,
        useNativeDriver: false,
        overshootClamping: true
      }).start();
    }
  }, [expanded]);

  return (
    <Animated.View
      style={{
        ...styles.main,
        backgroundColor,
        width: animateState.interpolate({
          inputRange: [0, 1],
          outputRange: [42, WIDTH],
        }),
      }}
    >
      <StatefulPressable style={styles.content} {...props}>
        <View
          style={{
            ...styles.logoContainer,
            marginRight: expanded ? 10 : 0,
            marginTop: expanded ? 0 : 2,
            transform: [{scale: expanded ? 1 : 1.3}]
          }}
        >
          {icon}
        </View>
        <Text
          style={{
            ...styles.text,
            color: textColor,
            display: expanded ? undefined : "none",
          }}
        >
          {text}
        </Text>
      </StatefulPressable>
    </Animated.View>
  );
}

/**
 *
 * @param {{expanded}} props
 * @returns
 */
const GoogleSignIn = (props) => (
  <ExternalSigninButton
    backgroundColor={"#EAEAEA"}
    color="black"
    icon={<GoogleLogo />}
    text="Sign in with Google"
    {...props}
  />
);
/**
 *
 * @param {{expanded}} props
 * @returns
 */
const AppleSignIn = (props) => (
  <ExternalSigninButton
    backgroundColor={"black"}
    color="white"
    icon={<AppleLogo fill="white" />}
    text="Sign in with Apple"
    {...props}
  />
);
/**
 *
 * @param {{expanded}} props
 * @returns
 */
const FacebookSignIn = (props) => (
  <ExternalSigninButton
    backgroundColor={"#0077AC"}
    color="white"
    icon={<FacebookLogo />}
    text="Sign in with Facebook"
    {...props}
  />
);

export { GoogleSignIn, AppleSignIn, FacebookSignIn };
