//import logo from './logo.svg';
//import './App.css';
import styles from './stylesheets/style.module.scss';
import * as React from 'react';

import {TemporaryDrawer} from './Components/drawer_component.tsx';

import { HomeComponent } from './Components/home_component.tsx';
import {CountOpenCloseComponent} from './Components/marscalendar_component.tsx';
import { D3Component } from './Components/d3_component.tsx';
import { LeafletComponent } from './Components/leaflet_component.tsx';

import { FieldOrgComponent } from './Components/fieldorg_component.tsx';

import { AppBarComponent } from './Components/app_bar_component.tsx';

const data = [
  {year: 1980, efficiency: 24.3, sales: 8949000},
  {year: 1985, efficiency: 27.6, sales: 10979000},
  {year: 1990, efficiency: 28, sales: 9303000},
  {year: 1991, efficiency: 28.4, sales: 8185000},
  {year: 1992, efficiency: 27.9, sales: 8213000},
  {year: 1993, efficiency: 28.4, sales: 8518000},
  {year: 1994, efficiency: 28.3, sales: 8991000},
  {year: 1995, efficiency: 28.6, sales: 8620000},
  {year: 1996, efficiency: 28.5, sales: 8479000},
  {year: 1997, efficiency: 28.7, sales: 8217000},
  {year: 1998, efficiency: 28.8, sales: 8085000},
  {year: 1999, efficiency: 28.3, sales: 8638000},
  {year: 2000, efficiency: 28.5, sales: 8778000},
  {year: 2001, efficiency: 28.8, sales: 8352000},
  {year: 2002, efficiency: 29, sales: 8042000},
  {year: 2003, efficiency: 29.5, sales: 7556000},
  {year: 2004, efficiency: 29.5, sales: 7483000},
  {year: 2005, efficiency: 30.3, sales: 7660000},
  {year: 2006, efficiency: 30.1, sales: 7762000},
  {year: 2007, efficiency: 31.2, sales: 7562000},
  {year: 2008, efficiency: 31.5, sales: 6769000},
  {year: 2009, efficiency: 32.9, sales: 5402000},
  {year: 2010, efficiency: 33.9, sales: 5636000},
  {year: 2011, efficiency: 33.1, sales: 6093000},
  {year: 2012, efficiency: 35.3, sales: 7245000},
  {year: 2013, efficiency: 36.4, sales: 7586000},
  {year: 2014, efficiency: 36.5, sales: 7708000},
  {year: 2015, efficiency: 37.2, sales: 7517000},
  {year: 2016, efficiency: 37.7, sales: 6873000},
  {year: 2017, efficiency: 39.4, sales: 6081000},
]

const App = (props) => {
  const [isOpen, setOpenState] = React.useState(false);
  const [showHome, setHome] = React.useState(true);

  const [showCountOpenClose, setCountOpenClose] = React.useState(false);
  const [showD3, setD3] = React.useState(false);
  const [showLeaflet, setLeaflet] = React.useState(false);

  const [showFieldOrg, setFieldOrg] = React.useState(false);




  const CountdownComponentAppBarMenuBtn_Callback = (openBool) => {
    console.log("CountdownComponentAppBarMenuBtn_Callback() called => value : ",openBool);
    if (openBool){
      setCountOpenClose(true);
      setHome(false);
      setD3(false);
      setLeaflet(false);
      setFieldOrg(false);
    }
    else{
      setCountOpenClose(false);
      setD3(false);
      setLeaflet(false);
      setHome(true);
      setFieldOrg(false);
    }
  }

  const D3ComponentAppBarMenuBtn_Callback = (openBool) => {
    console.log("D3ComponentAppBarMenuBtn_Callback() called => value : ",openBool);
    if (openBool){
      setHome(false);
      setCountOpenClose(false);
      setD3(true);
      setLeaflet(false);
      setFieldOrg(false);
    }
    else{
      setHome(true);
      setCountOpenClose(false);
      setD3(false);
      setLeaflet(false);
      setFieldOrg(false);
    }
  }

  const LeafletComponentAppBarMenuBtn_Callback = (openBool) => {
    console.log("LeafletComponentAppBarMenuBtn_Callback() called => value : ",openBool);
    if (openBool){
      setHome(false);
      setCountOpenClose(false);
      setD3(false);
      setLeaflet(true);
      setFieldOrg(false);
    }
    else{
      setHome(true);
      setCountOpenClose(false);
      setD3(false);
      setLeaflet(false);
      setFieldOrg(false);
    }
  }

  const HomeComponentAppBarMenuBtn_Callback = (openBool) => {
    console.log("HomeComponentAppBarMenuBtn_Callback() called => value : ",openBool);
    if (openBool){
      setHome(true);
      setCountOpenClose(false);
      setD3(false);
      setLeaflet();
      setFieldOrg(false);
    }
    else{
      setHome(true);
      setCountOpenClose(false);
      setD3(false);
      setLeaflet(false);
      setFieldOrg(false);
    }
  }

  const FieldOrgComponentAppBarMenuBtn_Callback = (openBool) => {
    console.log("FieldOrgComponentAppBarMenuBtn_Callback() called => value : ",openBool);
    if (openBool){
      setHome(false);
      setCountOpenClose(false);
      setD3(false);
      setLeaflet(false);
      setFieldOrg(true);
    }
    else{
      setHome(true);
      setCountOpenClose(false);
      setD3(false);
      setLeaflet(false);
      setFieldOrg(false);
    }
  }

  const appBarMenuBtn_Callback = (openBool) => {
    console.log("appBarMenuBtn_Callback() called => value : ",openBool);
    if (openBool){
      setOpenState(true);
    }
    else{
      setOpenState(false);
    }
  }

  if(props.debug){console.log("App called", this)}
  return (
    <div className={styles.App}>
      
      <header className="App-header">
        {/* <Breadcrumb debug={props.debug} /> */}
        <AppBarComponent
          open={isOpen}
          callback={appBarMenuBtn_Callback}
         />
      </header>
      
      <TemporaryDrawer
        open={isOpen}
        callback={appBarMenuBtn_Callback}
        homeCloseCallback={HomeComponentAppBarMenuBtn_Callback}
        countOpenCloseCallback={CountdownComponentAppBarMenuBtn_Callback}
        d3Callback={D3ComponentAppBarMenuBtn_Callback}
        leafletCallback={LeafletComponentAppBarMenuBtn_Callback}
        fieldorgCallback={FieldOrgComponentAppBarMenuBtn_Callback}
      />

    {
      showHome ?
        <div className={styles.home} >
          <br />
          <HomeComponent 
            debug={props.debug}
          />
      </div>

      : null
    }

    {
      showD3 ?
        <div className={styles.d3Comp} >
          <br />
          <D3Component 
            debug={props.debug}
            data={data}
          />
      </div>

      : null
    }
  
    {
      showLeaflet ?
        <div className={styles.leafletComp} >
          <br />
          <LeafletComponent 
            debug={props.debug}
          />
      </div>

      : null
    }

    {
      showCountOpenClose ?
        <div className={styles.countdown} >
          <br />
          <CountOpenCloseComponent 
            debug={props.debug}
            isAdmin={false}
            testEnvironment={false}
            quarterEndOverrideVal={false}
            countOverride={false}
          />
      </div>

      : null
    }

{
      showFieldOrg ?
        <div className={styles.fieldorg} >
          <br />
          <FieldOrgComponent 
            debug={props.debug}
          />
      </div>

      : null
    }
    </div>
  );
}

export default App;
