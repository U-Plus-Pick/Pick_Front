import { useState, useEffect } from 'react'

export const useKakaoMapLoader = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (document.getElementById('kakao-map-script')) {
      setLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.id = 'kakao-map-script'
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false&libraries=services,clusterer`
    script.async = true
    script.onload = () => {
      window.kakao.maps.load(() => {
        setLoaded(true)
      })
    }

    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return loaded
}
