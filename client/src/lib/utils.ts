import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {format, differenceInDays} from 'date-fns'
 
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