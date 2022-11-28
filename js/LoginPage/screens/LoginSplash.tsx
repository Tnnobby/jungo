import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import NavigationPage from "../../components/NavigationPage";
import StatefulPressable from "../../components/StatefulPressable";
import constants from "../../constants";
import { LoginPageProps } from "../../../routes/LoginRouter";

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

interface LoginSplashPageProps extends LoginPageProps<'splash'> {

}

export default function LoginSplash({ navigation, route, ...props }: LoginSplashPageProps) {
  const onLoginPress = () => {
    navigation.navigate('login-form')
  };
  const onSignupPress = () => {
    navigation.navigate('signup-form')
  };
  return (
    <NavigationPage style={styles.main} {...props}>
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
    </NavigationPage>
  );
}
