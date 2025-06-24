import React, { useState } from 'react'
import Kakaomap from '../components/MapSection/KakaoMap'
import '../styles/scss/MembershipPage.scss'
const MembershipPage = () => {
  const [radius, setRadius] = useState(1000) // 1km
  const [shopList, setShopList] = useState([])

  return (
    <section>
      {/* 지도 */}
      <div style={{ flex: 1 }}>
        <Kakaomap radius={radius} onUpdateShops={setShopList} />
      </div>
      {/* 리스트 */}
      <div className="map-info-wrapper">
        <div className="info-title-item">
          <div>
            📍 <strong>[현재 위치]</strong> 기준 <br />이 근처에서 받을 수 있는 혜택입니다
          </div>
          <div>
            <select value={radius} onChange={e => setRadius(Number(e.target.value))}>
              <option value={500}>500m</option>
              <option value={1000}>1km</option>
              <option value={2000}>2km</option>
              <option value={3000}>3km</option>
            </select>
          </div>
        </div>
        <input />
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>혜택 리스트</div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {shopList.map(shop => (
            <li key={shop.id} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              {shop.place_name} - 혜택 정보
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default MembershipPage
