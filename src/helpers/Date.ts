import moment from "moment"

export const todaysDate = (): moment.Moment => {
  return moment().set({ ms: 0, s: 0, m: 0, h: 0 })
}

export const dateIsSameOrAfterToday = (endDate: string): boolean => {
  let todaysDate = moment().set({ ms: 0, s: 0, m: 0, h: 0 })
  let submittedDate = moment(endDate, ["YYYY-MM-DD", "DD/MM/YYYY"]).set({
    ms: 0,
    s: 0,
    m: 0,
    h: 0,
  })
  return submittedDate.isSameOrAfter(todaysDate)
}
