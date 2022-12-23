import { User } from "firebase/auth"
import { useContext, useEffect, useState } from 'react'
import useAuth from "../api/useAuth"
import useFirebase from "../api/useFirebase"
import { FirebaseContext, UserDoc } from "../context-providers/FirebaseProvider"

const withUser = (WrappedComponent: React.ElementType, uid?: string) => {
  return ({...props}) => {
    const [profileData, setProfileData] = useState<UserDoc>(null)
    const { user } = useFirebase()
    const { getUserInfo } = useAuth()

    // TODO : Test that this will correctly retrieve a user's profile.
    useEffect(() => {
      if (uid) getUserInfo(uid)
        .then(val => setProfileData(val as UserDoc))
    }, [])

    if (uid) return <WrappedComponent data={profileData} myProfile={false} {...props}/>
    if (user.hasDoc) return <WrappedComponent data={user.doc} myProfile={true} {...props}/>
    return 
  }
}

export default withUser