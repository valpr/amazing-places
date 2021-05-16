/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actionCreators, dispatch);
};
