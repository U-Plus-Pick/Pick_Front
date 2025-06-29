import React, { useEffect, useState } from 'react'
import { useKakaoMapLoader } from '../../hooks/useKakaoMapLoader'
import { membershipBrands } from '../../constants/MembershipData'

export default function Kakaomap({
  radius,
  level,
  selectedShopId,
  setSelectedShopId,
  currentInfoWindow,
  setCurrentInfoWindow,
  onUpdateShops,
  onMapLoad,
  onMarkersUpdate,
  gradeFilter,
}) {
  const loaded = useKakaoMapLoader()
  const [location, setLocation] = useState({ lat: 37.530881, lng: 126.973491 })
  const [markers, setMarkers] = useState([])

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
        level: level,
      }
      const map = new window.kakao.maps.Map(mapContainer, mapOption)

      if (onMapLoad) {
        onMapLoad({
          map,
          kakaoMaps: window.kakao.maps,
        })
      }

      // 현재 위치 마커
      const markerImage = new window.kakao.maps.MarkerImage(
        '/map/me.png',
        new window.kakao.maps.Size(70, 70),
        { offset: new window.kakao.maps.Point(20, 40) }
      )
      new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(location.lat, location.lng),
        map: map,
        image: markerImage,
      })

      // 검색 결과 누적 초기화
      if (onUpdateShops) {
        onUpdateShops([])
      }
      setMarkers([])

      // 혜택 가능한 브랜드명 리스트
      const ps = new window.kakao.maps.services.Places()

      membershipBrands
        .filter(brand => gradeFilter === 'ALL' || brand.membership_grade_list.includes(gradeFilter))
        .forEach(brand => {
          ps.keywordSearch(
            brand.membership_brand,
            (data, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const targetItem =
                  gradeFilter === 'ALL'
                    ? brand.items[0]
                    : brand.items.find(i =>
                        i.membership_tap.includes(gradeFilter === 'VIP' ? 'VIP' : '기본')
                      )

                const desc = targetItem?.membership_description || ''
                const logo = brand.logo || '/map/default_logo.png'

                if (onUpdateShops) {
                  onUpdateShops(prev => [
                    ...prev,
                    ...data.map(place => ({
                      ...place,
                      brandLogo: logo,
                      desc,
                      benefitCnt: brand.count,
                    })),
                  ])
                }

                const MarkerLogoImage = new window.kakao.maps.MarkerImage(
                  logo,
                  new window.kakao.maps.Size(50, 50),
                  { offset: new window.kakao.maps.Point(25, 50) }
                )

                data.forEach(place => {
                  const marker = new window.kakao.maps.Marker({
                    map: map,
                    position: new window.kakao.maps.LatLng(place.y, place.x),
                    image: MarkerLogoImage,
                  })

                  const benefitHtml = brand.items
                    .map(item => {
                      const tagClass = item.membership_tap.includes('VIP')
                        ? 'infowindow-tag-vip'
                        : 'infowindow-tag-basic'

                      const lines = item.membership_description.split('\n')
                      const descHtml = lines.map(line => `<div>${line}</div>`).join('')

                      return `
                        <div class="infowindow-benefit-item">
                          <span class="${tagClass}">${item.membership_tap}</span>
                          <div class="infowindow-benefit-desc">${descHtml}</div>
                        </div>
                      `
                    })
                    .join('')

                  const customOverlay = new window.kakao.maps.CustomOverlay({
                    position: new window.kakao.maps.LatLng(place.y, place.x),
                    content: `
                      <div class="custom-infowindow">
                        <div class="custom-infowindow-brand">${brand.membership_brand}</div>
                        <div class="custom-infowindow-benefits">${benefitHtml}</div>
                      </div>
                    `,
                    xAnchor: 0.5,
                    yAnchor: 1.3,
                  })

                  // 마우스 오버
                  window.kakao.maps.event.addListener(marker, 'mouseover', () => {
                    customOverlay.setMap(map)
                  })

                  // 마우스 아웃
                  window.kakao.maps.event.addListener(marker, 'mouseout', () => {
                    customOverlay.setMap(null)
                  })

                  // 클릭 이벤트
                  window.kakao.maps.event.addListener(marker, 'click', () => {
                    if (selectedShopId === place.id) {
                      if (currentInfoWindow) {
                        currentInfoWindow.setMap(null)
                      }

                      setSelectedShopId(null)
                      setCurrentInfoWindow(null)
                      return
                    }

                    if (currentInfoWindow) {
                      currentInfoWindow.setMap(null)
                    }

                    customOverlay.setMap(map)
                    setSelectedShopId(place.id)
                    setCurrentInfoWindow(customOverlay)
                  })

                  setMarkers(prev => [
                    ...prev,
                    {
                      marker,
                      overlay: customOverlay,
                      place,
                    },
                  ])
                })
              }
            },
            {
              location: new window.kakao.maps.LatLng(location.lat, location.lng),
              radius: radius,
            }
          )
        })
    }
  }, [loaded, location, radius, gradeFilter])

  useEffect(() => {
    if (onMarkersUpdate) {
      onMarkersUpdate(markers)
    }
  }, [markers, onMarkersUpdate])

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '100%',
      }}
    ></div>
  )
}
