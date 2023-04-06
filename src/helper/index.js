export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
})

export const formatTime = (input) => {
    const secs = Math.abs(Date.now() - Date.parse(input))/1000
    if(secs < 60) {
        return `Just now`
    } else if(secs/60 < 60) {
        const min = Math.floor(secs/60)
        return `${min} mins ago`
    } else if(secs/3600 < 24) {
        const hour = Math.floor(secs/3600)
        return `${hour} hours ago`
    } else {
        return input
    }
}

export const minifyText = (input, len) => {
    const text = input.length > len ? input.substring(0, len).concat('...') : input
    return text
}