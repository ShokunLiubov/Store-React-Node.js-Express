class dateRange {
	async dataRangePicker(from: Date, to: Date) {
		try {
			const dateTo = new Date(to)
			dateTo.setHours(23, 59, 59, 999)
			const dateFrom = new Date(from)
			dateFrom.setHours(0, 0, 0, 0)

			return {
				$gte: dateFrom,
				$lte: dateTo,
			}
		} catch (e) {
			console.log(e)
		}
	}
}

export default new dateRange()
