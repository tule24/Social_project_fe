export const FriendSkeleton = () => {
    return (
        <div className='grid-cols-4 gap-5 mt-32'>
            <div className='friend-card my-shadow mb-10'>
                <div className="friend-ava skeleton" />
                <p className="skeleton w-28 h-3 shadow" />
                <div className='w-full grid grid-cols-2 h-[3rem] skeleton rounded-lg'>
                </div>
            </div>
        </div>
    )
}

export const PostSkeleton = () => {
    return (
        <div className="flex flex-col w-full p-6 space-y-5 overflow-hidden rounded-lg my-shadow dark:bg-zinc-800 dark:text-gray-100">
            <div className='flex justify-between'>
                <div className="flex space-x-4 items-center">
                    <div className="object-cover w-12 h-12 rounded-full shadow skeleton" />
                    <div className="flex flex-col space-y-1">
                        <p className="skeleton w-28 h-3 shadow" />
                        <p className="skeleton w-10 h-3 shadow" />
                    </div>
                </div>
            </div>
            <div>
                <p className="skeleton w-full h-3 shadow" />
                <p className="skeleton w-full h-3 shadow" />
                <p className="skeleton w-full h-3 shadow" />
                <div className="skeleton w-full h-[35vh] shadow mt-5" />
            </div>
            <hr className='border-gray-300 dark:border-gray-500' />
            <div className="flex flex-wrap justify-between text-lg px-2">
                <div className="flex space-x-10 dark:text-gray-400">
                    <div className="w-5 h-5 rounded-full shadow skeleton" />
                    <div className="w-5 h-5 rounded-full shadow skeleton" />
                </div>
                <div className="flex space-x-2 dark:text-gray-400">
                    <div className="w-5 h-5 rounded-full shadow skeleton" />
                </div>
            </div>
        </div>
    )
}

export const InfoSkeleton = () => {
    return (
        <div className="flex flex-col max-w-md p-4 mx-auto rounded-lg dark:text-gray-100 dark:bg-zinc-800 my-shadow">
            <div className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square skeleton" />
            <div className="space-y-4 divide-y divide-gray-700">
                <div className="my-2 space-y-1">
                    <p className="skeleton w-full h-5 shadow rounded-lg" />
                </div>
                <div className="space-y-2 pt-5">
                    <p className="skeleton w-full h-5 shadow rounded-lg" />
                    <p className="skeleton w-full h-5 shadow rounded-lg" />
                    <p className="skeleton w-full h-5 shadow rounded-lg" />
                    <p className="skeleton w-full h-5 shadow rounded-lg" />
                    <p className="skeleton w-full h-5 shadow rounded-lg" />
                </div>
            </div>
        </div>
    )
}

export const CommentSkeleton = () => {
    return (
        <div className='flex space-x-3'>
            <div className="object-cover w-12 h-12 rounded-full shadow skeleton" />
            <div>
                <div className='bg-slate-200 dark:bg-slate-900 py-1 px-2 rounded-md w-max'>
                    <p className="skeleton w-28 h-3 shadow" />
                    <p className="skeleton w-28 h-3 shadow" />
                </div>
            </div>
        </div>
    )
}