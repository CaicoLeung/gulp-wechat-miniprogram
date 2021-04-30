import { ISelectedSourceItem } from '../libs/publish'
import MD5JS from './MD5'
import config from '../config/index'

const formatNumber = (n: number) => {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export const formatTime = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${[year, month, day].map(formatNumber).join('/')} ${[[hour, minute, second].map(formatNumber).join(':')]}`
}

export const WXLogin = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res: WechatMiniprogram.LoginSuccessCallbackResult) {
        resolve(res.code)
      },
      fail(error) {
        reject(error.errMsg)
      }
    })
  })
}

export const WXGetImageInfoAsync = (
  src: string
): Promise<ISelectedSourceItem> => {
  return new Promise<ISelectedSourceItem>((resolve, reject) => {
    wx.getImageInfo({
      src,
      success(res: WechatMiniprogram.GetImageInfoSuccessCallbackResult) {
        resolve({
          ...res,
          showActionSheet: false,
          tag: '',
          type: 'image'
        })
      },
      fail(error) {
        reject(error)
      }
    })
  })
}

export const getSignature = <T extends { c_p: Record<string, unknown> }>(target: T): T & { signature: string, c_p: string } => {
  let param = ''
  const c_p = JSON.stringify(target.c_p)
  try {
    const tmpObj: Record<string, string> = { ...target, c_p }
    // 排序进行签名
    const objAsArray = Object.keys(tmpObj).sort()
    for (const key of objAsArray) {
      if (Object.prototype.hasOwnProperty.call(tmpObj, key)) {
        const value = tmpObj[key]
        param += `${key}=${encodeURIComponent(value)}&`
      }
    }
  } catch (error) {
    console.error('签名过程出错: ', error)
  }
  return {
    ...target,
    signature: MD5JS(`${param}${config.aeskey}`),
    c_p
  }
}

export const WXSubscribeMessage = (tmplIds: string[]): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    wx.requestSubscribeMessage({
      tmplIds,
      success(res: WechatMiniprogram.RequestSubscribeMessageSuccessCallbackResult) {
        if (res.errMsg === 'requestSubscribeMessage:ok') {
          resolve(true)
        } else {
          reject(new Error('error'))
        }
      },
      fail(err: WechatMiniprogram.RequestSubscribeMessageFailCallbackResult) {
        console.error(`订阅消息回调: ${err.errMsg}`)
        reject(new Error('error'))
      }
    })
  })
}

export const currentPageRouteParamsConcat = (targerParams: Record<string, unknown>): string => {
  const currentPages = getCurrentPages()
  const currentPage = currentPages[currentPages.length - 1]
  const finnalyQuery = Object.assign(currentPage.options, targerParams)
  const pathParamsList = Object.keys(finnalyQuery).map((item: keyof Record<string, unknown>) => {
    return `${item}=${currentPage.options[item]}`
  })
  return `${currentPage.route}?${pathParamsList.join('&')}`
}

/*
* @param length 需要生成code的长度
* @return string 生成的code
* */
export const generateRandomCode = (length: number): string => {
  const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const strElelmentArr = str.split('')
  let result: string[] = []
  for (let i = 0; i < length; i++) {
    result = result.concat(strElelmentArr[parseInt((Math.random() * strElelmentArr.length).toFixed(0), 10)])
  }
  return result.join('')
}
// 获取当前月份有多少天数
export const getTotalDaysByMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate()
}
// 获取当前月份1号是星期几
export const getDayByMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay()
}

// 计算间隔月数
export const setIntervalMonthHandler = (currentCalendarSwiperDate: Date, create_time: { year: number, month: number }) => {
  const date: Date = new Date()
  const MonthDays = 30 * 24 * 60 * 60 * 1000
  const userCreateDate = new Date(create_time.year, create_time.month, 0)
  // 当前日历时间和最低可达时间(用户注册时间)间隔
  const intervalCreateMonth = Math.abs(Math.ceil((currentCalendarSwiperDate.valueOf() - userCreateDate.valueOf()) / MonthDays))
  // 当前日历时间和最高可达时间(当前时间)间隔
  const intervalNewMonth = Math.abs(Math.ceil((currentCalendarSwiperDate.valueOf() - date.valueOf()) / MonthDays))
  console.log(`和最低可达时间(用户注册时间)间隔: ${intervalCreateMonth}; 和最高可达时间(当前时间)间隔: ${intervalNewMonth}`)
  // 日历切换拦截
  return { intervalCreateMonth, intervalNewMonth }
}

// 获取节点的Node信息
export const getNodeOffsetInfoHandler = (className: string, fields: WechatMiniprogram.Fields): Promise<unknown[]> => {
  return new Promise((resolve) => {
    wx.createSelectorQuery()
      .selectAll(className)
      .fields(fields)
      .exec((res) => {
        resolve(res[0])
      })
  })
}
