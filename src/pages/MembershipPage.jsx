import React, { useState } from 'react'
import Kakaomap from '../components/MapSection/KakaoMap'
import '../styles/scss/MembershipPage.scss'
import MapInfoCard from '../components/MapSection/MapInfoCard'

const MembershipPage = () => {
  const [radius, setRadius] = useState(1000) // 1km
  const [gradeFilter, setGradeFilter] = useState('ALL') // 등급

  const [shopList, setShopList] = useState([])
  const [mapObj, setMapObj] = useState(null)
  const [markers, setMarkers] = useState([])

  const [selectedShopId, setSelectedShopId] = useState(null)
  const [currentInfoWindow, setCurrentInfoWindow] = useState(null)

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
          selectedShopId={selectedShopId}
          setSelectedShopId={setSelectedShopId}
          currentInfoWindow={currentInfoWindow}
          setCurrentInfoWindow={setCurrentInfoWindow}
          onUpdateShops={setShopList}
          onMapLoad={setMapObj}
          onMarkersUpdate={setMarkers}
          gradeFilter={gradeFilter}
        />
      </div>
      {/* 리스트 */}
      <MapInfoCard
        gradeFilter={gradeFilter}
        setGradeFilter={setGradeFilter}
        radius={radius}
        setRadius={setRadius}
        mapObj={mapObj}
        markers={markers}
        currentInfoWindow={currentInfoWindow}
        setCurrentInfoWindow={setCurrentInfoWindow}
        shopList={shopList}
      />
      <img className="map-upi" src="/map/mapUPI.png" alt="지도보는 유피" />
    </section>
  )
}

export default MembershipPage
