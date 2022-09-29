import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory as createHistory } from 'history';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddBlogForm from './new-components/Blogs/AddBlogForm';
import Blogs from './new-components/Blogs/Blogs';
import AddCategory from './new-components/Category/AddCategory';
import Category from './new-components/Category/Category';
import Dashboard from './new-components/Dashboard/Dashboard';
import AddDeveloperForm from './new-components/Developer/AddDeveloperForm';
import EditDeveloperForm from './new-components/Developer/EditDeveloperForm';
import LoginPage from './new-components/LoginPage';
import NavSidebar from './new-components/NavSidebar';
import { default as Query, default as UnitDetails } from './new-components/Query/Query';
import AddUser from './new-components/User/AddUser';
import EditUser from './new-components/User/EditUser';
import User from './new-components/User/User';
import AddVideoForm from './new-components/Videos/AddVideoForm';
import Allvideos from './new-components/Videos/Allvideos';
import EditVideoForm from './new-components/Videos/EditVideoForm';
export const history = createHistory();
const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <NavSidebar>
          <Route exact path="/users"  component={User} />
          <Route exact path="/users/add"  component={AddUser} />
          <Route exact path="/user/:id"  component={EditUser} />
          <Route path="/Query" exact component={Query} />
          <Route path="/category" exact component={Category} />
          <Route path="/category/add" exact component={AddCategory} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route exact path="/allvideos" component={Allvideos} />
          <Route path="/allvideos/add" exact component={AddVideoForm} />
          <Route path="/allvideos/edit/:id/" exact component={EditVideoForm} />
          <Route
            path="/property/unitdetail/:id"
            exact
            component={UnitDetails}
          />
          {/* <Route
            path="/property/unitdetail/add/:id"
            exact
            component={AddUnitDetailsForm}
          /> */}
          <Route
            path="/property/adddev/:id"
            exact
            component={AddDeveloperForm}
          />
          <Route
            path="/property/editdev/:id"
            exact
            component={EditDeveloperForm}
          />
          {/* <Route path="/prop/req" exact component={Requirements} />
          <Route path="/career" exact component={Career} />
          <Route path="/career/add" exact component={AddCareerForm} />
          <Route path="/career/edit/:id" exact component={EditCareerForm} /> */}
          <Route path="/blogs" exact component={Blogs} />
          <Route path="/blog/add" exact component={AddBlogForm} />
          {/* <Route path="/blog/edit/:id/" component={EditBlogForm} />
          <Route path="/featuredprojects" exact component={FeaturedProject} />
          <Route
            path="/featuredprojects/add"
            exact
            component={AddFeaturedProjectForm}
          />
          <Route
            path="/featuredprojects/edit/:id"
            component={EditFeaturedProjectForm}
          />
          <Route path="/trendingloans" exact component={TrendingLoans} />
          <Route
            path="/trendingloans/add"
            exact
            component={AddTrendingLoansForm}
          />
          <Route
            path="/trendingloans/edit/:id"
            component={EditTrendingLoansForm}
          />
          <Route path="/contacts" exact component={ContactUs} /> */}
        </NavSidebar>
      </Switch>
    </Router>
  );
};

export default App;
