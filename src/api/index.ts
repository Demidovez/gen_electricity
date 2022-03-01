import { IDay } from "../types/types";
import days from "../../days.json"

export const fetchDays = (): IDay[] => {

    return days.map(day => {
        const date = new Date(day.date);

        return {
            ...day,
            date
        }
    })
}