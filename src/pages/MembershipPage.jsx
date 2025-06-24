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

  return (
    <section className="membership-container">
      {/* 지도 */}
      <div style={{ flex: 1 }}>
        <Kakaomap radius={radius} onUpdateShops={setShopList} onMapLoad={setMapObj} />
      </div>
      {/* 리스트 */}
      <div className="map-info-wrapper">
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
        <div className="map-search">
          <input placeholder="내 주변 혜택을 검색해보세요!" />
          <IoIosSearch />
        </div>
        <ul>
          {shopList.map((shop, index) => (
            <li
              key={`${shop.id}_${index}`}
              onClick={() => {
                if (mapObj) {
                  mapObj.map.panTo(new mapObj.kakaoMaps.LatLng(shop.y, shop.x))
                }
              }}
            >
              {/* 브랜드 + 가게명 */}
              <div
                className="shop-info"
                style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
              >
                <img
                  src={shop.brandLogo}
                  alt={shop.place_name}
                  style={{ width: '36px', height: '36px', borderRadius: '4px' }}
                />
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{shop.place_name}</div>
                  <div style={{ color: '#555', fontSize: '14px' }}>
                    {shop.road_address_name || shop.address_name}
                  </div>
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
                <div style={{ fontSize: '13px', color: '#999' }}>혜택 {shop.benefitCnt}건</div>
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
