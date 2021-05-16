import { combineReducers } from 'redux';
import vacationReducer from './vacationReducer';
const reducers = combineReducers({
    repositories: vacationReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
