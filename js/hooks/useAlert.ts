import { useContext } from 'react'
import { ErrorContext } from '../components/error-handler'
import { ErrorTemplate } from "../components/error-handler/types"

interface AlertProps {
  message: string;
  key: string;
}

export const useAlert = () => {
  const context = useContext(ErrorContext)
  
  const error = ({message, key}: AlertProps) => {
    console.log(message)
    console.log(key)
    context.alert({
      level: 'error',
      message,
      key
    })
  }

  return {
    error,
  }
}