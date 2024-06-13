import React from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers';
import 'dayjs/locale/nb';
import dayjs from 'dayjs'
import CompareDay from '../Compare';

const CustomDay = (props) => {
    const[color_, setColor_]  = React.useState("#FFFFFF")
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    React.useEffect(() => {
        highlightedDays.forEach(element => {
            if(CompareDay(dayjs(element.TimeStamp),props.day)){
                setColor_(element.color)
            }
        });
    }, [highlightedDays, props.day, props.selecteddatedata.color])


    return(<PickersDay{...other} outsideCurrentMonth={outsideCurrentMonth} day={day} sx={{backgroundColor : color_}}/>)
}

const Calendar = ({selectHandler, dateArray, selecteddatedata}) => {
    const [highlightedDays, setHighlightedDays] = React.useState([]);

    React.useEffect(() => {
        setHighlightedDays(dateArray)
    }, [dateArray])

    
    return(
        <DateCalendar
            orientation="portrait"
            onChange={selectHandler}
            slots={{
                day : CustomDay
            }}
            slotProps={{
                day: {highlightedDays, selecteddatedata}

            }} 
        />
    )
}

export default Calendar
