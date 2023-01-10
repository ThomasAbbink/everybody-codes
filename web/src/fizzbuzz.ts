export interface FizzBuzzable {
  number: number
}

export const fizzBuzz = <T extends FizzBuzzable>(items: T[]): T[][] => {
  return items.reduce(
    (acc, curr) => {
      const { number } = curr
      const column = getColumn(number)
      acc[column].push(curr)
      return acc
    },
    [[], [], [], []] as T[][]
  )
}

const getColumn = (n: number) => {
  if (n % 3 === 0 && n % 5 === 0) {
    return 2
  }
  if (n % 3 === 0) {
    return 0
  }
  if (n % 5 === 0) {
    return 1
  }
  return 3
}
