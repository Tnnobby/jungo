import { StyleSheet, Image, Pressable } from 'react-native'

const defaultPic = "https://m.media-amazon.com/images/M/MV5BNjZlODgzZTItZGRmYy00M2FhLWJjY2EtNjYyMzEzMWMwOWU2XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg"

const styles = StyleSheet.create({
  main: {
    borderRadius: 100,
    height: 48,
    width: 48,
    overflow: 'hidden',
    elevation: 5
  }
})

export default function ProfilePic ({...props}) {

  return (
    <Pressable style={styles.main} {...props}>
      <Image 
        source={{
          uri: defaultPic,
          height: 48,
          width: 48
        }}
      />
    </Pressable>
  )
}