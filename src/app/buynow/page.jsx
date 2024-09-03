"use client"
import { useContextApi } from '@/context/context'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

const BuyNow = () => {
  const {buyNowItems,setBuyNowItems}=useContextApi();
  const router=useRouter();
  useEffect(()=>{
    console.log(buyNowItems)
  },[buyNowItems])

  if(!buyNowItems)
  {
    router.back();
  }
  return (
    <div>BuyNow</div>
  )
}

export default BuyNow