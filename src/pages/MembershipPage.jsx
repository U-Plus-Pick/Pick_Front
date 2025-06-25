import React, { useState } from 'react'
/* global kakao */
import Kakaomap from '../components/MapSection/KakaoMap'
import '../styles/scss/MembershipPage.scss'
import { IoIosSearch } from 'react-icons/io'
import { MdOutlineNavigateNext } from 'react-icons/md'

const MembershipPage = () => {
  const [radius, setRadius] = useState(1000) // 1km
  const [shopList, setShopList] = useState([])
  const [mapObj, setMapObj] = useState(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [markers, setMarkers] = useState([])
  const [currentInfoWindow, setCurrentInfoWindow] = useState(null)

  const searchShopList = shopList.filter(shop =>
    shop.place_name.toLowerCase().includes(searchKeyword.toLowerCase())
  )

  const levelMap = {
    500: 2,
    1000: 3,
    2000: 4,
    3000: 5,
  }

  return (
    <section className="membership-container">
      {/* 지도 */}
      <div className="map-wrapper">
        <Kakaomap
          radius={radius}
          level={levelMap[radius]}
          onUpdateShops={setShopList}
          onMapLoad={setMapObj}
          onMarkersUpdate={setMarkers}
        />
      </div>
      {/* 리스트 */}
      <div className="map-info-wrapper">
        <div className="map-search">
          <input
            placeholder="내 주변 혜택을 검색해보세요!"
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
          />
          <IoIosSearch />
        </div>
        <div className="info-title-item">
          <div>
            📍 <strong>[현재 위치]</strong> 기준 <br />
            <select value={radius} onChange={e => setRadius(Number(e.target.value))}>
              <option value={500}>500m</option>
              <option value={1000}>1km</option>
              <option value={2000}>2km</option>
              <option value={3000}>3km</option>
            </select>
            에서 받을 수 있는 혜택입니다
          </div>
        </div>
        <ul>
          {searchShopList.map((shop, index) => (
            <li
              key={`${shop.id}_${index}`}
              onClick={() => {
                if (mapObj) {
                  const moveLatLon = new mapObj.kakaoMaps.LatLng(shop.y, shop.x)
                  // 중앙 이동
                  mapObj.map.setCenter(moveLatLon)
                  const targetMarker = markers.find(m => m.place.id === shop.id)
                  if (targetMarker) {
                    if (currentInfoWindow) currentInfoWindow.close()
                    targetMarker.infowindow.open(mapObj.map, targetMarker.marker)
                    setCurrentInfoWindow(targetMarker.infowindow)
                  }
                }
              }}
            >
              {/* 브랜드 + 가게명 */}
              <div className="shop-info">
                <img
                  src={shop.brandLogo}
                  alt={shop.place_name}
                  style={{ width: '36px', height: '36px' }}
                />
                <div>
                  <div className="shop-name">{shop.place_name}</div>
                  <div className="shop-address">{shop.road_address_name || shop.address_name}</div>
                </div>
              </div>

              {/* 혜택 내용 */}
              <div
                style={{
                  fontSize: '14px',
                  color: '#333',
                  lineHeight: '1.4',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {shop.desc || '혜택 정보 준비중'}
              </div>

              {/* 하단: 혜택 개수 + 카카오맵 */}
              <div className="benefit-item">
                {/* <div>{shop.benefitCnt}</div> */}
                <button onClick={() => window.open(shop.place_url, '_blank')}>
                  <MdOutlineNavigateNext />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <img className="map-upi" src="/map/mapUPI.png" alt="지도보는 유피" />
    </section>
  )
}

export default MembershipPage
