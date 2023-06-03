import { MutableRefObject, useRef } from 'react'

const useRefScroll: () => [MutableRefObject<HTMLInputElement | null>, () => void] = () => {
  const ref = useRef<HTMLInputElement>(null)
  const onTriggerCallback = () => ref.current?.scrollIntoView()

  return [ref, onTriggerCallback]
}

export default useRefScroll
