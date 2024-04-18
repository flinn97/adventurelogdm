import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const EncounterLinkHelper = (props) => {

  const location = useLocation();
  const receivedData = location.state;
  useEffect( () => {

    props.dispatch(receivedData);

 
  }, [location]);

  

  return (
    <div>
    </div>
  );
}
