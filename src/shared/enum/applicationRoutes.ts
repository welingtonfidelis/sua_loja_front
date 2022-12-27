export enum ApplicationRoutes {
  ROOT = "/",
  LOGIN = "/login",
  DASHBOARD = "/dashboard",
  
  RESET_PASSWORD = "/recuperar-senha",
  UPDATE_RESETED_PASSWORD = "/atualizar-senha-recuperada",

  USER_LIST = "/usuarios",
  USER_EDIT = "/usuario/:id",
  USER_NEW = "/usuario",

  COMPANY_LIST = "/empresas",
  COMPANY_EDIT = "/empresa/:id",
  COMPANY_NEW = "/empresa",
  COMPANY_USERS_LIST = "/empresas/users",

  CATEGORY_LIST = "/categorias",
  CATEGORY_EDIT = "/categoria/:id",
  CATEGORY_NEW = "/categoria",

  PRODUCT_LIST = "/produtos",
  PRODUCT_EDIT = "/produto/:id",
  PRODUCT_NEW = "/produto",

  CLIENT_PRODUCT_LIST = "/clientes/"
}