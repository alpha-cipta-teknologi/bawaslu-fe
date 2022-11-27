export default {
  // ==== Control Panel ====
  // ** Menu 
  getDataMenu: {
    path: '/menu',
    method: 'GET'
  },
  getMenuDetail: menuId => ({
    path: `/menu/${ menuId }`,
    method: 'GET'
  }),
  actionMenu: {
    path: '/menu/action',
    method: 'POST'
  },
  deleteMenu: {
    path: '/menu/delete',
    method: 'POST'
  },

  // ** Role
  getDataRole: {
    path: '/role',
    method: 'GET'
  },
  getRoleDetail: roleId => ({
    path: `/role/${ roleId }`,
    method: 'GET'
  }),
  actionRole: {
    path: '/role/action',
    method: 'POST'
  },
  deleteRole: {
    path: '/role/delete',
    method: 'POST'
  },

  // ** Role Menu
  getDataRoleMenu: {
    path: '/role_menu',
    method: 'GET'
  },
  getRoleMenuDetail: roleMenuId => ({
    path: `/role_menu/${ roleMenuId }`,
    method: 'GET'
  }),
  actionRoleMenu: {
    path: '/role_menu/action',
    method: 'POST'
  },
  deleteRoleMenu: {
    path: '/role_menu/delete',
    method: 'POST'
  },

  // ** Jabatan
  getDataJabatan: {
    path: '/jabatan',
    method: 'GET'
  },
  getJabatanDetail: jabatanId => ({
    path: `/jabatan/${ jabatanId }`,
    method: 'GET'
  }),
  actionJabatan: {
    path: '/jabatan/action',
    method: 'POST'
  },
  deleteJabatan: {
    path: '/jabatan/delete',
    method: 'POST'
  },

  // ** User Access
  getDataUser: {
    path: '/users',
    method: 'GET'
  },
  getUserDetail: userId => ({
    path: `/users/${ userId }`,
    method: 'GET'
  }),
  actionUser: {
    path: '/users/action',
    method: 'POST'
  },
  deleteUser: {
    path: '/users/delete',
    method: 'POST'
  }
}