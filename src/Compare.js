function CompareDay(a,b){
    let isSame = false
    if(a.year() === b.year()){
        if(a.month() === b.month()){
            if(a.date() === b.date()){
                isSame = true
            }
        }
    }
    return isSame
}

export default CompareDay;