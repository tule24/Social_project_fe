import React, { useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight, BsCardImage } from 'react-icons/bs'

function Slider({ images }) {
  const [curIndex, setCurIndex] = useState(0)
  const prevSlide = () => {
    const isFirstSlide = curIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : curIndex - 1
    setCurIndex(newIndex)
  }
  const nextSlide = () => {
    const isLastSlide = curIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : curIndex + 1
    setCurIndex(newIndex)
  }
  return (
    <div
      style={{ backgroundImage: `url(${images[curIndex]})` }}
      className='rounded-lg bg-center bg-cover duration-500 relative w-full'
    >
      {images.length > 1 ? (
        <>
          <div className='absolute text-white right-5 top-5 flex items-center space-x-2 font-semibold'>
            <BsCardImage size={20} />
            <span>{images.length}</span>
          </div>
          <div className='group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactLeft onClick={prevSlide} size={30} />
          </div>
          <div className='group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactRight onClick={nextSlide} size={30} />
          </div>
        </>
      ) : ""}
    </div>
  )
}

export default Slider