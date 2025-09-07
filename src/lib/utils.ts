import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export interface CustomAxiosError extends Error {
    response:{
        data:{
          message:string
        }
    }
}
export function extractErrorMessage(e:  CustomAxiosError) {
 return e.response?.data?.message;    
}