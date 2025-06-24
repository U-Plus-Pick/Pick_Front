import React, { useEffect, useState } from 'react'
import { useKakaoMapLoader } from '../../hooks/useKakaoMapLoader'

export default function Kakaomap() {
  const loaded = useKakaoMapLoader()
  const [location, setLocation] = useState({ lat: 33.450701, lng: 126.570667 })
  // 내 위치 가져오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      error => {
        console.error('내 위치 가져오기 실패', error)
      }
    )
  }, [])
  // 가맹점 위치 찾기
  useEffect(() => {
    if (loaded && window.kakao && window.kakao.maps) {
      const mapContainer = document.getElementById('map')
      const mapOption = {
        center: new window.kakao.maps.LatLng(location.lat, location.lng),
        level: 2,
      }
      const map = new window.kakao.maps.Map(mapContainer, mapOption)
      // 현재 위치 마커
      const myMarker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(location.lat, location.lng),
        map: map,
      })

      // 혜택 가능한 브랜드명 리스트
      const membershipBrands = ['GS25', 'CGV']

      const ps = new window.kakao.maps.services.Places()

      membershipBrands.forEach(brand => {
        ps.keywordSearch(
          brand,
          (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              data.forEach(place => {
                const marker = new window.kakao.maps.Marker({
                  map: map,
                  position: new window.kakao.maps.LatLng(place.y, place.x),
                })

                const infowindow = new window.kakao.maps.InfoWindow({
                  content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
                })

                window.kakao.maps.event.addListener(marker, 'mouseover', () => {
                  infowindow.open(map, marker)
                })

                window.kakao.maps.event.addListener(marker, 'mouseout', () => {
                  infowindow.close()
                })
              })
            }
          },
          {
            location: new window.kakao.maps.LatLng(location.lat, location.lng),
            radius: 3000, // 3km 반경 검색
          }
        )
      })
    }
  }, [loaded, location])

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '90vh',
      }}
    ></div>
  )
}
