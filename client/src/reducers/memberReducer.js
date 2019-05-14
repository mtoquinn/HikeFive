import {
  GET_MEMBERS,
  MEMBER_LOADING
} from '../actions/types';

const initialState = {
  members: null,
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MEMBER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_MEMBERS:
      return {
        ...state,
        members: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
