import React from 'react'

function LoadingSpiner() {
    return (
        <div className='flex items-center justify-center'>
            <div className="w-4 h-4 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
        </div>
    )
}

export default LoadingSpiner