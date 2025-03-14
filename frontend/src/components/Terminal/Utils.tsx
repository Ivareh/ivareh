export const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


export const formatReaderFriendTime = (time: string) => {
  const isoTime = new Date(time)
  return `${isoTime.getDay()}.${isoTime.getMonth()}.${isoTime.getFullYear()}`
}
