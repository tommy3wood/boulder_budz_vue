<template>
  <div id="app">
    <!-- blogen header -->
    <div id="menu-content" class="menu-overlay">
      <a href="javascript:void(0)" id="menu-close-btn" class="close-btn"><i class="mdi mdi-close"></i></a>
      <div class="menu-overlay-content">
        <div class="container">
          <div id="fullwidthmenu">
            <div class="menu-main-menu-container">
              <ul id="menu-main-menu" class="menu">
                <li class="menu-item">
                  <a href="/Signup" >Signup</a>
                </li>
  <!--               <li class="menu-item current-menu-item menu-item-has-children">
                  <a>Account</a>
                  <ul class="sub-menu">
                    <li class="menu-item"><a href="/Login">Login</a></li>
                    <li class="menu-item"><a href="/Logout">Logout</a></li>
                    <li class="menu-item"><a href="/users/:id">Activity</a></li>
                    <li class="menu-item"><a href="/users/:id/edit">Customize Profile</a></li>
                  </ul>
                </li>  -->

 <!--                <li class="menu-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Account
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="/Login">Login</a>
                    <a class="dropdown-item" href="/Logout">Logout</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="/users/:id">Activity</a>
                    <a class="dropdown-item" href="/users/:id/edit">Customize</a>
                  </div>
                </li> -->

                <li class="menu-item">
                  <a href="/Login">Login</a>
                </li>
                <li class="menu-item">
                  <a href="/Logout">Logout</a>
                </li>
                </li>             
                <li class="menu-item">
                  <a href="/">Questions Index</a> 
                </li>
                <li class="menu-item">
                  <a href="/questions/new">New Question</a>
                </li>
                <li class="menu-item">
                  <a href="/users/:id">User Activity</a>
                </li>
                <li class="menu-item">
                  <a href="/users/:id/edit">Customize Profile</a>
                </li>
              </ul>
            </div>                    
          </div>
        </div>
      </div>
    </div>

    <header class="header">     
        <div class="topbar">
          <div class="container">
            <div class="row">
              <div class="col-lg-6">
                <div class="topbar-left">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item"><a href="mailto:xpanthersolutions@gmail.com" class="contact-list-item text-dim"><i class="mdi mdi-email"></i>literallydonaldtrump@whitehouse.gov</a></li>                    
                  </ul>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="topbar-right">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item"><a href="tel:+19876543210" class="contact-list-item text-dim"><i class="mdi mdi-phone"></i>+1 (911)-867-5309</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="headerbar">
          <div class="container">
            <div class="row">
              <div class="col-3 col-md-3">
                <div class="menubar">
                  <a id="menu-open-btn" class="btn-header">
                    <i class="mdi mdi-menu"></i>
                  </a>
                </div>
              </div>
              <div class="col-6 col-md-6">
                <div class="logobar text-center">
                  <a href="/"><img src="/images/logo_small.png" class="img img-responsive" alt="logo"/></a>
                </div>
              </div>
              <div class="col-3 col-md-3">
                <div class="searchbar text-right">
                  <a id="search-open-btn" class="btn-header">
                    <i class="mdi mdi-magnify"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
    </header>
    <!-- end blogen header -->
    <div id="nav">
      
      
      
       
    </div>
    
    <router-view/>
    <footer class="footer section text-center">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                  <div class="footer-logo">
                       <img src="/images/logo_small.png" class="img img-responsive" alt="logo"/>
                    </div>
                    <div class="footer-social">
                        <ul class="list-inline social mb-0">
                            <li class="list-inline-item"><a href="#" class="social-icon"><i class="mdi mdi-facebook"></i> Facebook</a></li>
                            <li class="list-inline-item"><a href="#" class="social-icon"><i class="mdi mdi-twitter"></i> Twitter</a></li>
                            <li class="list-inline-item"><a href="#" class="social-icon"><i class="mdi mdi-instagram"></i> Instagram</a></li>                                
                            <li class="list-inline-item"><a href="#" class="social-icon"><i class="mdi mdi-google-plus"></i> Google +</a></li>
                            <li class="list-inline-item"><a href="#" class="social-icon"><i class="mdi mdi-linkedin"></i> LinkedIn</a></li>
                        </ul>
                    </div>                        
                    <div class="footer-copyright">
                        <p class="copy-rights mb-0">© 2020 Tommy3Wood. All Right Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  </div>
</template>

<style>
</style>
