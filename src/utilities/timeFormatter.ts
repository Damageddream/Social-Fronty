const timeFormatter = (date:string) => 

{
    const year = date.slice(3)
    const month = date.slice(4,6)
    const day = date.slice(7,9)
    const hour = date.slice(12,15)
    const minutes = date.slice(17,19)

    const yearMonthDay = day+" "+month+" "+year
    const time = minutes+" "+minutes

    return {year, month, day, hour, minutes, yearMonthDay, time}
}

export default timeFormatter


