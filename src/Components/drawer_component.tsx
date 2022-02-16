import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
//import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

//import InboxIcon from '@mui/icons-material/MoveToInbox';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
//import CastleIcon from '@mui/icons-material/Castle';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
//import MyLocationIcon from '@mui/icons-material/MyLocation';
import CabinIcon from '@mui/icons-material/Cabin';

//import DeleteIcon from '@mui/icons-material/Delete';
import Icon from '@mui/material/Icon';
import createSvgIcon from '@mui/material/utils/createSvgIcon';
import { loadCSS } from 'fg-loadcss';

const D3Icon = createSvgIcon(<path transform="scale(.25)" d="M0,0h7.75a45.5,45.5 0 1 1 0,91h-7.75v-20h7.75a25.5,25.5 0 1 0 0,-51h-7.75zm36.2510,0h32a27.75,27.75 0 0 1 21.331,45.5a27.75,27.75 0 0 1 -21.331,45.5h-32a53.6895,53.6895 0 0 0 18.7464,-20h13.2526a7.75,7.75 0 1 0 0,-15.5h-7.75a53.6895,53.6895 0 0 0 0,-20h7.75a7.75,7.75 0 1 0 0,-15.5h-13.2526a53.6895,53.6895 0 0 0 -18.7464,-20z"/>,'D3Icon');
const GithubIcon = createSvgIcon(<path transform="scale(1.5)" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />,'Github');
const HackadayIOIcon = createSvgIcon(<path  transform="scale(.77)" d="m 4.1004257,1.4015907 c -0.3431628,0 -0.6762923,0.041143 -0.9946741,0.1182445 L 5.7106857,3.9995696 2.6536272,6.9140377 0.1252064,4.5003785 c -0.0569943,0.2606812 -0.090423,0.5334491 -0.090423,0.8103493 0,2.1582352 1.8220203,3.909137 4.0656432,3.909137 0.3889033,0 0.7636245,-0.054762 1.1198784,-0.1530232 L 8.8233909,12.690795 C 9.3515194,11.26855 10.755575,10.027691 12.002173,9.2476954 L 8.1452029,5.7176403 c 0.014368,-0.1335408 0.020866,-0.2697328 0.020866,-0.4069125 0,-2.1582255 -1.822023,-3.9091371 -4.0656447,-3.9091371 z M 27.798713,1.5441826 c -2.243622,0 -4.065643,1.7509117 -4.065643,3.909137 -1e-6,0.1371886 0.0065,0.2733718 0.02088,0.4069126 l -3.856978,3.5335295 c 1.246599,0.7799963 2.650655,2.0173803 3.178785,3.4396243 l 3.603086,-3.6239519 c 0.356252,0.09822 0.730975,0.1530315 1.119878,0.1530315 2.243622,0 4.065645,-1.7509111 4.065645,-3.909146 0,-0.2769002 -0.03343,-0.5461939 -0.09042,-0.8068656 L 29.245524,7.0601038 26.188467,4.1456358 28.793399,1.6659107 C 28.475013,1.5887449 28.141883,1.5441826 27.79872,1.5441826 Z M 15.820888,9.004241 C 12.8363,8.999701 9.9973863,10.80286 8.7573103,13.803717 c -1.4604494,3.534145 -0.2133902,7.557268 2.7788257,9.619824 -0.17702,0.782207 -0.05011,2.048312 0.963377,2.274535 1.041487,0.232474 1.539787,-0.351875 1.843274,-1.029453 l 0.0104,-0.05565 c 0.155114,0.03091 0.310649,0.05571 0.466036,0.07651 0.05225,0.6538 0.366737,1.112439 1.342464,1.081621 0.897349,-0.02834 1.24435,-0.590196 1.366807,-1.21726 0.05236,-0.01246 0.104436,-0.02815 0.156505,-0.04173 l 0.02435,0.156504 c 0.303487,0.677577 0.801788,1.261927 1.843277,1.029454 1.141844,-0.254873 1.154962,-1.826526 0.879903,-2.542333 1.03099,-0.801886 1.878868,-1.881738 2.420605,-3.192695 L 23.07572,19.357892 C 24.334102,15.446769 22.488518,11.244895 18.8014,9.633732 17.828652,9.2086715 16.815719,9.0057458 15.820854,9.0042383 Z m -3.310945,6.454948 c 0.140207,-6.25e-4 0.284714,0.01051 0.431258,0.03478 1.11669,0.184755 1.4781,0.759093 1.4781,1.227692 0.03606,0.901151 -0.937409,1.188788 -1.4781,1.405066 -0.959452,0.245849 -1.186757,0.692424 -1.516356,1.512877 0,0 -1.13549,-1.180558 -0.90077,-2.451906 0.205924,-1.115382 1.004438,-1.723612 1.985868,-1.728508 z m 6.562764,0.07304 c 0.981434,0.005 1.776468,0.613126 1.982395,1.728508 0.234718,1.271349 -0.900772,2.451907 -0.900773,2.451907 -0.329597,-0.820454 -0.553428,-1.267029 -1.512879,-1.51288 -0.540691,-0.216276 -1.514146,-0.507389 -1.478098,-1.408542 0,-0.468598 0.361412,-1.039459 1.478098,-1.224213 0.146547,-0.02425 0.291054,-0.03547 0.431257,-0.03478 z m -3.140527,4.180415 c 0.793015,0.03605 0.792957,2.451907 0.792957,2.451907 1e-6,-1e-6 -0.685762,-0.940296 -0.865994,-0.90425 -0.180229,0.03605 -0.431254,1.192914 -0.431254,1.192914 0,0 -0.180585,-2.596387 0.504291,-2.740571 z M 7.974787,19.813497 5.1507464,22.613193 C 4.7968927,22.510869 4.4241073,22.45321 4.0378238,22.45321 c -2.2285122,0 -4.037821125,1.824189 -4.037821125,4.0726 0,0.288471 0.030336305,0.570082 0.086948505,0.841649 L 2.6014599,24.85295 5.6376514,27.88914 3.0501067,30.473205 c 0.3162365,0.08037 0.6468671,0.125204 0.9877178,0.125204 2.2285113,0 4.0378212,-1.824191 4.0378212,-4.072599 0,-0.142914 -0.00667,-0.285176 -0.020857,-0.424302 l 2.5771043,-2.55276 C 9.429496,22.585952 8.4993665,21.295177 7.9747936,19.813502 Z m 16.050425,0 c -0.524574,1.481676 -1.454703,2.77245 -2.657102,3.735246 l 2.57711,2.552765 c -0.01428,0.139126 -0.02087,0.281388 -0.02087,0.424302 0,2.248408 1.80931,4.072599 4.037822,4.072599 0.340853,0 0.671481,-0.04484 0.987719,-0.125204 l -2.587543,-2.584065 3.036191,-3.03619 2.514508,2.514509 c 0.05661,-0.271567 0.08695,-0.553178 0.08695,-0.841649 0,-2.248411 -1.809308,-4.0726 -4.037821,-4.0726 -0.386283,0 -0.759068,0.05765 -1.112922,0.159983 z"/>,'Hackaday')
const ThingiverseIcon = createSvgIcon(<path transform="scale(.047)" d="M256 512C114.615 512 0 397.385 0 256S114.615 0 256 0s256 114.615 256 256-114.615 256-256 256zm0-36.571c121.187 0 219.429-98.242 219.429-219.429S377.187 36.571 256 36.571 36.571 134.813 36.571 256 134.813 475.429 256 475.429zm32.722-269.474v219.428h-65.444V205.955h-92.39V140.51h250.225v65.444z" />,'Thingiverse');
type Anchor = 'top' | 'left' | 'bottom' | 'right';

