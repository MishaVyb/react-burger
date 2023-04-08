import { useRef } from 'react'

const useRefScroll = () => {
  const ref = useRef()
  const onTriggerCallback = () => ref.current.scrollIntoView()

  return [ref, onTriggerCallback]
}

export default useRefScroll
