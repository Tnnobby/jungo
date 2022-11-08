import { useRef } from "react";
import { useState } from "react";
import { Image, Keyboard, Pressable, StyleSheet, Text, View } from "react-native";
import FormInput from "../../components/form/FormInput";
import Header from "../../components/header";
import LoginButton from "../../components/LoginButton";
import {
  AppleSignIn,
  FacebookSignIn,
  GoogleSignIn,
} from "../../components/loginButtons/LoginMethodButton";
import StatefulPressable from "../../components/StatefulPressable";
import constants from "../../constants";
import { useNavigation } from "../../hooks/useNavigation";
import Page from "../../Page";
import CloseX from "../../svg/jsx/CloseX";
import ContinueArrow from "../../svg/jsx/ContinueArrow";

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 20,
  },
  headerRow: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    // backgroundColor: 'red',
    height: 60,
  },
  closeContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: "100%",
  },
  logo: {
    marginTop: 10,
    marginLeft: 20,
    height: 50,
    width: 100,
    // backgroundColor: 'red',
  },
  close: {
    height: 25,
    width: 25,
  },
  welcomeText: {
    marginTop: 10,
    fontSize: 36,
    fontFamily: "Rubik_500",
    marginBottom: 60,
  },
  descriptorText: {
    fontFamily: "Rubik_500",
    fontSize: 18,
    marginBottom: 10,
  },
  inputStyle: {
    color: "black",
    fontSize: 20,
  },
  signInCont: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default function LoginLayout({
  welcomeMessage,
  onSubmit,
  onError,
  login = true,
  ...props
}) {
  const [isTyping, setIsTyping] = useState(false);
  const [emailValue, setEmailValue] = useState(null);
  const [passwordValue, setPasswordValue] = useState(null);
  const [invalidFields, setInvalidFields] = useState([]);
  const isSubmitted = useRef(false)
  const { toPage, lastPage } = useNavigation();

  const onInputFocus = () => setIsTyping(true);
  const onInputBlur = () => setIsTyping(false);

  const submitHandle = () => {
    Keyboard.dismiss()
    if (!isSubmitted.current) {
      setInvalidFields([]);
      if (emailValue === null) {
        setInvalidFields((current) => [...current, "email"]);
      }
      if (passwordValue === null) {
        setInvalidFields((current) => [...current, "password"]);
      }
      if (invalidFields > 0) return;
      onSubmit && onSubmit({ email: emailValue, password: passwordValue });
      isSubmitted.current = true
      setTimeout(() => isSubmitted.current = false, 500)
    }
  };

  const onClosePress = () => {
    lastPage()
  }

  return (
    <Page {...props}>
      <View style={styles.headerRow}>
        <Image
          style={styles.logo}
          source={require("../JungoMain.png")}
          resizeMode="contain"
        />
        <Pressable onPress={onClosePress} style={styles.closeContainer}>
          <View style={styles.close}>
            <CloseX strokeWidth={5} />
          </View>
        </Pressable>
      </View>
      <View style={styles.main}>
        <Text style={styles.welcomeText}>{welcomeMessage}</Text>
        <Text style={styles.descriptorText}>
          {login ? "Log in" : "Sign up"} with your Email:
        </Text>
        <FormInput
          id="email"
          placeholder="Email"
          invalid={invalidFields.includes("email")}
          invalidStyle={{
            borderColor: "red",
            borderStyle: "solid",
            borderWidth: 2,
          }}
          outerStyle={{ marginBottom: 10 }}
          style={styles.inputStyle}
          textColor="black"
          textContentType="emailAddress"
          autoCorrect={false}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          onChangeText={setEmailValue}
          
        />
        <FormInput
          id="password"
          placeholder="Password"
          invalid={invalidFields.includes("password")}
          invalidStyle={{
            borderColor: "red",
            borderStyle: "solid",
            borderWidth: 2,
          }}
          outerStyle={{ marginBottom: 20 }}
          style={styles.inputStyle}
          secureTextEntry={true}
          textColor="black"
          textContentType={login ? "password" : "newPassword"}
          autoCorrect={false}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          onChangeText={setPasswordValue}
          onSubmitEditing={submitHandle}
        />
        <Text style={styles.descriptorText}>Or Sign up with:</Text>
        <View style={styles.footerRow}>
          <View style={styles.signInCont}>
            <AppleSignIn expanded={!isTyping} />
            <FacebookSignIn expanded={!isTyping} />
            <GoogleSignIn expanded={!isTyping} />
          </View>
          {isTyping && <LoginButton onPress={submitHandle} />}
        </View>
      </View>
    </Page>
  );
}
