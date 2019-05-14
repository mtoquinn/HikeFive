import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import groupReducer from './groupReducer';
import postReducer from './postReducer';
import memberReducer from './memberReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  group: groupReducer,
  member: memberReducer
});
