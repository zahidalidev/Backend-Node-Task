export const expireDuration = (duration: string): Date => {
  const regex = /^(\d+)([dhms])$/
  const match = duration.match(regex)

  if (!match) throw new Error('Invalid duration format')

  let value = parseInt(match[1])
  const unit = match[2]

  switch (unit) {
    case 'd':
      value = value * 24 * 60 * 60 * 1000 // Days to milliseconds
      break
    case 'h':
      value = value * 60 * 60 * 1000 // Hours to milliseconds
      break
    case 'm':
      value = value * 60 * 1000 // Minutes to milliseconds
      break
    case 's':
      value = value * 1000 // Seconds to milliseconds
      break
    default:
      throw new Error('Invalid duration unit')
  }

  return new Date(Date.now() + value)
}

export const isValidEmailFormat = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
