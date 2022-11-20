import { useState, useEffect, useCallback } from 'react'

const useElementSize = (elementRef) => {
    const [elementSize, setElementSize] = useState({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
    })

    const observer = useCallback(
        () =>
            elementRef?.current &&
            setElementSize({
                width: elementRef.current.offsetWidth,
                height: elementRef.current.offsetHeight,
                top: Math.ceil(elementRef.current.getBoundingClientRect().y),
                left: Math.ceil(elementRef.current.getBoundingClientRect().x),
            }),
        [elementRef]
    )

    useEffect(() => {
        observer()
        window.addEventListener('resize', observer)
        return () => window.removeEventListener('resize', observer)
    }, [elementRef])

    return elementSize
}

export default useElementSize
