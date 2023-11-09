// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import CarLogo from './CarLogo';
// import Header from './Header';
// import Footer from './Footer';
// import '../CSS/Carpage.css';

// function CarPage() {
//   const [selectedBrand, setSelectedBrand] = useState(null);
//   const [selectedModel, setSelectedModel] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchModelTerm, setSearchModelTerm] = useState('');
//   const [error, setError] = useState(null);


//   const navigate = useNavigate();

//   const handleBrandSelect = (brand) => {
//     setSelectedBrand(brand);
//     setSearchModelTerm('');
//     setSelectedModel(null);
//   };

//   const handleModelSelect = (model) => {
//     setSelectedModel(model);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setSelectedBrand(null);
//     setSelectedModel(null);
//   };

//   const handleModelSearchChange = (event) => {
//     setSearchModelTerm(event.target.value);
//   };

//   const showError = (message) => {
//     setError(message);
//     setTimeout(() => {
//       setError(null);
//     }, 3000);
//   };

//   const handleGoClick = () => {
//     if (selectedBrand && selectedModel) {
//       const isModelAvailable = carBrands
//         .find((brand) => brand.name === selectedBrand)
//         .models.includes(selectedModel);
  
//       if (isModelAvailable) {
//         navigate(`/CarParts/${selectedBrand}/${selectedModel}`);
//       } else {
//         showError(`We don't have the ${selectedModel} model right now!`);
//       }
//     } else {
//       showError('Enter a valid model to search!');
//     }
//   };

//   const filteredCarBrands = carBrands.filter((brand) =>
//     brand.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const filteredCarModels = selectedBrand
//     ? carBrands
//         .find((brand) => brand.name === selectedBrand)
//         .models.filter((model) =>
//           model.toLowerCase().includes(searchModelTerm.toLowerCase())
//         )
//     : [];

//   return (
//     <div>
//       <Header />
//       {error && <ErrorPopup message={error} />}
//       <div className="carpage-container">
//         <h1>Car Brands</h1>
//         <div className="search-container">
//           <div className="search-input">
//             <input
//               type="text"
//               placeholder="Search car brands"
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//           </div>
//         </div>
//         <div className="car-logos-container">
//           {filteredCarBrands.map((brand) => (
//             <CarLogo
//               key={brand.name}
//               brand={brand.name}
//               selected={brand.name === selectedBrand}
//               onSelect={handleBrandSelect}
//             />
//           ))}
//         </div>
//         {selectedBrand && (
//           <div className="car-models-container">
//             <div className="search-model-container">
//               <input
//                 type="text"
//                 placeholder={`Enter your ${selectedBrand} model`}
//                 value={searchModelTerm}
//                 onChange={handleModelSearchChange}
//               />
//               <button className="search-button" onClick={handleGoClick}>
//                 Search
//               </button>
//               {searchModelTerm && (
//                 <div className="model-suggestions">
//                   {filteredCarModels.map((model) => (
//                     <div
//                       key={model}
//                       onClick={() => handleModelSelect(model)}
//                       className="model-suggestion"
//                     >
//                       {model}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// }

// const ErrorPopup = ({ message }) => {
//   return (
//     <div className="error-popup">
//       <p>{message}</p>
//     </div>
//   );
// };

// export default CarPage;