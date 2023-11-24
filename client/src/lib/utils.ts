import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {format, differenceInDays, isBefore, isAfter, isToday, isTomorrow} from 'date-fns'
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = error => {
      reject(error);
    };
  });
};

export function formatDateRange(startDate: Date, endDate: Date) {
  const formattedStartDate = format(startDate, 'LLL dd, y')
  const formattedEndDate = format(endDate, 'LLL dd, y')
  const today = new Date()
  const daysLeft = differenceInDays(endDate, today)
  const daysLeftText = daysLeft > 0 ? `${daysLeft} days left` : 'Ended'
  return `${formattedStartDate} - ${formattedEndDate} (${daysLeftText})`
}

export function separateBySpace(text: string) {
  return text.split(' ')
}

export function separateByComma(text: string) {
  return text.split(',')
}

export function separateByNewLine(text: string) {
  return text.split('\n')
}

export function transformStringToArr(text: string) {
  const arr = separateBySpace(text)
  return arr.filter((item) => item !== '')
}


//get sprint status
export function getSprintStatus(startDate: Date, endDate: Date) {
  const today = new Date();

  //check if the sprint has already started
  if (isBefore(today, startDate)) {
    return 'Not Started'
  }

  //check if the sprint is ongoing
  if (isAfter(today, startDate) && isBefore(today, endDate)) {
    return 'Started'
  }

  //check if the sprint has ended
  if (isAfter(today, endDate)) {
    return 'Done'
  }

  return 'Unknown'
}

export function getTaskStatus(taskDeadLine: Date) {
  const today = new Date();

  const daysUntilDeadline = differenceInDays(taskDeadLine, today);

  if(isToday(taskDeadLine)) {
    return 'Today'
  }

  if(isTomorrow(taskDeadLine)) {
    return 'Tomorrow'
  }

  if(daysUntilDeadline < 0) {
    return 'Overdue'
  }

  if(isAfter(taskDeadLine, today) && daysUntilDeadline <= 3) {
    return 'Due soon'
  }

  if(isBefore(taskDeadLine, today) && daysUntilDeadline > 3) {
    return 'Overdue'
  }

  return 'Unknown Deadline Status'
}