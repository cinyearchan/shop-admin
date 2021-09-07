import xlsx from 'xlsx'

export const jsonToExcel = (options: {
  data: any[]
  header: Record<string, string>
  fileName: string
  bookType: xlsx.BookType
}) => {
  const wb = xlsx.utils.book_new()

  if (options.header) {
    options.data = options.data.map(item => {
      const obj: Record<string, any> = []
      for (const key in item) {
        obj[options.header[key]] = item[key]
      }
      return obj
    })
  }

  const ws = xlsx.utils.json_to_sheet(options.data)

  xlsx.utils.book_append_sheet(wb, ws)

  xlsx.writeFile(wb, options.fileName, {
    bookType: options.bookType || 'xlsx'
  })
}
