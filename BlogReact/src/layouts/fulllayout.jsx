import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../components/header/header.jsx';
import Sidebar from '../components/sidebar/sidebar.jsx';
import Footer from '../components/footer/footer.jsx';
import Customizer from '../components/customizer/customizer';
import ThemeRoutes from '../routes/routing.jsx';

class Fulllayout extends React.Component {
  /*--------------------------------------------------------------------------------*/
  /*Change the layout settings [HEADER,SIDEBAR && DARK LAYOUT] from here            */
  /*--------------------------------------------------------------------------------*/
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.state = {
      isOpen: false,
      width: window.innerWidth,
      settings: [
        {
          theme: 'light',
          layout: 'horizontal',
          dir: 'ltr',
          sidebartype: 'full',
          sidebarpos: 'fixed',
          headerpos: 'fixed',
          boxed: 'boxed',
          navbarbg: 'skin4',
          sidebarbg: 'skin6',
          logobg: 'skin4'
        }
      ]
    };

    this.props.history.listen((location, action) => {
      if (
        window.innerWidth < 767 &&
        document
          .getElementById('main-wrapper')
          .className.indexOf('show-sidebar') !== -1
      ) {
        document
          .getElementById('main-wrapper')
          .classList.toggle('show-sidebar');
      }
    });
  }
  /*--------------------------------------------------------------------------------*/
  /*Life Cycle Hook, Applies when loading or resizing App                           */
  /*--------------------------------------------------------------------------------*/
  componentDidMount() {
    window.addEventListener('load', this.updateDimensions);
    window.addEventListener('resize', this.updateDimensions);
  }
  /*--------------------------------------------------------------------------------*/
  /*Function that handles sidebar, changes when resizing App                        */
  /*--------------------------------------------------------------------------------*/
  updateDimensions() {
    let element = document.getElementById('main-wrapper');
    this.setState({
      width: window.innerWidth
    });
    switch (this.state.settings[0].sidebartype) {
      case 'full':
      case 'iconbar':
        if (this.state.width < 1170) {
          element.setAttribute('data-sidebartype', 'mini-sidebar');
          element.classList.add('mini-sidebar');
        } else {
          element.setAttribute(
            'data-sidebartype',
            this.state.settings[0].sidebartype
          );
          element.classList.remove('mini-sidebar');
        }
        break;

      case 'overlay':
        if (this.state.width < 767) {
          element.setAttribute('data-sidebartype', 'mini-sidebar');
        } else {
          element.setAttribute(
            'data-sidebartype',
            this.state.settings[0].sidebartype
          );
        }
        break;

      default:
    }
    if (this.state.settings[0].sidebarpos === 'fixed') {
      document.getElementById('sidebar-position').setAttribute('checked', '');
    }
    if (this.state.settings[0].headerpos === 'fixed') {
      document.getElementById('header-position').setAttribute('checked', '');
    }
    if (this.state.settings[0].theme === 'dark') {
      document.getElementById('theme-view').setAttribute('checked', '');
    }
    if (this.state.settings[0].boxed === 'boxed') {
      document.getElementById('boxed-layout').setAttribute('checked', '');
    }
  }
  /*--------------------------------------------------------------------------------*/
  /*Life Cycle Hook                                                                 */
  /*--------------------------------------------------------------------------------*/
  componentWillUnmount() {
    window.removeEventListener('load', this.updateDimensions);
    window.removeEventListener('resize', this.updateDimensions);
  }
  /*--------------------------------------------------------------------------------*/
  /*Theme Setting && Changes default(LIGHT) THEME to DARK COLOR:-                   */
  /*--------------------------------------------------------------------------------*/
  darkTheme = a => {
    if (a.target.checked) {
      let darktheme = JSON.parse(JSON.stringify(this.state.settings));
      darktheme[0].theme = 'dark';
      this.setState({ settings: darktheme });
    } else {
      let lighttheme = JSON.parse(JSON.stringify(this.state.settings));
      lighttheme[0].theme = 'light';
      this.setState({ settings: lighttheme });
    }
  };
  /*--------------------------------------------------------------------------------*/
  /*Theme Setting && Changes Default(FULL) LAYOUT to BOXED LAYOUT                   */
  /*--------------------------------------------------------------------------------*/
  boxedTheme = b => {
    if (b.target.checked) {
      let boxtheme = JSON.parse(JSON.stringify(this.state.settings));
      boxtheme[0].boxed = 'boxed';
      this.setState({ settings: boxtheme });
    } else {
      let fulltheme = JSON.parse(JSON.stringify(this.state.settings));
      fulltheme[0].boxed = 'full';
      this.setState({ settings: fulltheme });
    }
  };
  /*--------------------------------------------------------------------------------*/
  /*Theme Setting && Changes Default(FIXED) POSITION of HEADER to ABSOLUTE POSITION */
  /*--------------------------------------------------------------------------------*/
  headerPosition = c => {
    if (c.target.checked) {
      let fixedpos = JSON.parse(JSON.stringify(this.state.settings));
      fixedpos[0].headerpos = 'fixed';
      this.setState({ settings: fixedpos });
    } else {
      let absolutepos = JSON.parse(JSON.stringify(this.state.settings));
      absolutepos[0].headerpos = 'absolute';
      this.setState({ settings: absolutepos });
    }
  };
  /*--------------------------------------------------------------------------------*/
  /*Theme Setting && Changes Default(FIXED) POSITION of SIDEBAR to ABSOLUTE POSITION*/
  /*--------------------------------------------------------------------------------*/
  sidebarPosition = d => {
    if (d.target.checked) {
      let sidebarfixedpos = JSON.parse(JSON.stringify(this.state.settings));
      sidebarfixedpos[0].sidebarpos = 'fixed';
      this.setState({ settings: sidebarfixedpos });
    } else {
      let sidebarabsolutepos = JSON.parse(JSON.stringify(this.state.settings));
      sidebarabsolutepos[0].sidebarpos = 'absolute';
      this.setState({ settings: sidebarabsolutepos });
    }
  };
  /*--------------------------------------------------------------------------------*/
  /*Theme Setting && Changes NAVBAR BACKGROUND-COLOR from given options             */
  /*--------------------------------------------------------------------------------*/
  navbarbgChange = e => {
    let navskin = e.currentTarget.dataset.navbarbg;
    let newsettings = JSON.parse(JSON.stringify(this.state.settings));
    newsettings[0].navbarbg = navskin;
    this.setState({
      settings: newsettings
    });
  };
  /*--------------------------------------------------------------------------------*/
  /*Theme Setting && Changes SIDEBAR-MENU BACKGROUND-COLOR from given options       */
  /*--------------------------------------------------------------------------------*/
  sidebarbgChange = f => {
    let sidebarskin = f.currentTarget.dataset.sidebarbg;
    let newsettings = JSON.parse(JSON.stringify(this.state.settings));
    newsettings[0].sidebarbg = sidebarskin;
    this.setState({
      settings: newsettings
    });
  };
  /*--------------------------------------------------------------------------------*/
  /*Theme Setting && Changes LOGO BACKGROUND-COLOR from given options               */
  /*--------------------------------------------------------------------------------*/
  logobgChange = g => {
    let logoskin = g.currentTarget.dataset.logobg;
    let newsettings = JSON.parse(JSON.stringify(this.state.settings));
    newsettings[0].logobg = logoskin;
    this.setState({
      settings: newsettings
    });
  };
  render() {
    /*--------------------------------------------------------------------------------*/
    /* Theme Setting && Layout Options wiil be Change From Here                       */
    /*--------------------------------------------------------------------------------*/
    return (
      <div
        id="main-wrapper"
        dir={this.state.settings[0].dir}
        data-theme={this.state.settings[0].theme}
        data-layout={this.state.settings[0].layout}
        data-sidebartype={this.state.settings[0].sidebartype}
        data-sidebar-position={this.state.settings[0].sidebarpos}
        data-header-position={this.state.settings[0].headerpos}
        data-boxed-layout={this.state.settings[0].boxed}
      >
        {/*--------------------------------------------------------------------------------*/}
        {/* Header                                                                         */}
        {/*--------------------------------------------------------------------------------*/}
        <Header data={this.state} />
        {/*--------------------------------------------------------------------------------*/}
        {/* Sidebar                                                                        */}
        {/*--------------------------------------------------------------------------------*/}
        <Sidebar data={this.state} {...this.props} routes={ThemeRoutes} />
        {/*--------------------------------------------------------------------------------*/}
        {/* Page Main-Content                                                              */}
        {/*--------------------------------------------------------------------------------*/}
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            <Switch>
              {ThemeRoutes.map((prop, key) => {
                if (prop.navlabel) {
                  return null;
                } else if (prop.collapse) {
                  return prop.child.map((prop2, key2) => {
                    if (prop2.collapse) {
                      return prop2.subchild.map((prop3, key3) => {
                        return (
                          <Route
                            path={prop3.path}
                            component={prop3.component}
                            key={key3}
                          />
                        );
                      });
                    }
                    return (
                      <Route
                        path={prop2.path}
                        component={prop2.component}
                        key={key2}
                      />
                    );
                  });
                } else if (prop.redirect) {
                  return (
                    <Redirect from={prop.path} to={prop.pathTo} key={key} />
                  );
                } else {
                  return (
                    <Route
                      path={prop.path}
                      component={prop.component}
                      key={key}
                    />
                  );
                }
              })}
            </Switch>
          </div>
          <Footer />
        </div>
        {/*--------------------------------------------------------------------------------*/}
        {/* Customizer from which you can set all the Layout Settings                      */}
        {/*--------------------------------------------------------------------------------*/}
        <Customizer
          darkTheme={this.darkTheme}
          boxedTheme={this.boxedTheme}
          rtl={this.rtl}
          headerPosition={this.headerPosition}
          sidebarPosition={this.sidebarPosition}
          navbarbgChange={this.navbarbgChange}
          sidebarbgChange={this.sidebarbgChange}
          logobgChange={this.logobgChange}
        />
      </div>
    );
  }
}
export default Fulllayout;
