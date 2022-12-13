import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AddRecipeStack } from "../../routes/AddRecipeRouter";
import { AddRecipeNavigationProp } from "../../routes/routes";
import { SmallHeader } from "../components/header";
import { SmallHeaderProps } from "../components/header/small";

export interface AddRecipeHeaderProps extends SmallHeaderProps {
  lastPage?: keyof AddRecipeStack;
}

const AddRecipeHeader: React.FC<AddRecipeHeaderProps> = ({
  lastPage,
  ...props
}) => {
  const navigation = useNavigation<AddRecipeNavigationProp>();

  const backHandle = () => {
    if (Boolean(lastPage)) navigation.navigate(lastPage);
  };

  const closeHandle = () => {
    Alert.alert(
      "Cancel Recipe Creation?",
      "This recipe will not be saved",
      [
        {
          text: "Continue",
          style: "cancel",
        },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            const parentNavigator = navigation.getParent();
            if (parentNavigator) parentNavigator.navigate("profile");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SmallHeader
      backButtonShown={Boolean(lastPage)}
      onBackPress={backHandle}
      headerText="Create Recipe"
      onClosePress={closeHandle}
      closeButtonShown={true}
      {...props}
    />
  );
};

export default AddRecipeHeader;
