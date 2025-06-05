import React from 'react';
import { Link } from 'react-router-dom';
import './notFound.css';

const NotFound = () => {
  return (
    <section className="notFound">
      <div class="mensaje">
        <img
          src="/images/unicornio.png"
          alt="unicornio"
          className="unicornio"
        />
        <h1>Upssss!</h1>
        <p >
          Esta parcela solo existe en tus sueños. Pero tenemos otras igual de
          buenas 
        </p>
        <p className='pb-2'>( ¡o mejores! )</p>
        <Link type='button' to="/" className="camperNature">CamperNature</Link>
      </div>
    </section>
  );
};

export default NotFound;
