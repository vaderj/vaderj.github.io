import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
//import styles from '../stylesheets/leafletStyles.module.scss';
import 'leaflet/dist/leaflet.css';

//import { Container,Row, Col } from 'react-bootstrap';
//import {MarsCalendar} from '../shared/MarsCalendar';
import { MapContainer,  GeoJSON } from "react-leaflet";
import L from "leaflet";

import conusJSON from '../shared/conus.js' ;

const stateLabelAdjustments = [
  {'abbr':'al','offsetPos':[890,-730]},
  {'abbr':'ak','offsetPos':[0,0]},
  {'abbr':'az','offsetPos':[900,-1250]},
  {'abbr':'ar','offsetPos':[930,-1020]},
  {'abbr':'ca','offsetPos':[980,-1250]},

  {'abbr':'co','offsetPos':[680,-1200]},
  {'abbr':'ct','offsetPos':[700,-1200]},
  {'abbr':'de','offsetPos':[700,-1200]},
  {'abbr':'fl','offsetPos':[700,-1200]},
  {'abbr':'ga','offsetPos':[700,-1200]},
  
  {'abbr':'hi','offsetPos':[20,20]},
  {'abbr':'id','offsetPos':[20,20]},
  {'abbr':'il','offsetPos':[20,20]},
  {'abbr':'in','offsetPos':[20,20]},
  {'abbr':'ia','offsetPos':[20,20]},

  {'abbr':'ks','offsetPos':[20,20]},
  {'abbr':'ky','offsetPos':[-50,20]},
  {'abbr':'la','offsetPos':[35,20]},
  {'abbr':'me','offsetPos':[0,20]},
  {'abbr':'md','offsetPos':[0,10]},

  {'abbr':'ma','offsetPos':[20,20]},
  {'abbr':'mi','offsetPos':[-20,-10]},
  {'abbr':'mn','offsetPos':[20,20]},
  {'abbr':'ms','offsetPos':[5,40]},
  {'abbr':'mo','offsetPos':[20,20]},

  {'abbr':'mt','offsetPos':[20,20]},
  {'abbr':'ne','offsetPos':[20,20]},
  {'abbr':'nv','offsetPos':[20,40]},
  {'abbr':'nh','offsetPos':[10,20]},
  {'abbr':'nj','offsetPos':[10,20]},

  {'abbr':'nm','offsetPos':[10,20]},
  {'abbr':'ny','offsetPos':[-10,10]},
  {'abbr':'nc','offsetPos':[10,20]},
  {'abbr':'nd','offsetPos':[10,20]},
  {'abbr':'oh','offsetPos':[10,20]},
  
  {'abbr':'ok','offsetPos':[10,20]},
  {'abbr':'or','offsetPos':[10,20]},
  {'abbr':'pa','offsetPos':[10,20]},
  {'abbr':'ri','offsetPos':[0,0]},
  {'abbr':'sc','offsetPos':[10,20]},

  {'abbr':'sd','offsetPos':[10,20]},
  {'abbr':'tn','offsetPos':[10,20]},
  {'abbr':'tx','offsetPos':[20,70]},
  {'abbr':'ut','offsetPos':[10,20]},
  {'abbr':'vt','offsetPos':[20,10]},
  
  {'abbr':'va','offsetPos':[20,10]},
  {'abbr':'wa','offsetPos':[-20,10]},
  {'abbr':'wv','offsetPos':[10,20]},
  {'abbr':'wi','offsetPos':[35,0]},
  {'abbr':'wy','offsetPos':[10,20]},

  {'abbr':'dc','offsetPos':[0,0]},
  {'abbr':'pr','offsetPos':[0,0]},

];


export const LeafletComponent:React.FunctionComponent<{debug:boolean;}> = (props) => {
    if(props.debug){console.log("LeafletComponent, conusJSON",conusJSON);}
    const [stateName, setStateName] = React.useState('');

    const highlightFeature = (e) => {
        if(props.debug){console.log("LeafletComponent.highlightFeature, L.Browser",L.Browser);}
        var layer = e.target;
        setStateName( layer.feature.properties.name);
        layer.setStyle({
            weight: 1,
            color: '#DC4405',
            dashArray: '',
            fillOpacity: 0.5
        });
    
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

  const resetHighlight = (e) => {
    if(props.debug){console.log("LeafletComponent.resetHighlight, L.Browser",L.Browser);}

    var layer = e.target;
    layer.setStyle({
        weight: 1,
        color: '#CCCDCF',
        dashArray: '',
        fillOpacity: 0.5
    });
    setStateName('');

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
  }

  const highlightDC = (e) => {
    setStateName('District of Columbia');
  }

  const resetHighlighDC = (e) => {
    setStateName('');
  }

  const updateDataPanelRowOption = (e) => {

    var stateAbbreviation = e.target.feature.properties.abbr;
    /*var thisStateObj = this.props.items.filter(x=>x.stateAbbr == stateAbbreviation)[0];
    let thisStausVal = this.state.status;
    let thisTitleVal = this.state.stateName;

    let thisDataVal = `
    <span class=${styles.column}>
      <span class=${ styles.label }>Status</span> 
      <span class=${ styles.description }>${thisStausVal}</span> 
    </span>
    <span class=${styles.column}>
      <span class=${ styles.label }>Title</span> 
      <span class =${ styles.description }>${thisTitleVal}</span> 
    </span>
    `    ;
    document.getElementById("dataValues").innerHTML=thisDataVal;
    this.setState({
      thisState: thisStateObj,
      stateAbbr: stateAbbreviation,
      showPanel: true
    });*/
  }

  const dcClickHandler = (e) => {
    /*var thisStateObj = this.props.items.filter(x=>x.stateAbbr == "dc")[0];
    this.setState({
      thisState: thisStateObj,
      stateAbbr: "dc",
      showPanel: true
    });*/
  }

  const onEachFeatureDataPanel = (feature, layer) => {
    //if(props.debug){console.log("LeafletComponent.onEachFeatureDataPanel, feature",feature);}
    //if(props.debug){console.log("LeafletComponent.onEachFeatureDataPanel, layer",layer);}

    var thisStateOffset = stateLabelAdjustments.filter(x => x.abbr == feature.properties.abbr)[0] ;
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: updateDataPanelRowOption
    }).bindTooltip(
      feature.properties.abbr,{
        interactive: true,
        permanent:true,
        //direction:'auto',
        className: feature.properties.abbr,
        //offset: thisStateOffset ? thisStateOffset.offsetPos : [0,0]
      }); 
  }

  const style = (feature) => {
    return {
      weight: 1,
      color: "#CCCDCF",
      fillOpacity: 0.5,
      className: feature.properties.abbr,
    };
  }
    
   
    return <div>
        <MapContainer
            style={{ height: "520px", width: "100%",/* backgroundColor: this.props.backgroundColor, background: this.props.backgroundColor,*/ }}
            //style={{ width: "100%" }}
            zoom={4}
            center={[37, -95]}
            attributionControl={false}
            zoomControl={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            dragging={false}
            touchZoom={false}
            keyboard={false} >
            <GeoJSON 
                data={conusJSON as any}
                onEachFeature={onEachFeatureDataPanel} 
                style={style} />{}
        </MapContainer>
                <span  onClick={dcClickHandler} onMouseOver={highlightDC} onMouseLeave={resetHighlighDC}>dc</span>
        
    </div>;
};