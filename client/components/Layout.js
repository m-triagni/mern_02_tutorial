import Head from "next/head"
import Link from 'next/link'
import Router from 'next/router'
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import React, { useState, useEffect } from 'react';
import { isAuth, logout, user_role, getCookie} from '../utils/auth';
 
import { API } from './../config';
import { listAPI } from './../listAPI';
import { listPage } from '../listPage';
import { listEnum } from '../listEnum';

//Set route event for progress bar
Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

const Layout = ({ children}) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);
 
    const loadCategories = async () => {
        const response = await axios.get(`${API}${listAPI.API_CategoryList}`);
        setCategories(response.data);
    };
 
    const head = () => ( 
        <React.Fragment> 
            <title>Programming Catalog</title>
            <link href="/static/img/PC.png" rel="icon"/>

             <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"></link>    
             <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous"></link>
             
             <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
             <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
             <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script> 
        
             <link href="/static/css/styles.css" rel="stylesheet"/> 
        </React.Fragment>
    ) 

    const nav = () => (
        <React.Fragment>
             <header id="header"> 
                <div className="container"> 
                    <nav className="navbar navbar-expand-md navbar-dark custom-navbar">
                        {navBrand()}
                        {navToggleButton()}
                        {navLinks()}
                    </nav>
                </div>
            </header>
        </React.Fragment>
    )
   
    const navBrand = () => (
        <div className="logo">
            <h1><a href="/">Programming<span>Catalog</span></a></h1>  
        </div>
    )

    const navToggleButton = () => (
        <button className="navbar-toggler ml-auto custom-navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar"> 
		    <span className="navbar-toggler-icon"></span>
	    </button>
    )

    const navLinks = () => (
        <div className="collapse navbar-collapse justify-content-stretch" id="collapsibleNavbar">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/#newestLinks">Newest Link</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/#popularLinks">Popular Link</a>
                </li>  
                {navLinksCategory()}
                {navLinksUser()}
            </ul>
	    </div>
    )
 
    const navLinksCategory = () => (
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                Category
            </a>
            <div className="dropdown-menu">
                <ul>
                    {navLinksCategoryItems()}
                </ul>
            </div>
        </li>
    )
  
    const navLinksCategoryItems = () => categories.map((c,i) => ( 
         <li key={c.slug}> 
                <a href={`${listPage.Page_Link_ListByCategory}/${c.slug}`}>
                     {c.name} 
                </a> 
        </li>  
    ))
 
    const navLinksUser = () => { 
        const auth = isAuth();
  
        if (process.browser) {
 
            if (auth === undefined) {
                return (
                    <React.Fragment>
                        <li className="nav-item" >
                            <a className="navbutton" href={listPage.Page_Login}> Sign In </a>
                        </li> 
                        <li className="nav-item">
                            <a className="navbutton" href={listPage.Page_Registration}> Sign Up </a> 
                        </li>    
                    </React.Fragment>
                )
            }
            else {
                if (auth.role === listEnum.user.role.subscriber){
                    return (
                        <React.Fragment>
                            <li><a className="navbutton" href={listPage.Page_User}>My Page</a></li>  
                            <li><a className="navbutton" onClick={logout}>Logout</a></li> 
                        </React.Fragment>

                    )
                }
                else if (auth.role === listEnum.user.role.admin){
                    console.log('admin page');
                    return (
                        <React.Fragment>
                            <li><a className="navbutton" href={listPage.Page_Admin}>Admin Page</a></li>  
                            <li><a className="navbutton" onClick={logout}>Logout</a></li> 
                        </React.Fragment>
 
                    )
                }
            }
             
        }
        
 
    }
 

    const footer = () => (
        <footer id="footer"> 
            <div className="footer-top"> 
                <div className="container"> 
                    <div className="row  justify-content-center">
                        <div className="col-lg-6">
                            <h3>Subscription</h3>
                            <p>Submit your email to get the latest tutorial link.</p>
                        </div>
                    </div>

                    <div className="row footer-newsletter justify-content-center">
                        <div className="col-lg-6">
                            <form action="" method="post">
                                <input type="email" name="email" placeholder="Enter your Email"/>
                                <input type="submit" value="Subscribe" />
                            </form>
                        </div>
                    </div> 
                </div>
            </div>

            <div className="container footer-bottom clearfix">
                <div className="copyright">
                    &copy; Copyright <strong><span>PROGRAMMINGCATALOG</span></strong>. All Rights Reserved
                </div>
                <div className="credits">
                    Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>.
                    Icon by <a href="https://iconscout.com/contributors/pixel-icons" target="_blank">Pixel Icons</a>
                     
                </div>
            </div>
        </footer> 
    ) 
 
    return (
        <React.Fragment> 
            {head()} {nav()} {children} {footer()}
        </React.Fragment>
    );
}
 
export default Layout;