import Composition1 from '@/components/pages/WIP/Composition1'
import Compositionprogram from '@/components/pages/WIP/Compositionprogram'
import MainLayout from '@/components/templates/templates/MainLayout'
import React from 'react'

const page = () => {
  return (
    <div>
      <MainLayout>
        <Compositionprogram/>
        <Composition1/>
      </MainLayout>
    </div>
  )
}

export default page
