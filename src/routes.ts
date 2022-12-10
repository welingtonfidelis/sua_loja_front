import { LayoutWithDrawerMenu } from "./components/layouts/layoutWithDrawerMenu";
import { GuestLayout } from "./components/layouts/guestLayout";
import { ApplicationPermissions } from "./shared/enum/applicationPermissions";
import { ApplicationRoutes } from "./shared/enum/applicationRoutes";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import { ResetPassword } from "./pages/resetPassword";
import { UserList } from "./pages/userList";
import { NotFound } from "./pages/notFound";
import { UserDetail } from "./pages/userDetail";
import { UpdateResetedPassword } from "./pages/updateResetedPassword";
import { CompanyList } from "./pages/companyList";
import { CompanyDetail } from "./pages/companyDetail";
import { CompanyUserList } from "./pages/companyUserList";
import { CategoryList } from "./pages/caregoryList";
import { CategoryDetail } from "./pages/categoryDetail";
import { ProductList } from "./pages/productList";
import { ProductDetail } from "./pages/productDetail";

const {
  ROOT,
  RESET_PASSWORD,
  UPDATE_RESETED_PASSWORD,
  DASHBOARD,
  USER_LIST,
  USER_EDIT,
  USER_NEW,
  COMPANY_LIST,
  COMPANY_EDIT,
  COMPANY_NEW,
  COMPANY_USERS_LIST,
  CATEGORY_LIST,
  CATEGORY_NEW,
  CATEGORY_EDIT,
  PRODUCT_LIST,
  PRODUCT_EDIT,
  PRODUCT_NEW,
} = ApplicationRoutes;
const { ADMIN, MANAGER, USER } = ApplicationPermissions;

export const routes = [
  {
    label: "pages.login.page_title",
    path: ROOT,
    element: Login,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [],
  },
  {
    label: "pages.reset_password.page_title",
    path: RESET_PASSWORD,
    element: ResetPassword,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [],
  },
  {
    label: "pages.update_reseted_password.page_title",
    path: UPDATE_RESETED_PASSWORD,
    element: UpdateResetedPassword,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [],
  },
  {
    label: "pages.dashboard.page_title",
    path: DASHBOARD,
    element: Dashboard,
    layout: LayoutWithDrawerMenu,
    isMenuOption: true,
    permissions: [ADMIN, MANAGER, USER],
  },
  {
    label: "pages.user_list.page_title",
    path: USER_LIST,
    element: UserList,
    layout: LayoutWithDrawerMenu,
    isMenuOption: true,
    permissions: [ADMIN, MANAGER],
  },
  {
    label: "pages.user_new_edit.page_new_title",
    path: USER_NEW,
    element: UserDetail,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [ADMIN, MANAGER],
  },
  {
    label: "pages.user_new_edit.page_edit_title",
    path: USER_EDIT,
    element: UserDetail,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [ADMIN, MANAGER],
  },
  {
    label: "pages.company_list.page_title",
    path: COMPANY_LIST,
    element: CompanyList,
    layout: LayoutWithDrawerMenu,
    isMenuOption: true,
    permissions: [ADMIN],
  },
  {
    label: "pages.company_new_edit.page_new_title",
    path: COMPANY_NEW,
    element: CompanyDetail,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [ADMIN],
  },
  {
    label: "pages.company_new_edit.page_edit_title",
    path: COMPANY_EDIT,
    element: CompanyDetail,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [ADMIN],
  },
  {
    label: "pages.company_user_list.page_title",
    path: COMPANY_USERS_LIST,
    element: CompanyUserList,
    layout: LayoutWithDrawerMenu,
    isMenuOption: true,
    permissions: [ADMIN],
  },
  {
    label: "pages.category_list.page_title",
    path: CATEGORY_LIST,
    element: CategoryList,
    layout: LayoutWithDrawerMenu,
    isMenuOption: true,
    permissions: [ADMIN, MANAGER, USER],
  },
  {
    label: "pages.category_new_edit.page_new_title",
    path: CATEGORY_NEW,
    element: CategoryDetail,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [ADMIN, MANAGER, USER],
  },
  {
    label: "pages.category_new_edit.page_edit_title",
    path: CATEGORY_EDIT,
    element: CategoryDetail,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [ADMIN, MANAGER, USER],
  },
  {
    label: "pages.product_list.page_title",
    path: PRODUCT_LIST,
    element: ProductList,
    layout: LayoutWithDrawerMenu,
    isMenuOption: true,
    permissions: [ADMIN, MANAGER, USER],
  },
  {
    label: "pages.product_new_edit.page_new_title",
    path: PRODUCT_NEW,
    element: ProductDetail,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [ADMIN, MANAGER, USER],
  },
  {
    label: "pages.product_new_edit.page_edit_title",
    path: PRODUCT_EDIT,
    element: ProductDetail,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [ADMIN, MANAGER, USER],
  },
  {
    label: "not found",
    path: "*",
    element: NotFound,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [],
  },
];
