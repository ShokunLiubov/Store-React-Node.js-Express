import AdminLayout from "./AdminLayout";
import { AuthLayout } from "./AuthLayout";
import { PublicLayout } from "./PublicLayout";

export const Layouts = {
  AdminLayout: () => <AdminLayout></AdminLayout>,
  AuthLayout: () => <AuthLayout></AuthLayout>,
  PublicLayout: () => <PublicLayout></PublicLayout>,
};
