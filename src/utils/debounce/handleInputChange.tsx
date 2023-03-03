import { debounce } from 'lodash'

const delayedSubmit = (fieldName: string, value: any, formik: any) => {
	formik.setFieldValue(fieldName, value)
	return debounce(() => {
		formik.submitForm()
	}, 2000)
}

export const handleInputChange = (
	e: React.ChangeEvent<HTMLInputElement>,
	fieldName: string,
	formik: any,
) => {
	const { value } = e.target
	if (fieldName === 'search') {
		if (value.length <= 1) {
			delayedSubmit(fieldName, '', formik)()
		}
		if (value.length > 2) {
			delayedSubmit(fieldName, value, formik)()
		}
	} else {
		delayedSubmit(fieldName, value, formik)()
	}
}
