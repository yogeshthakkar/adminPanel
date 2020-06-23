import React, { Suspense, lazy } from "react"
import { Router, Switch, Route } from "react-router-dom"
import { history } from "./history"
import { connect } from "react-redux"
import Spinner from "./components/@vuexy/spinner/Loading-spinner"
import { ContextLayout } from "./utility/context/Layout"

// Route-based code splitting
const Home = lazy(() =>
  import("./views/pages/Home")
)

const Page2 = lazy(() =>
  import("./views/pages/Page2")
)
const Page3 = lazy(() =>
  import('./views/pages/Page3')
)
const Admins = lazy(() =>
  import('./views/pages/Admins')
)
const NewsFeed = lazy(() =>
  import('./views/pages/NewsFeed')
)
const CreateNewsFeed = lazy(() =>
  import('./views/pages/CreateNewsFeed')
)
const EditNewsFeed = lazy(() =>
  import('./views/pages/EditNewsFeed')
)
const PlayDates = lazy(() =>
  import('./views/pages/PlayDates')
)
const UpdatePlayDate = lazy(() =>
  import('./views/pages/UpdatePlayDate')
)
const CreatePlayDate = lazy(() =>
  import('./views/pages/CreatePlayDate')
)

const Articles = lazy(() =>
  import('./views/pages/Articles')
)
const CreateArticle = lazy(() =>
  import('./views/pages/CreateArticle')
)
const UpdateArticle = lazy(() =>
  import('./views/pages/UpdateArticle')
)
const ReportedUser = lazy(() =>
  import('./views/pages/ReportedItems/ReportedUser')
)
const ReportedNewsFeed = lazy(() =>
  import('./views/pages/ReportedItems/ReportedNewsFeed')
)

const Users = lazy(() =>
  import('./views/pages/Users')
)
const EditUser = lazy(()=>
  import('./views/pages/EditUser') 
)
const Nachrichten = lazy(() =>
  import('./views/pages/Nachrichten')
)

const OnboardingFragen = lazy(() =>
  import('./views/pages/OnboardingFragen')
)

const KikudooAgreement = lazy(() =>
  import('./views/pages/KikudooAgreement')
)
const updateAdmin = lazy(()=>
  import('./views/updateAdmin')
) 
const createAdmin = lazy(()=>
  import('./views/createAdmin')
) 
const login = lazy(() =>
  import("./views/pages/authentication/login/Login")
)

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  isLoading,
  user,
  ...rest
}) => (
<<<<<<< HEAD
    <Route
      {...rest}
      render={props => {
        return (
          <ContextLayout.Consumer>
            {context => {
              let LayoutTag =
                fullLayout === true
                  ? context.fullLayout
                  : context.state.activeLayout === "horizontal"
                    ? context.horizontalLayout
                    : context.VerticalLayout
              return (
                <LayoutTag {...props} permission={props.user}>
                  <Suspense fallback={<Spinner />}>
                    <Component {...props} />
                  </Suspense>
                </LayoutTag>
              )
            }}
          </ContextLayout.Consumer>
        )
      }}
    />
  )
const mapStateToProps = state => {
  return {
    user: state.auth.login.userRole
  }
}
=======
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
>>>>>>> d6ee3b01ca2052c7d87fcbfa8a030545ac8a5727

const AppRoute = connect(mapStateToProps)(RouteConfig)

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute
            exact
            path="/"
            component={Home}
          />
          <AppRoute
            path="/page2"
            component={Page2}
          />
          <AppRoute
            path="/page3"
            component={Page3}
          />
          <AppRoute
            path="/admins"
            component={Admins}
          />
          <AppRoute
            path="/updateAdmin"
            component={updateAdmin}
          />
          <AppRoute
            path="/createAdmin"
            component={createAdmin}
          />
          <AppRoute
            path="/newsFeed"
            component={NewsFeed}
          />
          <AppRoute
            path="/createNewsFeed"
            component={CreateNewsFeed}
          />
          <AppRoute
            path="/editNewsFeed"
            component={EditNewsFeed}
          />
          <AppRoute
            path="/playDates"
            component={PlayDates}
          />
          <AppRoute
          path="/updatePlayDate"
          component={UpdatePlayDate}
        />
        <AppRoute
        path="/createPlayDate"
        component={CreatePlayDate}
      />
          <AppRoute
            path="/articles"
            component={Articles}
          />
          <AppRoute
            path="/createArticle"
            component={CreateArticle}
          />
          <AppRoute
            path="/updateArticle"
            component={UpdateArticle}
          />
          <AppRoute
            path="/users"
            component={Users}
          />
          <AppRoute
            path="/reportedUser"
            component={ReportedUser}
          />
          <AppRoute
            path="/reportedNewsFeed"
            component={ReportedNewsFeed}
          />
          <AppRoute
            path="/edit"
            component={EditUser}
          />
          <AppRoute
            path="/nachrichten"
            component={Nachrichten}
          />
          <AppRoute
            path="/onboarding-fragen"
            component={OnboardingFragen}
          />
          <AppRoute
            path="/kikudoo-agreement"
            component={KikudooAgreement}
          />
          <AppRoute
            path="/pages/login"
            component={login}
            fullLayout
          />
        </Switch>
      </Router>
    )
  }
}

export default AppRouter
