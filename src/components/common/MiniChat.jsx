import React, { useContext } from 'react'
import { BsSendFill } from 'react-icons/bs'
import { GrClose } from 'react-icons/gr'
import { SocialContext } from '@/context'

function MiniChat() {
  const { miniChat, setMiniChat } = useContext(SocialContext)
  const closeChat = (id) => {
    const newMiniChat = miniChat.filter(el => el._id !== id)
    setMiniChat([...newMiniChat])
  }
  return (
    <>
      {
        miniChat.map(chat => {
          return <div className='fixed bottom-5 w-max right-[20%] flex justify-end space-x-2' key={chat._id}>
            <div className='h-[50vh] w-[20rem] bg-white dark:bg-zinc-700 dark:text-white rounded-lg my-shadow flex flex-col overflow-hidden'>
              <div className='w-full bg-blue-500 dark:bg-zinc-900 flex justify-between items-center px-2 py-1 h-[15%]'>
                <div className="flex space-x-1 items-center">
                  <img alt="ava" src={chat.ava} className="object-cover w-10 h-10 rounded-full shadow dark:bg-gray-500" />
                  <p className="font-semibold capitalize">{chat.name}</p>
                </div>
                <GrClose size={20} className='cursor-pointer' onClick={() => closeChat(chat._id)}/>
              </div>
              <div className='h-[77%] overflow-auto p-2 space-y-5'>
                <div className='flex items-end text-sm'>
                  <img src="https://i.pravatar.cc/?img=69" alt="ava" className="object-cover w-8 h-8 rounded-full shadow dark:bg-gray-500 mr-1" />
                  <div className='w-[80%] space-y-1'>
                    <p className='bg-slate-200 dark:bg-slate-900 py-1 px-2 rounded-md break-words'>
                      adadasdasdasdasdlashdasdasjdklhasdasds
                    </p>
                    <p className='bg-slate-200 dark:bg-slate-900 py-1 px-2 rounded-md break-words'>
                      adadasdasdasdasdlashdasdasjdklhasdasds
                    </p>
                  </div>
                </div>
                <div className='flex items-end text-sm justify-end'>
                  <div className='w-[80%] space-y-1'>
                    <p className='bg-slate-200 dark:bg-slate-900 py-1 px-2 rounded-md break-words'>
                      adadasdasdasdasdlashdasdasjdklhasdasds
                    </p>
                    <p className='bg-slate-200 dark:bg-slate-900 py-1 px-2 rounded-md break-words'>
                      adadasdasdasdasdlashdasdasjdklhasdasds
                    </p>
                  </div>
                  <img src="https://i.pravatar.cc/?img=69" alt="ava" className="object-cover w-8 h-8 rounded-full shadow dark:bg-gray-500 ml-1" />
                </div>
                <div className='flex items-end text-sm'>
                  <img src="https://i.pravatar.cc/?img=69" alt="ava" className="object-cover w-8 h-8 rounded-full shadow dark:bg-gray-500 mr-1" />
                  <div className='w-[80%] space-y-1'>
                    <p className='bg-slate-200 dark:bg-slate-900 py-1 px-2 rounded-md break-words'>
                      adadasdasdasdasdlashdasdasjdklhasdasds
                    </p>
                    <p className='bg-slate-200 dark:bg-slate-900 py-1 px-2 rounded-md break-words'>
                      adadasdasdasdasdlashdasdasjdklhasdasds
                    </p>
                  </div>
                </div>
              </div>
              <div className='h-[13%] border-t flex'>
                <input
                  type='text'
                  name='message'
                  placeholder='Type your message'
                  className='bg-white bg-opacity-0 w-[90%] pl-5 placeholder:text-sm text-black focus:outline-none focus:border-none'
                />
                <span className='icon flex items-center px-4 text-gray-500'>
                  <BsSendFill size={20} />
                </span>
              </div>
            </div>
          </div >
        })
      }
    </>
  )
}

export default MiniChat