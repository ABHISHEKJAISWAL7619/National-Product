import WasteManagement from '@/components/pages/waste-management'
import MainLayout from '@/components/templates/templates/MainLayout'
import React from 'react'
const page = () => {
  return (
    <div>
      <MainLayout>
        <WasteManagement/>
      </MainLayout>
    </div>
  )
}

export default page
