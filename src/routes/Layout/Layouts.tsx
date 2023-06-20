import AdminLayout from './Admin.layout'
import { AuthLayout } from './Auth.layout'
import { PublicLayout } from './Public.layout'

export const Layouts = {
	AdminLayout: () => <AdminLayout></AdminLayout>,
	AuthLayout: () => <AuthLayout></AuthLayout>,
	PublicLayout: () => <PublicLayout></PublicLayout>,
}
