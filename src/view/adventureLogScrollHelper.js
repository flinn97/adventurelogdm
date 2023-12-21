import React, { useEffect } from 'react';

export const ScrollHelper = (props) => {


  useEffect( () => {
    
    props.scroll();
    // return()=>{
    //   // props.scroll();
    // }
    // Send request to your server to increment page view count
  }, []);

  

  return (
    <div>
    </div>
  );
}