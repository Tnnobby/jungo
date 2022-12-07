/**
 * warning: yellow, nonbreaking warnings
 * notice: informational
 * error: red, breaking errors
 */
type ErrorLevel = "warning" | "notice" | "error";

interface ErrorTemplate {
  level: ErrorLevel;
  message: string;
  key: string;
}

interface ErrorContextProps {
  alert: (error: ErrorTemplate) => void
}

export { ErrorLevel, ErrorTemplate, ErrorContextProps };
