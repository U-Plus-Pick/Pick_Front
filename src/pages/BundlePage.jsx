import React from 'react'
import BundleIntro from '../components/Bundle/BundleIntro'
import BundlePlans from '../components/Bundle/BundlePlan'
import BundleRole from '../components/Bundle/BundleRole'
import ApplyButton from '../components/Bundle/ApplyButton'
import BundleProcess from '../components/Bundle/BundleProcess'
import { Router, useNavigate } from 'react-router-dom'

const BundlePage = () => {
  const navigate = useNavigate()
  return (
    <div>
      <BundleIntro />
      <BundlePlans />
      <BundleRole />
      <BundleProcess />
      <ApplyButton onClick={() => navigate('/bundle/apply')} />
    </div>
  )
}

export default BundlePage
