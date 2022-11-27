// ** Routes Imports
import AuthRoutes from './backend/auth'
import PrivateRoutes from './backend/private'
import PublicRoutes from './backend/public'

// ** Document title
const TemplateTitle = 'Bawaslu'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [...AuthRoutes, ...PublicRoutes, ...PrivateRoutes]

export {
  DefaultRoute,
  TemplateTitle,
  Routes
}
