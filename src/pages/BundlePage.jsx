import React from 'react'
import BundleIntro from '../components/Bundle/BundleIntro'
import BundlePlans from '../components/Bundle/BundlePlan'
import BundleRole from '../components/Bundle/BundleRole'
import ApplyButton from '../components/Bundle/ApplyButton'

const BundlePage = () => {
  return (
    <div>
      <BundleIntro />
      <BundlePlans />
      <BundleRole />
      <ApplyButton onClick={() => console.log('신청하기 클릭')} />
    </div>
  )
}

export default BundlePage
