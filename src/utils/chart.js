import moment from "moment";

export function newDate(days) {
  // return DateTime.now().plus({ days }).toJSDate();
  return moment().add(days, "days").format("MMM Do");
}
