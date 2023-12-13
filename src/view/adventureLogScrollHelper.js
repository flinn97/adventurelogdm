import React, { useEffect } from 'react';

export const ScrollHelper = (props) => {


  useEffect(async () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
                await delay(1000);
    props.scroll();
    return()=>{
      props.scroll();
    }
    // Send request to your server to increment page view count
  }, []);

  return (
    <div>
    </div>
  );
}