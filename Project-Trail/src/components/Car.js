import React, {useEffect, useState} from "react";
import axios from "axios";
import { API_URL } from "../Constants";


const Cars =()=>{
  const [cars, setCars]= useState(null);
  useEffect(()=>{
    getCars();
  }, []);

  const getCars = () =>{
    axios.get(API_URL+"/getCars").then((res)=>{
      if(res && res.data && res.data.length >0){ 
        setCars(res.data);
      }
      
    }).catch((err)=>{
      console.log(err);
    })
  }


  return(
    
    <>
   {/* <div>{JSON.stringify(cars)} </div>    
     {cars && cars[1]['car_id']} */}
     This is cars
    </>
  )
}

export default Cars;