import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
const Spinner = ({size}) => {
    return (
        <Dimmer active inverted>
            <Loader size={size} />
        </Dimmer>
    )
}
export default Spinner;