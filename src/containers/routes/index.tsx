import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { routes } from '../../config/constants';
import { initApp } from '../../redux/thunks/init';
import history from '../../history';
import { AppState } from '../../redux/types/state';

import Auth from '../auth';
import Main from '../main';
import News from '../news';
import ProtectedRoute from './protected';
import Layout from './layout-route';

const mapStateToProps = (state: AppState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      initApp
    },
    dispatch
  );

const enhance = connect(mapStateToProps, mapDispatchToProps);

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class Routes extends Component<Props> {
  async componentDidMount() {
    await this.props.initApp();
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Layout exact path={routes.main} component={Main} />
          <Route exact path={routes.auth} component={Auth} />
          <ProtectedRoute exact path={routes.news} component={News} />
          <ProtectedRoute exact path={`${routes.news}/:authorId?/:page?`} component={News} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </ConnectedRouter>
    );
  }
}

export default enhance(Routes);
