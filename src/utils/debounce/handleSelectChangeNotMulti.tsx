import { FormikValues } from 'formik'
import { debounce } from 'lodash'

export const handleSelectChangeNotMulti = (
	selectedOptions: any,
	fieldName: string,
	formik: FormikValues,
) => {
	formik.setFieldValue(fieldName, selectedOptions)

	formik.setFieldValue('page', 1)
	debounce((): void => {
		formik.submitForm()
	}, 2000)()
}
