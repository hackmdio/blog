import { useEffect, useRef, useState } from 'react'

/**
 * A custom hook that returns a tuple with a state value, a function to set the state value, and a ref object that holds the latest state value.
 *
 * @template T - The type of the initial state.
 * @param {T} initialValue - The initial state value.
 * @return {[T, React.Dispatch<React.SetStateAction<T>>, React.MutableRefObject<T>]} - A tuple with the state value, the state-setting function and the state ref object.
 */
export const useStateRef = (initialValue) => {
  const [value, setValue] = useState(initialValue)
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return [value, setValue, ref]
}
