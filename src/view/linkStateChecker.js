import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const LinkStateChecker = (props) => {

  const location = useLocation();
  const receivedData = location.state;
  useEffect( () => {
    console.log("data",receivedData);

  if(receivedData?.ref){
    props.dispatch(receivedData);

  }
  else{
    props.dispatch({ref:undefined})
  }
    
  }, [location]);

  

  return (
    <div>
    </div>
  );
}
