import React, { useMemo } from "react";
import { useEffect } from "react";
import { Animated } from "react-native";
import useTransitions from "../hooks/useTransitions";
import LoginMainPage from "./screens/LoginPage";
import LoginSplash from "./screens/LoginSplash";
import SignUpPage from "./screens/SignUpPage";
import UserInfoPage from "./screens/UserInfoPage";

export default function LoginPage({ ...props }) {
  const { render, isInitialized, initializeTransition, addListener, toScreen } =
    useTransitions({
      initialTransition: {
        forward: {
          animateTo: "left",
          animateStyle: "timing",
          animateTiming: 250,
        },
        backward: {
          animateTo: "right",
          animateStyle: "timing",
          animateTiming: 250,
        },
      },
    });

  const toUserInfoHandle = (data) => {
    toScreen({
      to: pages.userinfo(data),
      outStyle: 'forward',
      transitionIn: 'swipeFromLeft'
    })
  }

  const pages = useMemo(() => {
    return {
      login: (
        <LoginMainPage
          key="login"
          onClosePress={() =>
            toScreen({
              to: pages.splash,
              outStyle: "backward",
              transitionIn: "swipeFromLeft",
            })
          }
          id="loginLogin"
        />
      ),
      splash: (
        <LoginSplash
          // onSignupPress={() =>
          //   toScreen({
          //     to: pages.signup,
          //     outStyle: "forward",
          //     transitionIn: "swipeLeft",
          //   })
          // }
          // onLoginPress={() =>
          //   toScreen({
          //     to: pages.login,
          //     outStyle: "forward",
          //     transitionIn: "swipeLeft",
          //   })
          // }
          key="splash"
          id="loginSplash"
        />
      ),
      signup: (
        <SignUpPage
          key="signup"
          onSignUp={toUserInfoHandle}
          onClosePress={() =>
            toScreen({
              to: pages.splash,
              transitionIn: "swipeFromLeft",
              outStyle: "backward",
            })
          }
          id="loginSignup"
        />
      ),
      userinfo: (data) => (
        <UserInfoPage
          key="userinfo"
          onClosePress={() => toScreen({
            to: pages.splash,
            transitionIn: "swipeFromLeft",
            outStyle: "backward"
          })}
          onBackPress={() => toScreen({
            to: pages.signup,
            transitionIn: 'swipeRight',
            outStyle: 'backward'
          })}
          data={data}
          id="loginUserinfo"
        />
      )
    };
  }, []);

  useEffect(() => {
    initializeTransition(pages.splash) // pages.splash
  }, []);
  
  return <>{render && render}</>;
}
