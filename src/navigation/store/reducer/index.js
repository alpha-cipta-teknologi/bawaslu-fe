// ** Import action types
import { LOGOUT } from '../actionTypes'

// ** Initial State
const initialState = {
  allData: [
    {
      menu_id: 1,
      menu_name: 'Beranda',
      menu_icon: '',
      module_name: 'home',
      type_menu: '',
      seq_number: 0,
      parent_id: 0,
      status: '',
      auth: false
    },
    {
      menu_id: 2,
      menu_name: 'Forum',
      menu_icon: '',
      module_name: 'forum',
      type_menu: '',
      seq_number: 1,
      parent_id: 0,
      status: '',
      auth: false
    },
    {
      menu_id: 3,
      menu_name: 'Bawaslu Update',
      menu_icon: '',
      module_name: 'bawaslu-update',
      type_menu: '',
      seq_number: 2,
      parent_id: 0,
      status: '',
      auth: false
    },
    {
      menu_id: 4,
      menu_name: 'Galeri',
      menu_icon: '',
      module_name: 'gallery',
      type_menu: '',
      seq_number: 3,
      parent_id: 0,
      status: '',
      auth: false
    },
    {
      menu_id: 5,
      menu_name: 'Profil',
      menu_icon: '',
      module_name: 'profile',
      type_menu: '',
      seq_number: 4,
      parent_id: 0,
      status: '',
      auth: true
    }
    // {
    //   menu_id: 6,
    //   menu_name: 'Pengaduan',
    //   menu_icon: '',
    //   module_name: 'pengaduan',
    //   type_menu: '',
    //   seq_number: 5,
    //   parent_id: 0,
    //   status: ''
    // }
  ]
}

const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return initialState

    default:
      return {
        ...state,
        allData: initialState.allData
      }
  }
}

export default navigationReducer
