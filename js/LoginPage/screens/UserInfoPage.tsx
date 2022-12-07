import { useState, useRef, useEffect } from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../redux/reducers/userReducer";
import useAuth from "../../api/useAuth";
import FormDateInput from "../../components/form/FormDateInput";
import FormInput from "../../components/form/FormInput";
import FormRadioGroup from "../../components/form/FormRadioGroup";
import NavigationPage from "../../components/NavigationPage";
import StatefulPressable from "../../components/StatefulPressable";
import constants from "../../constants";
import useLoading from "../../hooks/useLoading.old";
import { useNavigation } from "../../hooks/useNavigation";
import Page from "../../Page";
import CloseX from "../../svg/jsx/CloseX";
import ContinueArrow from "../../svg/jsx/ContinueArrow";

const styles = StyleSheet.create({
  headerRow: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
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
  },
  close: {
    height: 25,
    width: 25,
  },
  body: {
    paddingHorizontal: 20,
    height:
      Platform.OS === "ios"
        ? Dimensions.get("window").height - 120
        : Dimensions.get("window").height - 60,
    backgroundColor: "white",
  },
  infoTextCont: {
    width: "100%",
    marginTop: 17,
  },
  groupLabel: {
    fontSize: 18,
    fontFamily: "Rubik_600",
  },
  formGroup: {
    marginTop: 32,
    width: "100%",
  },
  formSubgroup: {
    marginTop: 20,
  },
  inputGroup: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    fontSize: 18,
    fontFamily: "Rubik_400",
  },
  backBtnCont: {
    height: 46,
    width: 46,
    backgroundColor: constants.button_color,
    borderRadius: 100,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  continueBtnCont: {
    flexDirection: "row",
    backgroundColor: constants.button_color,
    borderRadius: 100,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  btnText: {
    color: "white",
    fontFamily: "Rubik_600",
    fontSize: 20,
    marginRight: 5,
  },
  floatingBtnRow: {
    width: Dimensions.get("window").width - 40,
    flexDirection: "row",
    marginLeft: 20,
    position: "absolute",
    bottom: 20,
    justifyContent: "space-between",
    // backgroundColor: 'red'
  },
  arrowSize: {
    height: 20,
    width: 20,
  },
});

const GOAL_OPTIONS = [
  "Maintain Weight",
  "Lose Weight",
  "Gain Weight",
  "Prefer Not To Say",
];

export default function UserInfoPage({ style, data, ...props }) {
  const [invalidFields, setInvalidFields] = useState([]);
  const activitySetting = useRef(null);
  const birthday = useRef(null);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const username = useRef(null);

  const setFirstName = (val) => (firstName.current = val);
  const setActivitySetting = (val) => (activitySetting.current = val);
  const setBirthday = (val) => (birthday.current = val);
  const setLastName = (val) => (lastName.current = val);
  const setUsername = (val) => (username.current = val);

  const { createUserDoc } = useAuth();
  const loading = useLoading();
  const { lastPage, toPage } = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) toPage({ toRoute: "login_splash", resetStack: false });
    console.log('userinf', data)
  }, [data]);

  const placeholderDate = () => {
    const _d = new Date();
    _d.setFullYear(_d.getFullYear() - 18);
    return _d;
  };

  const continueHandle = () => {
    loading.open();
    setInvalidFields([]);
    let invalid = [];
    if (firstName.current === null) invalid.push("firstName");
    if (lastName.current === null) invalid.push("lastName");
    if (activitySetting.current === null) invalid.push("activitySetting");
    if (username.current === null) invalid.push("username");
    if (birthday.current === null) invalid.push("birthday");
    if (invalid.length > 0) {
      setInvalidFields(invalid);
      loading.close();
      return;
    }
    const _data = {
      uid: data.uid,
      data: {
        first_name: firstName.current,
        last_name: lastName.current,
        username: username.current,
        activity_setting: activitySetting.current.value,
        birthday: birthday.current,
      },
    };
    createUserDoc(_data)
      .then((val) => {
        loading.close();
        console.log({
          ..._data,
          ...val,
        });
        dispatch(
          setUserInfo({
            ...data,
            ...val,
          })
        );
        toPage({
          toRoute: "profile",
          resetStack: true,
        });
      })
      .catch((error) => {
        console.error(error);
        loading.close();
      });
  };
  const layoutHandle = (val) => {
    console.log(val.nativeEvent.layout);
  };

  const backHandle = () => lastPage();
  const closeHandle = () =>
    toPage({ toRoute: "login_splash", resetStack: true });

  return (
    <NavigationPage style={{ ...style }} {...props}>
      <View style={styles.headerRow}>
        <Image
          style={styles.logo}
          source={require("../JungoMain.png")}
          resizeMode="contain"
        />
        <Pressable onPress={closeHandle} style={styles.closeContainer}>
          <View style={styles.close}>
            <CloseX strokeWidth={5} />
          </View>
        </Pressable>
      </View>
      <ScrollView style={styles.body}>
        <Pressable>
          <View style={styles.infoTextCont}>
            <Text style={styles.groupLabel}>
              We just need some more info to finish setting up your account.
            </Text>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.formSubgroup}>
              <Text style={styles.groupLabel}>Name</Text>
              <View style={styles.inputGroup}>
                <FormInput
                  placeholder="First"
                  fullWidth={false}
                  outerStyle={{ flex: 1, marginRight: 7.5 }}
                  style={styles.input}
                  onChangeText={setFirstName}
                />
                <FormInput
                  placeholder="Last"
                  fullWidth={false}
                  outerStyle={{ flex: 1, marginLeft: 7.5 }}
                  style={styles.input}
                  onChangeText={setLastName}
                />
              </View>
            </View>
            <View style={styles.formSubgroup}>
              <Text style={styles.groupLabel}>Birthday</Text>
              <View style={styles.inputGroup}>
                <FormDateInput
                  placeholder={placeholderDate()}
                  onChange={setBirthday}
                  style={styles.input}
                />
              </View>
            </View>
            <View style={styles.formSubgroup}>
              <Text style={styles.groupLabel}>Username</Text>
              <View style={styles.inputGroup}>
                <FormInput
                  placeholder={"foodlover1984"}
                  style={styles.input}
                  onChangeText={setUsername}
                />
              </View>
            </View>
            <View style={styles.formSubgroup}>
              <Text style={styles.groupLabel}>I am trying to...</Text>
              <FormRadioGroup
                items={GOAL_OPTIONS}
                onActiveChange={setActivitySetting}
              />
            </View>
          </View>
        </Pressable>
      </ScrollView>
      <View style={styles.floatingBtnRow} onLayout={layoutHandle}>
        <StatefulPressable
          style={styles.backBtnCont}
          pressingStyle={{ elevation: 2 }}
          onPress={backHandle}
        >
          <View style={styles.arrowSize}>
            <ContinueArrow style={{ transform: [{ rotate: "180deg" }] }} />
          </View>
        </StatefulPressable>
        <StatefulPressable
          style={styles.continueBtnCont}
          pressingStyle={{ elevation: 2 }}
          onPress={continueHandle}
        >
          <Text style={styles.btnText}>Continue</Text>
          <View style={styles.arrowSize}>
            <ContinueArrow />
          </View>
        </StatefulPressable>
      </View>
    </NavigationPage>
  );
}
