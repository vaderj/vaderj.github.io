import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container,Row, Col } from 'react-bootstrap';
import { SPFetchClient } from "@pnp/nodejs";
import { sp,SPRest } from "@pnp/sp";
import { bootstrap } from 'pnp-auth'

/*

    <AppPermissionRequests>
      <AppPermissionRequest Scope="http://sharepoint/content/sitecollection" Right="FullControl"/>
    </AppPermissionRequests>

*/

const credentialOptions = {
    'clientId' : 'fbf1b7b9-d927-4c0a-b856-2ef5206ab3d0',
    'clientSecret' : 'spwa3LxDzgH/Z17IvWmZpuynOueBj0FquaH0KPuVslE='
  }

const siteUrl = 'https://vader-web.sharepoint.com' ;

export const FieldOrgComponent:React.FunctionComponent<{debug:boolean;}> = (props) => {
    // we call setup to use the node client
    //bootstrap(sp as any, credentialOptions, siteUrl);
    //const w = sp.web();
    //console.log(JSON.stringify(w, null, 2));
/*
    sp.setup({
        sp: {
            fetchClientFactory: () => {
                return new SPFetchClient(siteUrl, credentialOptions.clientId, credentialOptions.clientSecret);
            },
        },
    });*/
    
    


    return <Container >    
        <Row>
            <Col xs={12}>
                FieldOrg
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
