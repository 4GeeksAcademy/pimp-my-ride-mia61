import React, {useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import Home from "./pages/home";

import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Progressbar } from "./component/Progressbar";
import { ProgressbarDropdown } from "./component/ProgressbarDropdown";
import { GenerateWoSteps } from "./component/GenerateWoSteps";
// import { PictureSlider } from "./component/PictureSlider";

import Navbar from "./component/navbar";
import Footer from "./component/footer";
import Services from './pages/Services';
import Products from './pages/Products';
import SignUp from './pages/SignUp';
import UserDashboard from "./pages/UserDashboard";
import { UserLogin } from "./pages/UserLogin";
import { CustomerLogin } from "./pages/CustomerLogin";
import { CustomerDashboard } from "./pages/CustomerDashboard";
import { CustomerSignup } from "./pages/CustomerSignup";
import {CustomerWorkOrder} from "./pages/CustomerWorkOrder"
import { WorkOrderDetails } from "./pages/WorkOrderDetails";
import QuickSearchModal from "./component/QuickSearchModal";
import ResetPassword from "./pages/ResetPassword";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;


    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<UserLogin setIsLoggedIn={setIsLoggedIn} />} path="/user-log-in" />
                        <Route element={<CustomerLogin setIsLoggedIn={setIsLoggedIn} />} path="/customer-log-in" />
                        <Route element={<CustomerDashboard />} path="/customer-dashboard" />
                        <Route element={<CustomerWorkOrder />} path="/customer-work-order/:workOrderId" />
                        <Route element={<CustomerSignup />} path="/customer-signup" />
                        <Route element={<Progressbar />} path="/progressbar" />
                        <Route element={<ProgressbarDropdown />} path="/progressbar-dropdown" />
                        <Route element={<GenerateWoSteps />} path="/generate-wo-steps" />
                        <Route element={<UserDashboard />} path="/user-dashboard" /> 
                        <Route element={<QuickSearchModal />} path="/quick-search" />
                        <Route element={<WorkOrderDetails />} path="/order/details/:theid" />

                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path='/services' exact element={ <Services />}></Route>
                        <Route path='/products' exact element={ <Products />}></Route>
                        <Route path='/sign-up' exact element={ <SignUp />}></Route>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
