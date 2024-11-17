export const formatDateAndTime = (isoString) => {
  const optionsDate = {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Manila",
  } // +08 timezone
  const optionsTime = {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Manila",
  }

  const date = new Date(isoString)

  const formattedDate = new Intl.DateTimeFormat("en-US", optionsDate).format(
    date
  )
  const formattedTime = new Intl.DateTimeFormat("en-US", optionsTime).format(
    date
  )

  return { date: formattedDate, time: formattedTime }
}
