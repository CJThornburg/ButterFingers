import React from 'react';
import './Page404.css'
import Footer from '../Footer';

const Page404 = () => {
  return (
    <div className='div-404'>
      <h1 className='wgt HFont'>404 - Page Not Found</h1>
      <p className='yt pFont'>Seems like somebody's dealing with a case of butter fingers!</p>

      <div className="text-footer">

        <Footer></Footer>
      </div>
    </div>

  );
};

export default Page404;
