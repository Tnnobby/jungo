import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../redux/reducers/userReducer";

import useAuth from "../../api/useAuth";
import useLoading from "../../hooks/useLoading";
import { useNavigation } from "../../hooks/useNavigation";
import LoginLayout from "./layout";
import { Keyboard } from 'react-native'
import { useAlert } from "../../hooks/useAlert";

export default function LoginMainPage({ ...props }) {
  const { loginUser } = useAuth();
  const { toPage, lastPage, openLoading, dismissLoading } = useNavigation()
  const { error } = useAlert()
  const dispatch = useDispatch();

  const onSubmit = ({ email, password }) => {
    openLoading()
    Keyboard.dismiss()
    console.log(email)
    loginUser({
      method: "email",
      email,
      password,
    })
      .then((val) => {
        val && dispatch(setUserInfo(val));
        // console.log(val)
        dismissLoading()
        toPage({
          toRoute: 'profile',
          resetStack: true
        })
      })
      .catch((e) => {
        switch (e.code) {
          case "auth/missing-email":
            error({key: e.code, message: 'No Email'})
            break;
          case "auth/invalid-email":
            console.error("Invalid Email");
            break;
          case "auth/wrong-password":
            console.error("Invalid Password");
            break;
          default:
            console.error(error);
            break;
        }
        dismissLoading()
      });
  };

  return (
    <LoginLayout
      login={true}
      welcomeMessage="It's nice to see you again."
      onSubmit={onSubmit}
      {...props}
    />
  );
}
