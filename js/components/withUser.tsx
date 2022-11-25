import { User } from "firebase/auth"
import { useContext } from 'react'
import { FirebaseContext } from "../context-providers/FirebaseProvider"


const withUser = (WrappedComponent: React.ElementType) => {
  return ({...props}) => {
    const { user } = useContext(FirebaseContext)

    if (!user.hasDoc) return
    return (
      <WrappedComponent data={user.doc} {...props}/>
    )
  }
}

export default withUser