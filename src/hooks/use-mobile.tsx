
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Check initial state
    checkMobile()
    
    // Listen for changes
    const onChange = () => checkMobile()
    mql.addEventListener("change", onChange)
    
    // Also listen to resize events for better compatibility
    window.addEventListener("resize", checkMobile)
    
    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return isMobile
}
