import React, { Suspense, lazy } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './history';
import { connect } from 'react-redux';
import Spinner from './components/@vuexy/spinner/Loading-spinner';
import { ContextLayout } from './utility/context/Layout';

// Route-based code splitting
const Home = lazy(() => import('./views/pages/Home'));

const Page2 = lazy(() => import('./views/pages/Page2'));

const Users = lazy(() => import('./views/pages/Users'));
const EditUser = lazy(() => import('./views/pages/EditUser'));

const login = lazy(() => import('./views/pages/authentication/login/Login'));

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  isLoading,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === 'horizontal'
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  {isLoading && (
                    <div className="data-loading">
                      <Spinner />
                    </div>
                  )}
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
    isLoading: state.layout.isLoading,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={Home} />
          <AppRoute path="/page2" component={Page2} />
          <AppRoute path="/users" component={Users} />
          <AppRoute path="/user/edit" component={EditUser} />
          <AppRoute path="/pages/login" component={login} fullLayout />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
