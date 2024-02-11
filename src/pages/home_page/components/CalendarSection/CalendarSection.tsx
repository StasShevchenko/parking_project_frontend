import {DateCalendar} from "@mui/x-date-pickers";
import {PickersDay, PickersDayProps} from '@mui/x-date-pickers/PickersDay';
import styles from './CalendarSection.module.css'
import dayjs, {Dayjs} from "dayjs";

const FuckingDay = (props: PickersDayProps<Dayjs> & { isActive?: boolean }) => {
    const {day} = props
    const needHighlight = (day.month() === dayjs().month()
        && day.year() === dayjs().year())
    return (
        <PickersDay
            sx={ props.isActive && needHighlight ? {
                '&:not(.MuiPickersDay-dayOutsideMonth)':{
                    scale: "0.9",
                    borderRadius: "10px",
                    background: "red",
                    color: "white",
                    '&:hover':{
                        background: "red"
                    }
                }
            } : {}}
            {...props}
        />)
}
const CalendarSection = () => {
    return (
        <div className={styles.calendarWrapper}>
            <div className={styles.blurContainer}>
                <div className={styles.accessLabel}>
                    До вашей очереди осталось: 20 дней
                </div>
            </div>
            <DateCalendar
                disabled
                readOnly
                disableHighlightToday
                showDaysOutsideCurrentMonth
                sx={{
                    '& .MuiPickersCalendarHeader-label': {
                        textTransform: 'capitalize'
                    }
                }}
                slots={{
                    day: FuckingDay
                }}
                slotProps={{
                    day: {
                        isActive: false
                    } as any
                }}
            />
        </div>
    );
};

export default CalendarSection;