import { detect } from 'detect-browser'
import uuid from 'uuid/v4'
import base64 from 'base-64'
import utf8 from 'utf8'

export const getDeviceType = () => {
  const browser = detect()
  const name = browser ? browser.name : 'browser'
  return name
}

export const getDeviceId = () => uuid()

export const encryptAndStoreUser = (data) => {
  const string = base64.encode(utf8.encode(JSON.stringify(data)))
  localStorage.setItem('note-taker-user', string)
}

export const getAndDecryptUser = () => {
  const userString = localStorage.getItem('note-taker-user')
  if (!userString) return null
  return JSON.parse(base64.decode(userString))
}
