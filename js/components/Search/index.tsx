import { useRef } from 'react'
import { View, StyleSheet, Animated, TextInput, TextInputProps, Pressable } from 'react-native'
import SearchIcon from '../../svg/jsx/Search';

const styles = StyleSheet.create({
  main: {
    borderRadius: 100,
    width: '100%',
    paddingVertical: 8,
    backgroundColor: '#EAEAEA',
    flexDirection: 'row',
    paddingHorizontal: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },
  input: {
    // backgroundColor: 'red',
    width: '100%',
    fontSize: 16,
    color: 'black'
  },
  iconCont: {
    height: 20,
    width: 20,
    marginRight: 8
  }
})

interface SearchProps extends TextInputProps {}

export default function Search ({placeholder = 'Apple Crisp', ...props}: SearchProps) {
  return (
    <Pressable style={styles.main} >
      <View style={styles.iconCont}>
        <SearchIcon />
      </View>
      <TextInput style={styles.input} placeholder={placeholder} {...props}/>
    </Pressable>
  )
}