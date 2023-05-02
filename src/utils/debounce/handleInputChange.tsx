import { FormikValues } from 'formik'
import { debounce } from 'lodash'

export const delayedSubmit = (
	fieldName: string,
	value: string,
	formik: FormikValues,
) => {
	formik.setFieldValue(fieldName, value)
	return debounce((): void => {
		formik.submitForm()
	}, 2000)
}

export const handleInputChange = (
	e: React.ChangeEvent<HTMLInputElement>,
	fieldName: string,
	formik: FormikValues,
	checked?: any,
) => {
	const { value } = e.target
	formik.setFieldValue('page', 1)
	if (fieldName === 'search') {
		if (value.length <= 1) {
			delayedSubmit(fieldName, '', formik)()
		}
		if (value.length > 2) {
			delayedSubmit(fieldName, value, formik)()
		}
	} else {
		checked
			? delayedSubmit(fieldName, checked, formik)()
			: delayedSubmit(fieldName, value, formik)()
	}
}
