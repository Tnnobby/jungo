import withUser from "./withUser";
import ProfilePage from "./ProfilePage";
import { RootPageProps } from "../../routes/routes";

type ProfilePageProps = RootPageProps<'profile'>

export default function Profile ({ navigation, route }: ProfilePageProps) {
  const uid = route?.params?.uid
  const ProfileWithUser = withUser(ProfilePage, uid)

  return <ProfileWithUser navigation={navigation}/>
}