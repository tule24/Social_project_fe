import React from 'react'
import { AiFillLike, AiOutlineLike, AiOutlineComment } from 'react-icons/ai'
import { GiEarthAmerica } from 'react-icons/gi'
function Post() {
    return (
        <div className="flex flex-col w-full p-6 space-y-5 overflow-hidden rounded-lg my-shadow dark:bg-zinc-800 dark:text-gray-100">
            <div className="flex space-x-4">
                <img alt="" src="https://source.unsplash.com/100x100/?portrait" className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                <div className="flex flex-col space-y-1">
                    <a rel="noopener noreferrer" href="#" className="text-sm font-semibold">Leroy Jenkins</a>
                    <span className="text-xs dark:text-gray-400">4 hours ago</span>
                </div>
            </div>
            <div>
                <h2 className="mb-1 text-xl font-semibold">Nam cu platonem posidonium sanctus debitis te</h2>
                <p className="text-sm dark:text-gray-400">Eu qualisque aliquando mel, id lorem detraxit nec, ad elit minimum pri. Illum ipsum detracto ne cum. Mundi nemore te ius, vim ad illud atqui apeirian...</p>
                <img src="https://source.unsplash.com/random/100x100/?5" alt="" className="object-cover w-full mt-4 h-60 sm:h-96 dark:bg-gray-500" />
            </div>
            <hr className='border-black dark:border-gray-500'/>
            <div className="flex flex-wrap justify-between text-lg px-2">
                <div className="flex space-x-10 dark:text-gray-400">
                    <button className="flex items-center space-x-2">
                        <AiFillLike />
                        <span>283</span>
                    </button>
                    <button className="flex items-center space-x-2">
                        <AiOutlineComment />
                        <span>283</span>
                    </button>
                </div>
                <div className="flex space-x-2 dark:text-gray-400">
                    <button type="button" className="flex items-center space-x-1.5">
                        <GiEarthAmerica />
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Post