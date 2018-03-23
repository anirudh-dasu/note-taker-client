import { detect } from 'detect-browser'
import uuid from 'uuid/v4'

export const getDeviceType = () => {
  const browser = detect()
  const name = browser ? browser.name : 'browser'
  return name
}

export const getDeviceId = () => {
  return uuid()
}
