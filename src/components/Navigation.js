// import './navigation.css'
// import {useEffect} from "react";
//
// const Navigation = ({displayBreed, list}) => {
//
//   return (
//     <div className="navigation">
//       <button
//         onClick={(e) => {
//           displayBreed("");
//         }}
//         className={"breeds"}
//         style={{ backgroundColor: "#444" }}
//       >
//         HOME
//       </button>
//       {list &&
//         list.map((item, i) => {
//           return (
//             <button
//               key={i}
//               onClick={(e) => {
//                 displayBreed(e.target.innerHTML);
//               }}
//               className={"breeds"}
//             >
//               {item.breed}
//             </button>
//           );
//         })}
//     </div>
//   )
// }
//
// export default Navigation;
