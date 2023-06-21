import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory as createHistory } from 'history';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAdds from './new-components/Adds/AddAdds';
import Adds from './new-components/Adds/Adds';
import EditAdds from './new-components/Adds/EditAdds';
import Announcement from './new-components/Announcement/Announcement';
import LoginPage from './new-components/LoginPage';
import NavSidebar from './new-components/NavSidebar';
import AddUser from './new-components/User/AddUser';
import EditUser from './new-components/User/EditUser';
import UploadBulkUser from './new-components/User/UploadBulkUser';
import User from './new-components/User/User';

export const history = createHistory();
const App = () => {
  return (
      <Router>
          <Switch>
              <Route path="/" exact component={LoginPage} />
              <NavSidebar>
                  <Route exact path="/users" component={User} />
                  <Route exact path="/users/add" component={AddUser} />
                  <Route
                      exact
                      path="/users/bulk-add"
                      component={UploadBulkUser}
                  />
                  <Route exact path="/user/:id" component={EditUser} />
                  <Route path="/adds" exact component={Adds} />
                  <Route path="/announcement" exact component={Announcement} />
                  <Route path="/adds/add" component={AddAdds} />
                  <Route path="/adds/edit/:id" exact component={EditAdds} />
                  {/* <Route path="/Query" exact component={Query} />
          <Route path="/category" exact component={Category} />
          <Route path="/category/add" exact component={AddCategory} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route exact path="/allvideos" component={Allvideos} />
          <Route path="/allvideos/add" exact component={AddVideoForm} />
          <Route path="/allvideos/edit/:id/" exact component={EditVideoForm} />
          <Route
            path="/property/unitdetail/:id"
            exact
            component={UnitDetails} */}
                  {/* <Route
            path="/property/unitdetail/add/:id"
            exact
            component={AddUnitDetailsForm}
          /> */}
                  {/* <Route
            path="/property/adddev/:id"
            exact
            component={AddDeveloperForm}
          />
          <Route
            path="/property/editdev/:id"
            exact
            component={EditDeveloperForm}
          /> */}
                  {/* <Route path="/prop/req" exact component={Requirements} />
          <Route path="/career" exact component={Career} />
          <Route path="/career/add" exact component={AddCareerForm} />
          <Route path="/career/edit/:id" exact component={EditCareerForm} />
          <Route path="/blogs" exact component={Blogs} />
          <Route path="/blog/add" exact component={AddBlogForm} />
          <Route path="/blog/edit/:id/" component={EditBlogForm} />
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
                  <ToastContainer
                      position="top-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      closeOnClick={true}
                      pauseOnHover={true}
                      draggable={true}
                      progress={undefined}
                  />
              </NavSidebar>
          </Switch>
      </Router>
  );
};

export default App;
