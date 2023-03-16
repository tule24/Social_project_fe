import React from 'react'
import { BsSun, BsCloudSun, BsCloudRainHeavy, BsCloudRain, BsCloudLightningRain, BsCloudMinus } from 'react-icons/bs'
function Weather() {
    return (
        <div className="max-w-md p-4 mx-auto rounded-lg dark:text-gray-100 dark:bg-zinc-800 my-shadow">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-center space-y-2">
                    <BsSun size={50} color='orange'/>
                    <h1 className="font-semibold">Ho Chi Minh City</h1>
                </div>
                <div className='flex flex-col items-center space-y-2'>
                    <span className="font-bold text-2xl">Today</span>
                    <span className="font-bold text-4xl">14°</span>
                </div>
            </div>
            <div className="flex justify-between mt-8 dark:text-gray-400">
                <div className="flex flex-col items-center space-y-1">
                    <span className="uppercase font-semibold">mon</span>
                    <BsSun />
                    <span>31°</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                    <span className="uppercase font-semibold">tue</span>
                    <BsCloudSun />
                    <span>21°</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                    <span className="uppercase font-semibold">wed</span>
                    <BsCloudRainHeavy />
                    <span>31°</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                    <span className="uppercase font-semibold">thu</span>
                    <BsCloudRain />
                    <span>25°</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                    <span className="uppercase font-semibold">fri</span>
                    <BsCloudLightningRain />
                    <span>27°</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                    <span className="uppercase font-semibold">sta</span>
                    <BsCloudMinus />
                    <span>30°</span>
                </div>
            </div>
        </div>

    )
}

export default Weather