export interface IDrawerProps{
  open:boolean;
  callback:any;
  homeCloseCallback:any;
  countOpenCloseCallback:any;
  d3Callback:any;
  leafletCallback:any;
  fieldorgCallback:any;
}

export const TemporaryDrawer:React.FunctionComponent<IDrawerProps> = (props) => {
  const [state, setState] = React.useState({
    top: false,
    left: props.open,
    bottom: false,
    right: false,
  });

  React.useEffect(() => {
    setState({ 
      top: false,
      left: props.open,
      bottom: false,
      right: false,
     });
  }, [props.open])

  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
      // Inject before JSS
      document.querySelector('#font-awesome-css') || document.head.firstChild,
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, [])

  console.log("TemporaryDrawer component => props : ",props);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      props.callback(open);
      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <ListItem button key={'Close Menu'} onClick={toggleDrawer(anchor, false)} >
            <ListItemIcon>
              <Icon baseClassName="fas" className="fa-times" sx={{ color:"red" }} />
            </ListItemIcon>
            <ListItemText primary={'Close Menu'} />
          </ListItem>

      <Divider />

        <ListItem button key={'home'} onClick={()=>{props.homeCloseCallback(true)}}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>

          <ListItem button key={'d3'} onClick={()=>{props.d3Callback(true)}}>
            <ListItemIcon>
               <D3Icon />
            </ListItemIcon>
            <ListItemText primary={'d3'} />
          </ListItem>

          <ListItem button key={'leaflet'} onClick={()=>{props.leafletCallback(true)}} >
            <ListItemIcon>
              <MapIcon /> 
            </ListItemIcon>
            <ListItemText primary={'leaflet'} />
          </ListItem>

          <ListItem button key={'countOpenClose'} onClick={()=>{props.countOpenCloseCallback(true)}}>
            <ListItemIcon>
              <HourglassTopIcon /> 
            </ListItemIcon>
            <ListItemText primary={'Count Open/Close countdown'} />
          </ListItem>

          <ListItem button key={'fieldorg'} onClick={()=>{props.fieldorgCallback(true)}}>
            <ListItemIcon>
              <CabinIcon /> 
            </ListItemIcon>
            <ListItemText primary={'FieldOrg'} />
          </ListItem>
          
      </List>
      <Divider />
      <List>
        {/*['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))/*}*/}

          <ListItem button key={'githubLinkKeyId'} onClick={()=> window.open("http://github.com/vaderj", "_tab")} > 
            <ListItemIcon>
              <GithubIcon />
            </ListItemIcon>
            <ListItemText primary={'Github'} />
          </ListItem>

          <ListItem button key={'hackadayLinkKeyId'} onClick={()=> window.open("https://hackaday.io/vader", "_tab")} > 
            <ListItemIcon>
              <HackadayIOIcon />
            </ListItemIcon>
            <ListItemText primary={'Hackaday.io'} />
          </ListItem>
          <ListItem button key={'thingiversLinkKeyId'} onClick={()=> window.open("https://www.thingiverse.com/vaderj", "_tab")} > 
            <ListItemIcon>
              <ThingiverseIcon />
            </ListItemIcon>
            <ListItemText primary={'Thingiverse'} />
          </ListItem>
      </List>
    </Box>
  );
/*
  return (
    <div>
      {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>*/

    return (
      <div>
        
            <Drawer
              anchor={'left'}
              open={props.open}
              onClose={toggleDrawer('left', false)}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {list('left')}
            </Drawer>
        
        
      </div>
  );
}