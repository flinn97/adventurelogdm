import { useLocation } from "react-router-dom";
import React, { useEffect } from 'react';

export const URLcheck = (props) => {

  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    if(props.onChange){
        props.onChange();
    }
    // Send request to your server to increment page view count
  }, [location]);

  return (
    <div>
    </div>
  );
}