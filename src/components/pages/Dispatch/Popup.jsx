import React from 'react'

const Popup = () => {
  return (
    <div className='h-[239px] w-[519px]'>
        <div className='h-[108px] w-[419px]'>
            <div className='font-inter font-medium text-[14px] leading-[100%] tracking-[0px]'>
            <h1 className='text-[#0077B6]'>Name</h1>
            <p className='text-[#0F1417]'>Product Name-01</p>
        </div>
        <div className='font-inter font-medium text-[14px] leading-[100%] tracking-[0px]'>
            <h1 className='text-[#0077B6]'>Quantity</h1>
            <p className='text-[#0F1417]'>Available Qty</p>
        </div>
        <div>
            <h1 className='font-inter font-medium text-[14px] leading-[100%] tracking-[0px] text-[#0077B6]'>Enter Quantity</h1>
            <input type="no" />
        </div>
        </div>
        <div className='w-[419px] h-[43px]'>
            <button>Update to card</button>
        </div>
      
    </div>
  )
}

export default Popup
