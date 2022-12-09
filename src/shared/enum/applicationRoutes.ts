export enum ApplicationRoutes {
  ROOT = "/",
  DASHBOARD = "/dashboard",
  
  RESET_PASSWORD = "/reset-password",
  UPDATE_RESETED_PASSWORD = "/update-reseted-password",

  USER_LIST = "/users",
  USER_EDIT = "/user/:id",
  USER_NEW = "/user",

  COMPANY_LIST = "/companies",
  COMPANY_EDIT = "/company/:id",
  COMPANY_NEW = "/company",
  COMPANY_USERS_LIST = "/companies/users",

  CATEGORY_LIST = "/categories",
  CATEGORY_EDIT = "/category/:id",
  CATEGORY_NEW = "/category",

  PRODUCT_LIST = "/products",
  PRODUCT_EDIT = "/product/:id",
  PRODUCT_NEW = "/product",
}