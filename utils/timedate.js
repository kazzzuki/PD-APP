export const formatDateAndTime = (isoString) => {
  // Parse the date and adjust for +08 timezone offset
  const dateInUTC = new Date(isoString)
  const dateInDesiredTZ = new Date(dateInUTC.getTime() + 8 * 60 * 60 * 1000) // +08 offset

  // Extract date components
  const day = String(dateInDesiredTZ.getDate()).padStart(2, "0")
  const month = String(dateInDesiredTZ.getMonth() + 1).padStart(2, "0") // Month is 0-indexed
  const year = String(dateInDesiredTZ.getFullYear()).slice(-2)

  // Extract time components
  const hours = String(dateInDesiredTZ.getHours()).padStart(2, "0")
  const minutes = String(dateInDesiredTZ.getMinutes()).padStart(2, "0")
  const seconds = String(dateInDesiredTZ.getSeconds()).padStart(2, "0")

  // Format date and time
  const formattedDate = `${day}/${month}/${year}`
  const formattedTime = `${hours}:${minutes}:${seconds}`

  return { date: formattedDate, time: formattedTime }
}
