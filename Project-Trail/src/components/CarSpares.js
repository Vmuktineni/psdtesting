// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { API_URL } from "../Constants";


// const CarSpares= ()=>{
    
//     const [loading,setloading]=useState(true);
//     const [spares,setSpares]=useState([]);
    
//     const { carId } = useParams();
//     useEffect(()=>{
//         if(carId){
//             const _data={
//                 carId
//             }
//             axios.post(API_URL+"/getCarSpares",_data).then((res)=>{
//                 if(res && res.data && res.data.length >0){ 
//                   setSpares(res.data);
//                 }
//                 setloading(false);
//               }).catch((err)=>{
//                 console.log(err);
//                 setloading(false);
//               })
//         }
//     }, []);

//     if(loading){
//         return 
//         <>
//         </>
//     }
//     return(
//     <>
//         {spares.length>0 && <h1 style={{color:'black'}}>
//         {JSON.stringify(spares)}
//         </h1>}
//         {spares.length===0 && <h6 style={{color:'black'}}>
//         Oops! No spares found.
//         </h6>}
//     </>   
//     ); 

// }

// export default CarSpares;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../Constants";

const CarSpares = () => {
  const [loading, setLoading] = useState(true);
  const [spares, setSpares] = useState([]);

  const { carId } = useParams();

  useEffect(() => {
    if (carId) {
      const _data = {
        carId,
      };

      // Make an API request to fetch car spares data
      axios.post(API_URL + "/getCarSpares", _data)
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
  }, [carId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {spares.length > 0 && (
        <div>
          <h1>Car Spares</h1>
          <div className="car-part-boxes">
            {spares.map((spare, index) => (
              <div key={spare.id} className={`car-part-box part-${index + 1}`}>
                <img src={spare.image} alt={spare.name} />
                <h2>{spare.name}</h2>
                <p>{spare.description}</p>
                <div className="rating">
                  Rating: {spare.rating} <span role="img" aria-label="star">⭐</span>
                </div>
                <div className="button-container">
                  <button className="add-to-cart">Add to Cart</button>
                  <button className="Buy-now">Buy Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {spares.length === 0 && <h6 style={{ color: "black" }}>Oops! No spares found.</h6>}
    </div>
  );
};

export default CarSpares;
