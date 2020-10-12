



exports.getCronFromTime = (time) => {
    const timeStr = time.toString()
    const hours = timeStr.split(":")[0]
    const min = timeStr.split(":")[1]

  
    return `${min} ${hours} * * *`
}