import Cookies from 'js-cookie';
import { cookies } from 'next/headers';

export const getCookieName = (gameId: string) => `Game-${gameId}`

export const setCookie = (gameId: string, value: string) => {
  const cookieName = getCookieName(gameId)

  const expiredCookies = Object.keys(Cookies.get()).filter(key => key !== cookieName)
  if (expiredCookies.length > 0) {
    expiredCookies.forEach(cookie => Cookies.remove(cookie))
  }

  const existingValues = Cookies.get(cookieName)
  if (!existingValues) {
    return Cookies.set(cookieName, value, { expires: 1 })
  } else if (!existingValues.includes(value)) {
    return Cookies.set(cookieName, existingValues + "|" + value, { expires: 1 })
  }
}

export const getServerCookie = async (gameId: string) => {
  'use server'
  return cookies().get(getCookieName(gameId))?.value
}