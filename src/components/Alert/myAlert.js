import React from 'react';
import { UncontrolledAlert } from 'reactstrap';

const CustomAlert = (props) => {
  return (
    <UncontrolledAlert
      color='danger'
      style={{ width: '350px', marginLeft: '13px', marginTop: '5px' }}
    >
      {props.message}
    </UncontrolledAlert>
  );
}

export default CustomAlert;