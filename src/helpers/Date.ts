import moment from "moment"

export const getTodaysDate = (): moment.Moment => {
  return moment().set({ ms: 0, s: 0, m: 0, h: 0 })
}

export const dateIsSameOrAfterToday = (endDate: string): boolean => {
  let todaysDate = getTodaysDate()
  let submittedDate = moment(endDate, ["YYYY-MM-DD", "DD/MM/YYYY"]).set({
    ms: 0,
    s: 0,
    m: 0,
    h: 0,
  })
  return submittedDate.isSameOrAfter(todaysDate)
}

export const validateEndDate = (endDate: string): boolean => {
  return endDate === "" || dateIsSameOrAfterToday(endDate)
}

export const convertDateToHTMLFormat = (date: string): string => {
  return `${date.substr(6, 4)}-${date.substr(3, 2)}-${date.substr(0, 2)}`
}
