import React, { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { MdOutlineNavigateNext } from 'react-icons/md'

const MapInfoCard = ({
  gradeFilter,
  setGradeFilter,
  radius,
  setRadius,
  mapObj,
  markers,
  currentInfoWindow,
  setCurrentInfoWindow,
  shopList,
}) => {
  const [searchKeyword, setSearchKeyword] = useState('')

  const searchShopList = shopList.filter(shop =>
    shop.place_name.toLowerCase().includes(searchKeyword.toLowerCase())
  )

  return (
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
          📍 <strong>[현재 위치]</strong> <br />
          <select value={gradeFilter} onChange={e => setGradeFilter(e.target.value)}>
            <option value="ALL">ALL</option>
            <option value="VIP">VIP</option>
            <option value="BASIC">BASIC</option>
          </select>
          혜택 중{' '}
          <select value={radius} onChange={e => setRadius(Number(e.target.value))}>
            <option value={500}>500m</option>
            <option value={1000}>1km</option>
            <option value={2000}>2km</option>
            <option value={3000}>3km</option>
          </select>
          내 에서
          <br /> 받을 수 있는 혜택입니다
        </div>
      </div>
      <ul>
        {searchShopList.map((shop, index) => (
          <li
            key={`${shop.id}_${index}`}
            onClick={() => {
              if (mapObj) {
                const moveLatLon = new mapObj.kakaoMaps.LatLng(shop.y, shop.x)
                mapObj.map.setCenter(moveLatLon) // 중앙으로 이동
                const targetMarker = markers.find(m => m.place.id === shop.id)
                if (targetMarker) {
                  if (currentInfoWindow) currentInfoWindow.setMap(null)
                  targetMarker.overlay.setMap(mapObj.map)
                  setCurrentInfoWindow(targetMarker.overlay)
                }
              }
            }}
          >
            {/* 브랜드 + 가게명 */}
            <div className="shop-info">
              <img
                src={shop.brandLogo}
                alt="로고 준비중"
                style={{ width: '36px', height: '36px', objectFit: 'cover' }}
              />
              <div>
                <div className="shop-name">{shop.place_name}</div>
                <div className="shop-address">{shop.road_address_name || shop.address_name}</div>
              </div>
            </div>

            {/* 혜택 내용 */}
            <div className="benefit-desc">{shop.desc || '혜택 정보 준비중'}</div>

            {/* 카카오맵 이동 */}
            <div className="benefit-item">
              <button onClick={() => window.open(shop.place_url, '_blank')}>
                <MdOutlineNavigateNext />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MapInfoCard
