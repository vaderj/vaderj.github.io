import * as React from 'react';

import {Breadcrumbs,Link,Typography} from '@mui/material'

export const Breadcrumb:React.FunctionComponent<{debug:boolean;}> = (props) => {
    return <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
            MUI
        </Link>
        <Link
            underline="hover"
            color="inherit"
            href="/getting-started/installation/" >
            Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
        { props.debug ? <Link
            underline="hover"
            color="red"
            href="/getting-started/installation/" >
            Debug
        </Link> : null}
  </Breadcrumbs>;
};
