import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './new-components/LoginPage';
import NavSidebar from './new-components/NavSidebar';
import Allvideos from './new-components/Videos/Allvideos';
import Career from './new-components/Career/Career';
import Blogs from './new-components/Blogs/Blogs';
import AddBlogForm from './new-components/Blogs/AddBlogForm';
import EditBlogForm from './new-components/Blogs/EditBlogForm';
import AddCareerForm from './new-components/Career/AddCareerForm';
import EditCareerForm from './new-components/Career/EditCareerForm';
import TrendingLoans from './new-components/TrendingLoans/TrendingLoans';
import AddTrendingLoansForm from './new-components/TrendingLoans/AddTrendingLoansForm';
import EditTrendingLoansForm from './new-components/TrendingLoans/EditTrendingLoansForm';
import AddVideoForm from './new-components/Videos/AddVideoForm';
import EditVideoForm from './new-components/Videos/EditVideoForm';
import Requirements from './new-components/Requirements/Requirements';
import UnitDetails from './new-components/Query/Query';
import AddDeveloperForm from './new-components/Developer/AddDeveloperForm';
import EditDeveloperForm from './new-components/Developer/EditDeveloperForm';
import Dashboard from './new-components/Dashboard/Dashboard';
import User from './new-components/User/User';
import Query from './new-components/Query/Query';
import Category from './new-components/Category/Category';
import AddCategory from './new-components/Category/AddCategory';
export const history = createHistory();
const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <NavSidebar>
          <Route exact path="/users"  component={User} />
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
