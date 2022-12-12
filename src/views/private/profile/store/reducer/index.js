import { GET_DATA_PROFILE, LOGOUT } from '../actionTypes'

// **  Initial State
const initialState = {
  profile: {
    resource_id: 0,
    role_id: 0,
    username: '',
    email: '',
    full_name: '',
    place_of_birth: '',
    date_of_birth: '',
    telepon: '',
    image_foto: '',
    status: '',
    total_login: 0,
    area_province_id: null,
    area_regencies_id: null,
    created_by: 0,
    created_date: '',
    modified_by: 0,
    modified_date: '',
    role: {},
    province: null,
    regency: null,
    ability: []
  }
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_PROFILE:
      return {
        ...state,
        profile: action.data
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}

export default profileReducer
