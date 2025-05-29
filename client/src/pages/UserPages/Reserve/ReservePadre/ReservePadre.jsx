import React, { useState } from 'react';
import Reserve_3 from '../Reserve_3/Reserve_3';
import { Reserve_4 } from '../Reserve_4/Reserve_4';
import {Reserve_1} from '../Reserve_1/Reserve_1';

const ReservePadre = () => {
  const [showReserve, setShowReserve] = useState(1);
  const [firstSelected, setFirstSelected] = useState();
  const [secondSelected, setSecondSelected] = useState();
  const [reservaData, setReservaData] = useState({});

  return (
    <>
      {showReserve === 1 && (
        <Reserve_1
          firstSelected={firstSelected}
          setFirstSelected={setFirstSelected}
          secondSelected={secondSelected}
          setSecondSelected={setSecondSelected}
          
          reservaData={reservaData}
          setReservaData={setReservaData}
          setShowReserve={setShowReserve}
        />
      )}
      {showReserve === 3 && <Reserve_3 />}
      {showReserve === 4 && <Reserve_4 />}

     
      
    </>
  );
};

export default ReservePadre;
