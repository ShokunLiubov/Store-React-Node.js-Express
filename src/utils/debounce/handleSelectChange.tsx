import { FormikValues } from 'formik'
import { debounce } from 'lodash'
import { MultiValue } from 'react-select'
import { ISelectedOptions } from '../../shared/interfaces/common/selectedOptions.interface'

export const handleSelectChange = (
	selectedOptions: MultiValue<ISelectedOptions>,
	fieldName: string,
	formik: FormikValues,
) => {
	formik.setFieldValue(
		fieldName,
		selectedOptions.map((option: ISelectedOptions) => option.value),
	)

	formik.setFieldValue('page', 1)
	debounce((): void => {
		formik.submitForm()
	}, 2000)()
}
