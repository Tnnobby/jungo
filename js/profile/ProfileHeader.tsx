import { Image, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { FollowButton } from "./FollowButton";
import NotificationButton from "./NotificationButton";
import { useAssets } from "expo-asset";

const styles = StyleSheet.create({
  columnHead: {
    flexDirection: "column",
  },
  headerMain: {
    paddingTop: 10,
    paddingLeft: 22,
    paddingRight: 22,
    flex: 1,
    flexDirection: "row",
  },
  username: {
    fontSize: 28,
    // marginTop: -15,
    fontFamily: "Rubik_600",
  },
  profilePic: {
    borderRadius: 100,
    height: 76,
    width: 76,
  },
  imageContainer: {
    marginRight: 10,
  },
  rightContainer: {
    flex: 1,
    flexDirection: "column",
  },
  rightUpper: {
    minHeight: 76,
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "Rubik_400",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  detailText: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "Rubik_400",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 0,
  },
  notificationContainer: {
    marginRight: 5,
  },
});

interface ProfileHeaderProps {
  profilePicUrl?: string;
  bio?: string;
  firstName: string;
  lastName: string;
}

export default function ProfileHeader({
  profilePicUrl,
  bio = "",
  firstName,
  lastName,
}: ProfileHeaderProps) {
  const [following, setFollowing] = useState<boolean>(false); // <- Need following in userDoc
  const [notifications, setNotifications] = useState<boolean>(false); // <- Need notifications in userDoc
  const [assets, error] = useAssets(
    require(`../../assets/profile-pics/avatar-1.png`)
  );

  const onFollowPress = () => setFollowing(!following);

  const onNotificationPress = () => setNotifications(!notifications);

  return (
    <View style={styles.columnHead}>
      <View style={styles.headerMain}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.profilePic}
            source={
              profilePicUrl
                ? {
                    uri: profilePicUrl,
                  }
                : assets && assets[0]
            }
          />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.rightUpper}>
            <Text style={styles.username}>{`${firstName} ${lastName}`}</Text>
            <Text style={styles.bio}>{bio}</Text>
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.detailContainer}>
              <Text style={styles.detailText}>{`100 Followers`}</Text>
              <Text style={styles.detailText}>{`36 Recipes`}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.notificationContainer}>
                <NotificationButton
                  onPress={onNotificationPress}
                  active={notifications}
                />
              </View>
              <FollowButton onPress={onFollowPress} active={following} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
