import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'customTimeFrmat',
  pure: true,
})
export class CustomTimeFormat implements PipeTransform {
  transform(value: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000)

      if (seconds < 60) return `${seconds} seconds ago`
      const intervals: { [key: string]: number } = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
      }

      let counter
      for (const int in intervals) {
        counter = Math.floor(seconds / intervals[int])

        if (counter > 0) {
          if (int === 'year') {
            const dateValue = new Date(value)
            const day = dateValue.getDate().toString().padStart(2, '0')
            const month = dateValue.getMonth().toString().padStart(2, '0')
            return `${day}/${month}/${dateValue.getFullYear()}`
          }

          if (counter === 1) {
            return `${counter}  ${int} ago `
          } else {
            return `${counter}  ${int}s ago `
          }
        }
      }
    }
    return value
  }
}
