import React, {useEffect, useState } from 'react';
/* import { fetchData } from '../../../helpers/axiosHelper.js';
import {  useParams } from 'react-router-dom'; 
 import { AuthContext } from '../../../helpers/axiosHelper.js'
import { Button, Form } from 'react-bootstrap' */
/* 
const initialValue = {
   name: "",
   price: "",
   description: "",
   max_total: "",
   image: "",
} */

const EditService = () => {
  /* const { service_id } = useParams();
  const [editService, setEditService] = useState();
 const [service, setService, token] = useContext(AuthContext) 
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("")


  const navigate = useNavigate();


  useEffect(() => {
    const serviceToEdit = service.find((e) =>e.service_id === Number(service_id))
    setEditService(serviceToEdit)

  },[])



  const handleChange = (e) =>{
    const {name, value} = e.target;
    setEditService({...editService,[name]:value})
  }
  

  const onSubmit = async() => {
    try {
      let res = await fetchData('admin/editService', "PUT", editService, token)
      console.log(res)

      let newService = service.map((elem)=>{
        if(elem.service_id === Number(service_id)){
          return editService
        }else{
          return elem
        }
      })

      setService(newService);
      
    } catch (error) {
      setErrorMsg("Error en edicion")
    }
  }
 */



  return (
    <div>h</div>
  );
};

export default EditService;