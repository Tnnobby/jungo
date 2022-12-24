import { useContext } from 'react'
import { NavigationContext } from '../components/TransitionManager.old'

export const useNavigation = () => {
  const actions = useContext(NavigationContext)

  return {
    ...actions
  }
}