// import { useState } from 'react';
// import boot from "../../assets/images/boot.png";

//  const products = [
//   {
//     image: boot,           // ← Put your image path/URL here later (from Figma or assets)
//     discount: 35,
//     title: "Ales Nesetril",
//     price: 960,
//     originalPrice: 1160,
//   },
//   {
//     image: "",           // ← Put second image here
//     discount: 40,
//     title: "Ales Nesetril",
//     price: 960,
//     originalPrice: 1160,
//   },
// ];

// const ProductCard = ({ 
//   image, 
//   discount, 
//   title, 
//   price, 
//   originalPrice 
// }) => {
//   const [liked, setLiked] = useState(false);

//   return (
//     <div className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300">
//       {/* Image Container */}
//       <div className="relative h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
//         <img 
//           src={image} 
//           alt={title}
//           className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
//         />
        
//         {/* Discount Badge */}
//         {discount && (
//           <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
//             -{discount}%
//           </span>
//         )}

//         {/* Heart Wishlist */}
//         <button 
//           onClick={() => setLiked(!liked)}
//           className="absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors"
//         >
//           <span className={`text-3xl transition-colors ${liked ? 'text-red-500' : 'text-gray-400'}`}>
//             {liked ? '❤️' : '♡'}
//           </span>
//         </button>
//       </div>

//       {/* Product Info */}
//       <div className="p-5">
//         <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2">
//           {title}
//         </h3>

//         <div className="flex items-baseline gap-3 mb-4">
//           <span className="text-3xl font-bold text-gray-900">${price}</span>
//           {originalPrice && (
//             <span className="text-base text-gray-400 line-through">${originalPrice}</span>
//           )}
//         </div>

//         {/* Rating */}
//         <div className="flex items-center gap-1 mb-6">
//           <span className="text-yellow-400 text-2xl">★★★★☆</span>
//           <span className="text-sm text-gray-500 ml-2">(75)</span>
//         </div>

//         {/* Add to Cart Button */}
//         <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-4 rounded-2xl transition-colors flex items-center justify-center gap-2">
//           🛒 Add to cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;