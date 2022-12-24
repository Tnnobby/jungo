import { useContext } from 'react'
import { ErrorContext } from '../components/error-handler'
import { ErrorTemplate } from "../components/error-handler/types"

interface AlertProps {
  message: string;
  key?: string;
}

export const useAlert = () => {
  const context = useContext(ErrorContext)
  
  const error = ({message, key}: AlertProps) => {
    context.alert({
      level: 'error',
      message,
      key: key || message.toLowerCase().split(' ').join('_')
    })
  }

  const alert = ({message, key}: AlertProps) => {
    context.alert({
      level: 'notice',
      message,
      key: key || message.toLowerCase().split(' ').join('_')
    })
  }

  return {
    error,
    alert
  }
}