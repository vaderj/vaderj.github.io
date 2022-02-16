import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container,Row, Col } from 'react-bootstrap';
//import {MarsCalendar} from '../shared/MarsCalendar';
//import { green } from '@mui/material/colors';
//import Icon from '@mui/material/Icon';
//import { loadCSS } from 'fg-loadcss';


export const HomeComponent:React.FunctionComponent<{debug:boolean;}> = (props) => {
    /*React.useEffect(() => {
        const node = loadCSS(
          'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
          // Inject before JSS
          document.querySelector('#font-awesome-css') || document.head.firstChild,
        );
    
        return () => {
          node.parentNode!.removeChild(node);
        };
      }, []);*/

    return <Container >    
        <Row>
            <Col xs={12}>
                Home
{/*                <Icon baseClassName="fas" className="fa-plus-circle" />
      <Icon baseClassName="fas" className="fa-plus-circle" color="primary" />
      <Icon
        baseClassName="fas"
        className="fa-plus-circle"
        sx={{ color: green[500] }}
      />
      <Icon baseClassName="fas" className="fa-plus-circle" fontSize="small" />
      <Icon baseClassName="fas" className="fa-plus-circle" sx={{ fontSize: 30 }} /> */}

            </Col>
        </Row>
        {
            props.debug ? 
            <Row>
                <Col xs={12}>
                    Debug text
                </Col>
            </Row> : null
        }
    </Container>;
};
