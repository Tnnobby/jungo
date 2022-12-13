import { View, StyleSheet, Text, Animated, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "../../hooks/useNavigation";
import NotificationBell from "../../svg/jsx/NotificationBell";
import SearchIcon from "../../svg/jsx/Search";
import { CircleButton } from "../buttons";
import ProfilePic from "../ProfilePic";
import { TransitionBuilder } from "../TransitionManager/transition";

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    borderColor: "transparent",
  },
  row: {
    flexDirection: "row",
    height: 70,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  searchCont: {
    height: 21,
    width: 21,
  },
  notificationCont: {
    height: 20,
    width: 20,
  },
  endGroup: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  frontGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  headerText: {
    fontFamily: "Rubik_500",
    fontSize: 34,
    paddingLeft: 10,
  },
});

type LargeHeaderProps = {
  
}

export default function LargeHeader({
  style,
  headerText,
  profilePic,
  onProfilePicPress,
  searchButton,
  onSearchPress = () => {},
  onNotificationPress = () => {},
  notificationButton,
  navColor = undefined,
  ...props
}) {
  const insets = useSafeAreaInsets();

  return (
    <Animated.View style={[style, styles.main]}>
      {navColor && (
        <View style={{ height: insets.top, backgroundColor: navColor }} />
      )}
      <View style={styles.row}>
        <View style={styles.frontGroup}>
          {profilePic && (
            <ProfilePic onPress={onProfilePicPress} />
          )}
          {headerText && <Text style={styles.headerText}>{headerText}</Text>}
        </View>
        <View style={styles.endGroup}>
          {notificationButton && (
            <CircleButton
              icon={
                <View style={styles.notificationCont}>
                  <NotificationBell fill="black" />
                </View>
              }
              onPress={onNotificationPress}
            />
          )}
          {searchButton && (
            <CircleButton
              style={{ marginLeft: 10 }}
              icon={
                <View style={styles.searchCont}>
                  <SearchIcon />
                </View>
              }
              onPress={onSearchPress}
            />
          )}
        </View>
      </View>
    </Animated.View>
  );
}
