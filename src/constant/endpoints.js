import navigationEndpoints from './endpoints/navigation'
import authEndpoints from './endpoints/auth'
import controlPanelEndpoints from './endpoints/control_panel'
import territoryEndpoints from './endpoints/territory'
import gffEndpoints from './endpoints/gff'
import outletEndpoints from './endpoints/outlet'
import configAppsEndpoints from './endpoints/config_apps'
import reportEndpoints from './endpoints/report'
import promoEndpoints from './endpoints/promo'
import skuActiveEndpoints from './endpoints/sku_active'
import productCompetitorEndpoints from './endpoints/product_competitor'
import brandEndpoints from './endpoints/brand'
import productEndpoints from './endpoints/product'
import skuMcsEndpoints from './endpoints/sku_mcs'
import reqNewOutletEndpoints from './endpoints/req_new_outlet'
import paramGlobalEndpoints from './endpoints/params'
import absenSalesmanEndpoints from './endpoints/absen_salesman'
import drcDashboardEndpoints from './endpoints/drc_dashboard'
import appDashboardEndpoints from './endpoints/app_dashboard'
import reportSLOBEndpoints from './endpoints/SLOB'

export default {
  ...navigationEndpoints,
  ...authEndpoints,
  ...controlPanelEndpoints,
  ...territoryEndpoints,
  ...gffEndpoints,
  ...outletEndpoints,
  ...configAppsEndpoints,
  ...reportEndpoints,
  ...promoEndpoints,
  ...skuActiveEndpoints,
  ...productCompetitorEndpoints,
  ...brandEndpoints,
  ...productEndpoints,
  ...skuMcsEndpoints,
  ...reqNewOutletEndpoints,
  ...paramGlobalEndpoints,
  ...absenSalesmanEndpoints,
  ...drcDashboardEndpoints,
  ...appDashboardEndpoints,
  ...reportSLOBEndpoints
}
