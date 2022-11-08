import { useContext } from 'react'
import { ErrorContext } from '../components/ErrorHandler'
import { ErrorTemplate } from "../components/ErrorHandler/types"

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