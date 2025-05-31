import React, { useState } from 'react';
import Reserve_3 from '../Reserve_3/Reserve_3';
import { Reserve_4 } from '../Reserve_4/Reserve_4';
import {Reserve_1} from '../Reserve_1/Reserve_1';
import { Reserve_2 } from '../Reserve_2/Reserve_2';

const ReservePadre = () => {
  const [showReserve, setShowReserve] = useState(1);
  const [firstSelected, setFirstSelected] = useState();
  const [secondSelected, setSecondSelected] = useState();
  const [reservaData, setReservaData] = useState({});
  const [parcelId, setParcelId] = useState();
  const [message, setMessage] = useState('');
  const [totalDays, setTotalDays] = useState();
  const [userDetails, setUserDetails] = useState();
  console.log('reservaData', reservaData);
  console.log('userDetails', userDetails);
  
  const cancel = () =>{
    setShowReserve(1);
    setFirstSelected();
    setSecondSelected();
    setReservaData({});
    setParcelId();
    setMessage("");
    setTotalDays();
  }
  
  
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
          parcelId={parcelId}
          setParcelId={setParcelId}
          message={message}
          setMessage={setMessage}
          totalDays={totalDays}
          setTotalDays={setTotalDays}
          
        />
      )}
      {showReserve === 2 && <Reserve_2 setShowReserve={setShowReserve} setReservaData={setReservaData} reservaData={reservaData} cancel={cancel}/>}
      {showReserve === 3 && <Reserve_3  message={message} setMessage={setMessage} cancel={cancel} setShowReserve={setShowReserve} userDetails={userDetails} setUserDetails={setUserDetails} reservaData={reservaData} setReservaData={setReservaData}/>}
      {showReserve === 4 && <Reserve_4 userDetails={userDetails} reservaData={reservaData} totalDays={totalDays}/>}

     
      
    </>
  );
};

export default ReservePadre;
