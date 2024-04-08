import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import Home from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import CustomerPage from "./pages/CustomerPage";
import { Progressbar } from "./component/Progressbar";
import { ProgressbarDropdown } from "./component/ProgressbarDropdown";
import { GenerateProgressbar } from "./component/GenerateProgressbar";

import Navbar from "./component/navbar";
import Footer from "./component/footer";
import Services from './pages/Services';
import Products from './pages/Products';
import SignUp from './pages/SignUp';

// import { NewWorkOrder} from "./component/NewWorkOrder";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/log-in" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<Progressbar />} path="/progressbar" />
                        <Route element={<ProgressbarDropdown />} path="/progressbar-dropdown" />
                        <Route element={<GenerateProgressbar />} path="/generate-progressbar" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<CustomerPage />} path="/customerpage" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
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
