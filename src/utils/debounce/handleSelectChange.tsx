import { debounce } from 'lodash'

export const handleSelectChange = (
	selectedOptions: any,
	fieldName: any,
	formik: any,
) => {
	formik.setFieldValue(
		fieldName,
		selectedOptions.map((option: any) => option.value),
	)
	debounce(() => {
		formik.submitForm()
	}, 2000)()
}
