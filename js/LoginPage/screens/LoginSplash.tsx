import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { LoginPageProps } from "../../../routes/routes";
import NavigationPage from "../../components/NavigationPage";
import { colors, shadows } from "../../constants";

const styles = StyleSheet.create({
  main: {
    flex: 1,
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
    backgroundColor: colors.button_color,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    borderRadius: 100,
    ...shadows.elevation2
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
    color: colors.button_color,
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
      <Pressable
        style={(state) => {
          if (state.pressed) {
            return {
              ...styles.signupBtn,
              ...shadows.elevation0
            }
          } else {
            return styles.signupBtn
          }
        }}
        onPress={onSignupPress}
      >
        <Text style={styles.signupTxt}>Sign Up</Text>
      </Pressable>
      <View style={styles.loginRow}>
        <Text style={styles.loginDescription}>Already have an account? </Text>
        <Pressable style={styles.loginButton} onPress={onLoginPress}>
          <Text style={styles.loginText}>Log In</Text>
        </Pressable>
      </View>
    </NavigationPage>
  );
}
