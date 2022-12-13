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
import { useLoginContext } from "../../context-providers/LoginContextType";
import { LoginPageProps } from "../../../routes/routes";
import useAuth from "../../api/useAuth";
import FormDateInput from "../../components/form/FormDateInput";
import FormInput from "../../components/form/FormInput";
import { FormRadioGroup } from "../../components/form/FormRadioGroup";
import NavigationPage from "../../components/NavigationPage";
import StatefulPressable from "../../components/StatefulPressable";
import { colors } from "../../constants";
import useLoading from "../../hooks/useLoading";
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
    backgroundColor: colors.button_color,
    borderRadius: 100,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  continueBtnCont: {
    flexDirection: "row",
    backgroundColor: colors.button_color,
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

type UserInfoPageProps = LoginPageProps<"signup-info">;

const UserInfoPage: React.FC<UserInfoPageProps> = ({ navigation, route }) => {
  const {
    user,
    activitySetting,
    birthday,
    firstName,
    lastName,
    username,
    invalidFields,
    setActivitySetting,
    setBirthday,
    setFirstName,
    setLastName,
    setUsername,
  } = useLoginContext();

  const { createUserDoc } = useAuth();
  const loading = useLoading();
  const dispatch = useDispatch();
  console.log("In UserInfoPage");

  const placeholderDate: () => Date = () => {
    const _d = new Date();
    _d.setFullYear(_d.getFullYear() - 18);
    return _d;
  };

  const continueHandle = () => {
    loading.open();
    if (invalidFields.length > 0) {
      loading.close();
      return;
    }
    const _data = {
      uid: user.uid,
      data: {
        first_name: firstName,
        last_name: lastName,
        username: username,
        activity_setting: activitySetting.value,
        birthday: birthday,
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
            ...user,
            ...val,
          })
        );
        navigation.getParent().navigate("home");
      })
      .catch((error) => {
        console.error(error);
        loading.close();
      });
  };
  const layoutHandle = (val) => {
    console.log(val.nativeEvent.layout);
  };

  const backHandle = () => navigation.goBack();
  const closeHandle = () => navigation.navigate("splash");

  return (
    <NavigationPage>
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
                {/* TODO : Fix this, probably need to refactor FormDateInput a bit */}
                <FormDateInput
                  value={birthday}
                  placeholder={placeholderDate()}
                  onChange={setBirthday}
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
      <View style={styles.floatingBtnRow}>
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
};

export default UserInfoPage;
