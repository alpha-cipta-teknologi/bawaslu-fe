import { LoginPage, RegisterPage } from 'views'

const AuthRoutes = [
  {
    path: '/login',
    component: LoginPage,
    meta: {
      publicRoute: true,
      authRoute: true
    }
  },
  {
    path: '/register',
    component: RegisterPage,
    meta: {
      publicRoute: true,
      authRoute: true
    }
  }
]

export default AuthRoutes
