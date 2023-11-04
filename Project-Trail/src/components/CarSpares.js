import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../Constants";


const CarSpares= ()=>{
    
    const [loading,setloading]=useState(true);
    const [spares,setSpares]=useState([]);
    
    const { carId } = useParams();
    useEffect(()=>{
        if(carId){
            const _data={
                carId
            }
            axios.post(API_URL+"/getCarSpares",_data).then((res)=>{
                if(res && res.data && res.data.length >0){ 
                  setSpares(res.data);
                }
                setloading(false);
              }).catch((err)=>{
                console.log(err);
                setloading(false);
              })
        }
    }, []);

    if(loading){
        return 
        <>
        </>
    }
    return(
    <>
        {spares.length>0 && <h1 style={{color:'black'}}>
        {JSON.stringify(spares)}
        </h1>}
        {spares.length===0 && <h6 style={{color:'black'}}>
        Oops! No spares found.
        </h6>}
    </>   
    ); 

}

export default CarSpares;