import {
    format,
    addMinutes,
    addHours,
    addDays,
    addMonths,
    isSameDay,
    getYear,
    getMonth,
    startOfDay,
    endOfDay,
    startOfWeek,
    getWeeksInMonth,
    addWeeks,
    endOfWeek,
    differenceInHours,
    differenceInMinutes,
  } from "date-fns";
  
  export function getCurrentDateTime() {
    const datetime = new Date();
    return format(datetime, "yyyy-MM-dd HH:mm:ss");
  }
  
  export function addMinutesToCurrentTime(currentDate: Date, minutes: number) {
    const newDateTime = addMinutes(currentDate, minutes);
    return format(newDateTime, "yyyy-MM-dd HH:mm:ss");
  }
  
  export function addHoursToCurrentTime(currentDate: Date, hours: number) {
    const newDateTime = addHours(currentDate, hours);
    return format(newDateTime, "yyyy-MM-dd HH:mm:ss");
  }
  
  export function addDaysToCurrentTime(currentDate: Date, days: number) {
    const newDateTime = addDays(currentDate, days);
    return format(newDateTime, "yyyy-MM-dd HH:mm:ss");
  }
  
  export function addMonthsToCurrentTime(currentDate: Date, months: number) {
    const newDateTime = addMonths(currentDate, months);
    return format(newDateTime, "yyyy-MM-dd HH:mm:ss");
  }
  
  export function isCurrentDay(date: Date) {
    const currentDate = new Date();
    return isSameDay(date, currentDate);
  }
  
  export function formatToLocaleDateString(date: Date) {
    return new Date(date).toLocaleDateString();
  }
  
  export function formatToLocaleTimeString(date: Date) {
    return new Date(date).toLocaleTimeString();
  }
  
  export function formatDate(date: Date, formatStyle: string) {
    return format(date, formatStyle);
  }
  
  export function getCurrentYear() {
    const datetime = new Date();
    return getYear(datetime);
  }
  
  export function getCurrentMonth() {
    const datetime = new Date();
    return getMonth(datetime);
  }
  
  export function getTimeOfDay(datetime: Date): "day" | "night" {
    const hour = datetime.getHours();
    if (hour >= 6 && hour <= 18) {
      return "day";
    } else {
      return "night";
    }
  }
  
  export function getStartAndEndOfCurrentDay() {
    const currentDate = new Date();
    const start = startOfDay(currentDate);
    const end = endOfDay(currentDate);
  
    return { startOfDay: start, endOfDay: end };
  }
  
  export function getStartAndEndOfPreferredDay(day: string) {
    const date = new Date(day);
    const startTime = startOfDay(date);
    const endTime = endOfDay(date);
  
    return { startTime, endTime };
  }
  
  interface Week {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  }
  
  export function getDaysOfCurrentWeek() {
    const today = new Date();
    const startOfWeekDate = startOfWeek(today);
    let week: Week = {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: "",
    };
  
    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(startOfWeekDate, i);
      const formattedDate = format(currentDate, "yyyy-MM-dd");
    
      const index = i + 1;
      const day = labelWeek(index);
      week[`${day}`] = formattedDate;
    }
    return week;
  }
  
  function labelWeek(day: number) {
    switch (day) {
      case 1:
        return "Sunday";
      case 2:
        return "Monday";
      case 3:
        return "Tuesday";
      case 4:
        return "Wednesday";
      case 5:
        return "Thursday";
      case 6:
        return "Friday";
      case 7:
        return "Saturday";
      default:
        return "Sunday";
    }
  }
  
  export function getNoOfWeeksInCurrentMonth() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
  
    const noOfWeeks = getWeeksInMonth(new Date(currentYear, currentMonth));
  
    return noOfWeeks;
  }
  
  export function getStartAndEndWeekOfCurrentMonth(weekNumber: number) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
  
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  
    const startDateOfWeek = startOfWeek(
      addWeeks(firstDayOfMonth, weekNumber - 1)
    );
  
    const endDateOfWeek = endOfWeek(startDateOfWeek);
  
    return {
      startDateOfWeek,
      endDateOfWeek,
    };
  }
  
  export const getHoursDifference = (firstDate: Date, secondDate: Date) => {
    const diff = differenceInHours(firstDate, secondDate);
    return diff;
  };
  
  export const getMinutesDifference = (firstDate: Date, secondDate: Date) => {
    const sameDay = isSameDay(firstDate, secondDate);
    if (sameDay) {
      const diff = differenceInMinutes(firstDate, secondDate);
      return diff;
    }
  };
  