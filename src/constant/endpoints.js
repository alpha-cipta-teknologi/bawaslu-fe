import navigationEndpoints from './endpoints/navigation'
import authEndpoints from './endpoints/auth'
import globalEndpoints from './endpoints/global'
import paramGlobalEndpoints from './endpoints/params'
import reportEndpoints from './endpoints/report'

export default {
  ...navigationEndpoints,
  ...authEndpoints,
  ...globalEndpoints,
  ...paramGlobalEndpoints,
  ...reportEndpoints
}
