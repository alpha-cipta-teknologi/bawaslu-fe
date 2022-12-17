import {
  ForgotPasswordPage,
  ForgotPasswordSuccessPage,
  LoginPage,
  OtpPage,
  RegisterPage,
  ResetPasswordPage,
  ResetPasswordSuccessPage,
  AccountVerificationPage,
  AccountVerificationErrorPage
} from 'views'

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
    path: '/forgot-password/success',
    component: ForgotPasswordSuccessPage,
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
  },
  {
    path: '/account-verification',
    component: AccountVerificationPage,
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/verification/error',
    component: AccountVerificationErrorPage,
    layout: 'HeaderLayout',
    meta: {
      publicRoute: true
    }
  }
]

export default AuthRoutes
