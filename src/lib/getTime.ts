export function getDateByUnix(unixTime: number) {
  const date = new Date(unixTime * 1000)

  const formattedDate = Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    minute: 'numeric',
    hour: 'numeric',
  }).format(date)

  return formattedDate
}
