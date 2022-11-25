import withUser from "../components/withUser";
import ProfilePage from "./ProfilePage";

export default function Profile () {
  const ProfileWithUser = withUser(ProfilePage)

  return <ProfileWithUser />
}