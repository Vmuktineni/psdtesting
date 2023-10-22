import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ()=> {

    return(
        <>
            <Link to={"/car-search"}>
            <svg height="260" width="260">
      		<circle cx="130" cy="120" r="40%" fill="black" />
      		<text x="90" y="130" fill="white" style={{fontSize:40}}>Cars</text>   
    	</svg>
        </Link>

        <Link to={"/bikes"}>
        <svg height="260" width="260">
      		<circle cx="130" cy="120" r="40%" fill="black" />
      		<text x="80" y="130" fill="white" style={{fontSize:40}}>Bikes</text>
    	</svg>
        </Link>
        </>
    )
}

export default Dashboard;