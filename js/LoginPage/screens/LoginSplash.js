import { useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { DatePicker } from "../../components/bedsheets/DatePicker";
import StatefulPressable from "../../components/StatefulPressable";
import constants from "../../constants";
import { useNavigation } from "../../hooks/useNavigation";
import { useOverlay } from "../../hooks/useOverlay";
import Page from "../../Page";

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    paddingTop: 20,
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "white",
  },
  welcomeTxt: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: "Rubik_400",
    marginHorizontal: 80,
    textAlign: "center",
  },
  splashImage: {
    marginTop: 40,
  },
  signupBtn: {
    backgroundColor: constants.button_color,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    borderRadius: 100,
    elevation: 5,
  },
  signupTxt: {
    fontSize: 24,
    fontFamily: "Rubik_500",
    color: "white",
    paddingVertical: 10,
  },
  loginRow: {
    flexDirection: "row",
    marginTop: 15,
  },
  loginDescription: {
    fontSize: 16,
    fontFamily: "Rubik_400",
  },
  loginButton: {},
  loginText: {
    color: constants.button_color,
    fontSize: 16,
    fontFamily: "Rubik_500",
  },
});

export default function LoginSplash({ ...props }) {
  const { toPage } = useNavigation();

  const onLoginPress = () => {
    toPage({
      toRoute: "login_login",
    });
  };
  const onSignupPress = () => {
    toPage({
      toRoute: "login_signup",
    });
  };

  return (
    <Page style={styles.main} keyboardSafe={true} {...props}>
      <Image source={require("../JungoMain.png")} />
      <Text style={styles.welcomeTxt}>
        Your new relationship with food begins here.
      </Text>
      <Image
        style={styles.splashImage}
        source={require("../LoginSplash.png")}
      />
      <StatefulPressable
        style={styles.signupBtn}
        pressingStyle={{ elevation: 2 }}
        onPress={onSignupPress}
      >
        <Text style={styles.signupTxt}>Sign Up</Text>
      </StatefulPressable>
      <View style={styles.loginRow}>
        <Text style={styles.loginDescription}>Already have an account? </Text>
        <Pressable style={styles.loginButton} onPress={onLoginPress}>
          <Text style={styles.loginText}>Log In</Text>
        </Pressable>
      </View>
    </Page>
  );
}
