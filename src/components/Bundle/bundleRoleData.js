import RoleCommon1 from '../../assets/BundleRoleData/RoleCommon1.png'
import RoleCommon2 from '../../assets/BundleRoleData/RoleCommon2.png'
import RoleCommon3 from '../../assets/BundleRoleData/RoleCommon3.png'
import RoleCommon4 from '../../assets/BundleRoleData/RoleCommon4.png'
import RoleCommon5 from '../../assets/BundleRoleData/RoleCommon5.png'
import RoleHost1 from '../../assets/BundleRoleData/RoleHost1.png'
import RoleHost2 from '../../assets/BundleRoleData/RoleHost2.png'
import RoleHost3 from '../../assets/BundleRoleData/RoleHost3.png'
import RoleHost4 from '../../assets/BundleRoleData/RoleHost4.png'
import RoleHost5 from '../../assets/BundleRoleData/RoleHost5.png'
import RoleMember1 from '../../assets/BundleRoleData/RoleMember1.png'

export const bundleRoleData = {
  host: [
    // 공통
    {
      title: '요금 할인',
      desc: '결합 서비스 이용 시시 매 월 2만원을 \n할인 받을 수 있습니다.',
      img: RoleCommon1,
      type: 'common',
    },
    {
      title: '자동 매칭',
      desc: '결합 신청 시 5명씩 유플픽에서 \n자동으로 매칭 해드립니다.',
      img: RoleCommon2,
      type: 'common',
    },
    {
      title: '서비스 이용료',
      desc: '매 달 2000원의 \n서비스 이용료가 부과됩니다.',
      img: RoleCommon3,
      type: 'common',
    },
    {
      title: '결합 해체',
      desc: '결합원이 4명 이하로 감소 또는 결합 대표 탈퇴 시 결합은 자동 해지 됩니다.',
      img: RoleCommon4,
      type: 'common',
    },
    {
      title: '우선권 보장',
      desc: '결합이 해체 된 결합원은 우선적으로 다른 결합에 배치해드립니다.',
      img: RoleCommon5,
      type: 'common',
    },
    // host 전용
    {
      title: '결합 대표 결제',
      desc: '파티원들의 요금을 \n포함한 요금을 대표자가 결제합니다.',
      img: RoleHost1,
      type: 'host',
    },
    {
      title: '수수료 할인',
      desc: '결합 대표를 선택하시면 서비스 \n이용료의 50%를 할인해드립니다.',
      img: RoleHost2,
      type: 'host',
    },
    {
      title: '납부 확인서 제출',
      desc: '매달 1일 ~ 3일 마이페이지를 통해 \n납부 확인서를 제출합니다.',
      img: RoleHost3,
      type: 'host',
    },
    {
      title: '환급 일시',
      desc: '전체 요금 결제 후 다음 달 1일에 \n정산금이 환급 됩니다.',
      img: RoleHost4,
      type: 'host',
    },
    {
      title: '서비스 신청',
      desc: '파티원이 모였을 때, 파티장은 투게더 \n결합 전화 신청을 진행해야 합니다.',
      img: RoleHost5,
      type: 'host',
    },
  ],
  member: [
    //공통
    {
      title: '요금 할인',
      desc: '결합 서비스 이용 시시 매 월 2만원을 \n할인 받을 수 있습니다.',
      img: RoleCommon1,
      type: 'common',
    },
    {
      title: '자동 매칭',
      desc: '결합 신청 시 5명씩 유플픽에서 \n자동으로 매칭 해드립니다.',
      img: RoleCommon2,
      type: 'common',
    },
    {
      title: '서비스 이용료',
      desc: '매 달 2000원의 \n서비스 이용료가 부과됩니다.',
      img: RoleCommon3,
      type: 'common',
    },
    {
      title: '결합 해체',
      desc: '결합원이 4명 이하로 감소 또는 결합 대표 탈퇴 시 결합은 자동 해지 됩니다.',
      img: RoleCommon4,
      type: 'common',
    },
    {
      title: '우선권 보장',
      desc: '결합이 해체 된 결합원은 우선적으로 다른 결합에 배치해드립니다.',
      img: RoleCommon5,
      type: 'common',
    },

    // member 전용
    {
      title: '결제 방법',
      desc: '서비스 이용료 및 요금 결제는 \n마이페이지를 통해 결제합니다.',
      img: RoleMember1,
      type: 'member',
    },
    {
      title: '청구서 제출',
      desc: '매 달 1일 ~ 3일 마이페이지를 통해 \n청구서를 제출합니다.',
      img: RoleHost3,
      type: 'member',
    },
  ],
}
