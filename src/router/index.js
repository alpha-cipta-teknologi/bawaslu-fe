// ** React Imports
import React, {
  Suspense,
  useContext,
  lazy
} from 'react'
// ** Router Components
import {
  Router as AppRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

// ** Custom Components
import {
  LayoutWrapper,
  BlankLayout,
  HeaderLayout,
  HorizontalLayout
} from 'core/layouts'
import { HistoryWrapper } from 'core/components'
// ** Utils
import {
  utils,
  hooks,
  AbilityContext
} from 'utility'
import { themeConfig } from 'configs'

// ** Routes & Default Routes
import { DefaultRoute, Routes } from './routes'

const { isUserLoggedIn } = utils
const { useRouterTransition } = hooks

const NotAuthorized = lazy(() => import('views/misc/NotAuthorized.js'))
const ErrorNotFound = lazy(() => import('views/misc/Error.js'))

const Router = ({ history }) => {
  // ** Hooks
  const [transition, setTransition] = useRouterTransition()

  // ** ACL Ability Context
  const ability = useContext(AbilityContext)

  // ** Default Layout
  const DefaultLayout = themeConfig.layout.type === 'horizontal' ? 'HorizontalLayout' : 'BlankLayout'

  // ** All of the available layouts
  const Layouts = { BlankLayout, HeaderLayout, HorizontalLayout }

  // ** Return Filtered Array of Routes & Paths
  const LayoutRoutesAndPaths = layout => {
    const LayoutRoutes = []
    const LayoutPaths = []

    if (Routes) {
      Routes.filter(route => {
        // ** Checks if Route layout or Default layout matches current layout
        if (route.layout === layout || (route.layout === undefined && DefaultLayout === layout)) {
          LayoutRoutes.push(route)
          LayoutPaths.push(route.path)
        }
      })
    }

    return { LayoutRoutes, LayoutPaths }
  }

  /**
   ** Final Route Component Checks for Login & User Role and then redirects to the route
   */
  const FinalRoute = props => {
    const route = props.route
    let action, resource

    // ** Assign vars based on route meta
    if (route.meta) {
      action = route.meta.action ? route.meta.action : null
      resource = route.meta.resource ? route.meta.resource : null
    }

    if (
      (!isUserLoggedIn() && route.meta === undefined) ||
      (!isUserLoggedIn() && route.meta && !route.meta.authRoute && !route.meta.publicRoute)
    ) {
      /**
       ** If user is not Logged in & route meta is undefined
       ** OR
       ** If user is not Logged in & route.meta.authRoute, !route.meta.publicRoute are undefined
       ** Then redirect user to login
       */

      return <Redirect to='/login' />
    } else if (route.meta && route.meta.authRoute && isUserLoggedIn()) {
      // ** If route has meta and authRole and user is Logged in then redirect user to home page (DefaultRoute)
      return <Redirect to='/' />
    } else {
      // ** If none of the above render component
      return <route.component {...props} />
    }
  }

  // ** Return Route to Render
  const ResolveRoutes = () => {
    return Object.keys(Layouts).map((layout, index) => {
      // ** Convert Layout parameter to Layout Component
      // ? Note: make sure to keep layout and component name equal

      const LayoutTag = Layouts[layout]

      // ** Get Routes and Paths of the Layout
      const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout)

      // ** We have freedom to display different layout for different route
      // ** We have made LayoutTag dynamic based on layout, we can also replace it with the only layout component,
      // ** that we want to implement like VerticalLayout or HorizontalLayout
      // ** We segregated all the routes based on the layouts and Resolved all those routes inside layouts

      // ** RouterProps to pass them to Layouts
      const routerProps = {}

      return (
        <Route path={LayoutPaths} key={index}>
          <LayoutTag
            routerProps={routerProps}
            layout={layout}
            transition={transition}
            setTransition={setTransition}
          >
            <Switch>
              {LayoutRoutes.map(route => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact
                    render={props => {
                      // ** Assign props to routerProps
                      Object.assign(routerProps, {
                        ...props,
                        meta: route.meta
                      })

                      return (
                        <Suspense fallback={null}>
                          {/* Layout Wrapper to add classes based on route's layout, appLayout and className */}
                          <LayoutWrapper
                            layout={DefaultLayout}
                            transition={transition}
                            setTransition={setTransition}
                            /* Conditional props */
                            /*eslint-disable */
                            {...(route.appLayout
                              ? {
                                appLayout: route.appLayout
                              }
                              : {})}
                            {...(route.meta
                              ? {
                                routeMeta: route.meta
                              }
                              : {})}
                            {...(route.className
                              ? {
                                wrapperClass: route.className
                              }
                              : {})}
                          /*eslint-enable */
                          >
                            <FinalRoute route={route} {...props} />
                          </LayoutWrapper>
                        </Suspense>
                      )
                    }}
                  />
                )
              })}
            </Switch>
          </LayoutTag>
        </Route>
      )
    })
  }

  return (
    <AppRouter history={history}>
      <HistoryWrapper>
        <Switch>
          <Route
            exact
            path='/'
            render={() => {
              return <Redirect to={DefaultRoute} />
            }}
          />
          {/* Not Auth Route */}
          <Route
            exact
            path='/not-authorized'
            render={() => (
              <Layouts.HeaderLayout>
                <NotAuthorized />
              </Layouts.HeaderLayout>
            )}
          />

          {ResolveRoutes()}

          {/* NotFound Error page */}
          <Route path='*' component={ErrorNotFound} />
        </Switch>
      </HistoryWrapper>
    </AppRouter>
  )
}

export default Router
