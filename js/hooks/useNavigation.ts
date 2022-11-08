import { useContext } from 'react'
import { NavigationContext } from '../components/TransitionManager'

export const useNavigation = () => {
  const actions = useContext(NavigationContext)

  return {
    ...actions
  }
}