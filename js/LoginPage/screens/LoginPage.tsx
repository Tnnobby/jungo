import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../redux/reducers/userReducer";
import useAuth from "../../api/useAuth";
import LoginLayout from "./layout";
import { Keyboard } from 'react-native'
import { useAlert } from "../../hooks/useAlert";
import { LoginPageProps } from "../../../routes/LoginRouter";
import useLoading from "../../hooks/useLoading";


interface LoginMainPageProps extends LoginPageProps<'login-form'> {

}
export default function LoginMainPage({ navigation }: LoginMainPageProps) {  
  const { loginUser } = useAuth();
  const loading = useLoading()
  const { error } = useAlert()
  const dispatch = useDispatch();

  const onSubmit = ({ username, password }) => {
    loading.open()
    Keyboard.dismiss()
    loginUser({
      method: "email",
      email: username,
      password,
    })
      .then((val) => {
        val && dispatch(setUserInfo(val));
        loading.close()
        const parent = navigation.getParent()

        if (parent) parent.navigate('home')
      })
      .catch((e) => {
        switch (e.code) {
          case "auth/missing-email":
            error({key: e.code, message: 'No Email'})
            break;
          case "auth/invalid-email":
            error({key: e.code, message: 'Invalid Email'})
            break;
          case "auth/wrong-password":
            error({key: e.code, message: 'Incorrect Email or Password'})
            break;
          default:
            console.error(error);
            break;
        }
        loading.close()
      });
  };

  const closeHandle = () => {
    navigation.navigate('splash')
  }

  return (
    <LoginLayout
      login={true}
      welcomeMessage="It's nice to see you again."
      onSubmit={onSubmit}
      onClosePress={closeHandle}
    />
  );
}
