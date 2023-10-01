const timeFormatter = (date:string) => 

{
    const year = date.slice(0,4)
    const month = date.slice(5,7)
    const day = date.slice(8,10)


    const yearMonthDay = day+"."+month+"."+year


    return {year, month, day, yearMonthDay}
}

export default timeFormatter


