type OutOptions = 'bottom' | 'top' | 'left' | 'right'
type SwipeDirections = 'swipeDown' | 'swipeUp' | 'swipeLeft' | 'swipeRight'

interface PageProps {
  transition: OutOptions | SwipeDirections
}
