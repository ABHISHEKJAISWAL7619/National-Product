import LowStocks from '@/components/pages/Home/LowStocks'
import MainLayout from '@/components/templates/templates/MainLayout'
import React from 'react'

const page = async({searchParams}) => {
    const {page} = await searchParams;
  return (
    <div>
      <MainLayout>
        <LowStocks page={page} />
      </MainLayout>
    </div>
  )
}

export default page
