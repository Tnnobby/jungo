import { View, StyleSheet } from 'react-native'
import StatefulPressable from '../StatefulPressable'

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#EAEAEA',
    borderRadius: 100,
    height: 38,
    width: 38,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default function CircleButton ({icon, style = {}, ...props}) {
  return (
    <StatefulPressable style={{...styles.main, ...style}} {...props}>
      {icon && icon}
    </StatefulPressable>
  )
}