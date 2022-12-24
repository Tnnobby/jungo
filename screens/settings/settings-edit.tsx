import { StyleSheet, View } from 'react-native'
import { FormRadioGroup } from '../../js/components/form/FormRadioGroup';
import { Header } from '../../js/components/header';
import NavigationPage from "../../js/components/NavigationPage";
import { RootPageProps } from "../../routes/routes";

interface SettingsEditProps extends RootPageProps<"settings-edit"> {}

export const SettingsEdit: React.FC<SettingsEditProps> = ({
  navigation,
  route,
}) => {
  const { type, data, setting } = route.params

  return (
    <NavigationPage>
      <Header backButtonShown={true} headerText={setting}/>
      <View style={styles.page}>
        <FormRadioGroup items={data}/>
      </View>
    </NavigationPage>
  )
};

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20,
    paddingBottom: 20
  }
})
