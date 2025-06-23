import React from 'react'

const MatchingGrid = ({ userStatus, partyMembers, apiUserName, maxPartySize = 5 }) => {
  const renderLeaderMatchingGrid = () => {
    const totalSlots = maxPartySize
    const filledSlots = 1 + partyMembers.length // 리더 1명 + 파티원들
    const emptySlots = totalSlots - filledSlots

    return (
      <div className="matching-grid">
        {/* 리더 (본인) */}
        <div className="member-card leader">
          <div className="crown-icon">👑</div>
          <span className="member-name">{apiUserName}</span>
        </div>

        {/* 파티원들 */}
        {partyMembers.map((member, index) => (
          <div className="member-card filled" key={index}>
            <span className="member-name">{member.name}</span>
          </div>
        ))}

        {/* 빈 슬롯들 */}
        {Array.from({ length: emptySlots }).map((_, index) => (
          <div className="member-card empty" key={`empty-${index}`}>
            <span className="member-name">매칭중</span>
          </div>
        ))}
      </div>
    )
  }

  const renderMemberMatchingGrid = () => {
    const totalSlots = maxPartySize
    const filledSlots = 1 + partyMembers.length // 본인 1명 + 다른 파티원들
    const emptySlots = totalSlots - filledSlots

    return (
      <div className="matching-grid">
        {/* 다른 파티원들 */}
        {partyMembers.map((member, index) => (
          <div className="member-card filled" key={index}>
            {member.role === 'leader' && <div className="crown-icon">👑</div>}
            <span className="member-name">{member.name}</span>
          </div>
        ))}

        {/* 본인 */}
        <div className="member-card filled current-user">
          <span className="member-name">{apiUserName}</span>
        </div>

        {/* 빈 슬롯들 */}
        {Array.from({ length: emptySlots }).map((_, index) => (
          <div className="member-card empty" key={`empty-${index}`}>
            <span className="member-name">매칭중</span>
          </div>
        ))}
      </div>
    )
  }

  if (userStatus === 'leader') {
    return renderLeaderMatchingGrid()
  } else {
    return renderMemberMatchingGrid()
  }
}

export default MatchingGrid
