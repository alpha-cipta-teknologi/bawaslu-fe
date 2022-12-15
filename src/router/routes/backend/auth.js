import { ForgotPasswordPage, LoginPage, OtpPage, RegisterPage, ResetPasswordPage, ResetPasswordSuccessPage } from 'views'

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
  },
  {
    path: '/forgot-password',
    component: ForgotPasswordPage,
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/reset-password',
    component: ResetPasswordPage,
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/reset-password/success',
    component: ResetPasswordSuccessPage,
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/otp-verification',
    component: OtpPage,
    meta: {
      publicRoute: true
    }
  }
]

export default AuthRoutes
