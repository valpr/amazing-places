import { combineReducers } from 'redux';
import vacationReducer from './vacationReducer';
const reducers = combineReducers({
    vacations: vacationReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
