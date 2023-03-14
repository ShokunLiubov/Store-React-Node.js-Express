class dateRange {

  async dataRangePicker(from, to) {

    try {
      const date = new Date(to)
      date.setHours(23, 59, 0, 0)
      to = `${date.toDateString()} ${date.toLocaleTimeString()}`

      return { $gte: from, $lte: to }
    } catch (e) {
      console.log(e)
    }
  }

}

export default new dateRange()
