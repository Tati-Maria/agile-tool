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

  //return task date
  return format(taskDeadLine, 'LLL dd, y')
}

export function transformStringToArray(inputString: string): string[] {
  const lines = inputString.split('\n');
  const outputArray: string[] = [];

  lines.forEach((line) => {
    const match = line.match(/^\s*([\d]+-|\*)\s*(.*)/);
    if(match) {
      outputArray.push(match[2].trim());
    }
  });

  return outputArray;
}

export function convertArrayToString(inputArray: string[]): string {
  let resultString = '';

  inputArray.forEach((item, index) => {
    const prefix = index + 1 + '-'; // Use index + 1 for numbering
    resultString += `${prefix} ${item}\n`;
  });

  return resultString;
}

export function getTaskPriorityColor(priority: string) {
  switch(priority) {
    case 'Low':
      return 'border-l-4 border-green-500';
    case 'Medium':
      return 'border-l-4 border-yellow-500';
    case 'High':
      return 'border-l-4 border-red-500';
    default:
      return 'border-l-4 border-green-500';
  }
}

export function taskStatusColor(status: string) {
  switch(status) {
    case 'To Do':
      return 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200';
    case 'In Progress':
      return 'bg-violet-200 text-violet-800 dark:bg-violet-800 dark:text-violet-200';
    case 'Quality Check':
      return 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200';
    case 'Done':
      return 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200'; 
    default:
      return 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  }
}