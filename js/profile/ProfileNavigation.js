import { Dimensions, StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
  navMain:{
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'white'
  },
  backText:{
    fontSize: 22
  }
})

export default function ProfileNavigation (props) {
  return (
    <View 
    style={{
      ...styles.navMain,
      width: Dimensions.get('window').width,
    }}
    >
      <Text style={styles.backText}>Back</Text>
    </View>
  )
}