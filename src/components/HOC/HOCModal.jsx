import React, { useContext, useEffect } from 'react'
import { SocialContext } from '@/context'
function HOCModal() {
    const { modal, setModal } = useContext(SocialContext)
    const { open, component } = modal
    useEffect(() => {
        if (open) {
            document.body.style.position = 'fixed'
            return () => document.body.style.position = 'relative'
        }
    }, [open])
    return open && (
        <div className='fixed top-0 left-0 right-0 h-screen flex justify-center items-center bg-black bg-opacity-50 z-50'>
            <div className='xl:w-[80%] h-[90%] w-[95%]'>
                {component}
            </div>
        </div >
    )
}

export default HOCModal