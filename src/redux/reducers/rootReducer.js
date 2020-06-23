import { combineReducers } from 'redux';
import customizer from './customizer/';
import auth from './auth/';
import navbar from './navbar/Index';
import LayoutReducer from './layoutReducer';

const rootReducer = combineReducers({
  customizer: customizer,
  auth: auth,
  navbar: navbar,
  layout: LayoutReducer,
});

export default rootReducer;
