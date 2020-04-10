import { connect } from 'react-redux';
import * as Redux from 'redux';

import { GetHomePage } from '../../actions';
import { APIRequestKeys } from '../../api';
import { Models } from '../../common/models';
import { Reducer as AppReducer } from '../../reducers';
import * as Selectors from '../../selectors';
import View from './View';

export type StateProps = {
    home: Models.HomePage | null;
    apiStatus: Models.APIFetchStatus;
};

export type DispatchProps = {
    getHomePage: () => GetHomePage.Request;
};


const mapStateToProps = (state: AppReducer.State) => {
    return {
        home: state.entities.home,
        apiStatus: Selectors.API.getAPIStatus(
            state,
            APIRequestKeys.GET_SHOP_HOME
        )
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        ...Redux.bindActionCreators({
            getHomePage: GetHomePage.request
        }, dispatch)
    }
};

export const HomePage = connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(View);