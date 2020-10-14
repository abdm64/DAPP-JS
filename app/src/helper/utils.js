
exports.getCronFromTime = (time) => {
    const d = new Date()
    const d1 = new Date()
    const timeStr = time.toString()
    const hours = timeStr.split(":")[0]
    const min = timeStr.split(":")[1]
    // convert UTC Time to local Time 
    const utc_offeset = d.getTimezoneOffset()
    let utc_date = new Date( d.setMinutes(d.getMinutes() + utc_offeset)) 
    
    const  deff_hours =  d1.getHours() - utc_date.getHours()
     const actuelHour =  deff_hours + parseInt(hours)
   
    return `${min} ${actuelHour} * * *`
}


