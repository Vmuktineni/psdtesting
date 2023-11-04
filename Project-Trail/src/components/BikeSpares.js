import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../Constants";
import "../CSS/BikeSpares.css";

const BikeSpares = () => {
  const [loading, setLoading] = useState(true);
  const [spares, setSpares] = useState([]);

  const { bikeId } = useParams();

  useEffect(() => {
    if (bikeId) {
      const _data = {
        bikeId
      };

      axios
        .post(API_URL + "/getBikeSpares", _data)
        .then((res) => {
          if (res && res.data && res.data.length > 0) {
            setSpares(res.data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [bikeId]); 

  if (loading) {
    return null; 
  }

  return (
    <>
      {spares.length > 0 && (
        <h1 style={{ color: "black" }}>{JSON.stringify(spares)}</h1>
      )}
      {spares.length === 0 && (
        <h6 style={{ color: "black" }}>Oops! No bike spares found.</h6>
      )}
    </>
  );
};

export default BikeSpares;
