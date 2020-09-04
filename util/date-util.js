// var moment = require('moment')
import moment from 'moment'
/**
 * 获取当前周的第一天和昨天
 */
function getCurrWeekDays () {
  const now = new Date()
  // 获取当前星期几
  const currWeekDay = now.getDay()
  // 获取当前周第一天
  const currWeekFirstDay = moment(now).subtract(currWeekDay, 'days')
  // 获取昨天
  const yesterday = moment(now).subtract(1, 'days')
  return [moment(currWeekFirstDay).format('YYYY-MM-DD 00:00:00'), moment(yesterday).format('YYYY-MM-DD 23:59:59')]
}

export default {
  getCurrWeekDays
}
