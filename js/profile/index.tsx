import withUser from "../components/withUser";
import ProfilePage from "./ProfilePage";

export default function Profile (props) {
  const ProfileWithUser = withUser(ProfilePage)

  return <ProfileWithUser {...props}/>
}