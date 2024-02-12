import {DateCalendar} from "@mui/x-date-pickers";
import {PickersDay, PickersDayProps} from '@mui/x-date-pickers/PickersDay';
import styles from './CalendarSection.module.css'
import dayjs, {Dayjs} from "dayjs";
import {UserInfoDto} from "../../../../data/dto/userInfo.dto.ts";

const CalendarDay = (props: PickersDayProps<Dayjs> & { active?: string }) => {
    const {day} = props
    const needHighlight = (day.month() === dayjs().month()
        && day.year() === dayjs().year())
    return (
        <PickersDay
            sx={props.active && needHighlight ? {
                '&:not(.MuiPickersDay-dayOutsideMonth)': {
                    scale: "0.9",
                    borderRadius: "10px",
                    background: "red",
                    color: "white !important",
                    '&:hover': {
                        background: "red"
                    }
                }
            } : {}}
            {...props}
        />)
}

export interface CalendarSectionProps {
    userInfo: UserInfoDto
}

const CalendarSection = ({userInfo}: CalendarSectionProps) => {
    return (
        <div className={styles.calendarWrapper}>
            {(!userInfo.active) && <div className={styles.blurContainer}>
                <div className={styles.accessLabel}>
                    До вашей очереди осталось: {dayjs().diff(dayjs(userInfo.startDate), 'days')} дней
                </div>
            </div>}
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
                    day: CalendarDay
                }}
                slotProps={{
                    day: {
                        active: userInfo.active ? "true" : ""
                    } as any
                }}
            />
        </div>
    );
};

export default CalendarSection;