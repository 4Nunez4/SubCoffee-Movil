
import React from "react";

import { View, Text } from 'react-native'

const PerfilScreen = () => {
    
    
  return (
    <View>
            <Text>
        Hola desde perfil
      </Text>
      
    </View>
  )
}

export default PerfilScreen
// import React, { useState } from "react";
// import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";

// const photos = [
//   // Asegúrate de reemplazar estos con tus propias rutas de imágenes
//   require('../../resources/IconoSubCoffee.png'),
 
//   // Agrega más fotos según sea necesario
// ];

// const PhotosRoute = () => (
//   <View style={{ flex: 1 }}>
//     <FlatList
//       data={photos}
//       numColumns={3}
//       renderItem={({ item, index }) => (
//         <View
//           key={index}
//           style={{
//             flex: 1,
//             aspectRatio: 1,
//             margin: 3,
//           }}
//         >
//           <Image
//             source={item}
//             style={{ width: "100%", height: "100%", borderRadius: 12 }}
//           />
//         </View>
//       )}
//     />
//   </View>
// );

// const LikesRoute = () => (
//   <View style={{ flex: 1, backgroundColor: "blue" }} />
// );

// const PerfilScreen = () => {
//   const layout = Dimensions.get('window');
//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: "photos", title: "Photos" },
//     { key: "likes", title: "Likes" },
//   ]);

//   const renderScene = ({ route }) => {
//     switch (route.key) {
//       case 'photos':
//         return <PhotosRoute />;
//       case 'likes':
//         return <LikesRoute />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: "white" }}>
//       <View style={{ width: "100%" }}>
//         <Image
//           source={require('./path/to/cover.png')} // Reemplaza con tu ruta de imagen
//           resizeMode="cover"
//           style={{ height: 228, width: "100%" }}
//         />
//       </View>

//       <View style={{ flex: 1, alignItems: "center" }}>
//         <Image
//           source={require('./path/to/profile.png')} // Reemplaza con tu ruta de imagen
//           resizeMode="contain"
//           style={{
//             height: 155,
//             width: 155,
//             borderRadius: 999,
//             borderColor: "blue",
//             borderWidth: 2,
//             marginTop: -90,
//           }}
//         />

//         <Text style={{ fontSize: 24, color: "blue", marginVertical: 8 }}>
//           Melissa Peters
//         </Text>
//         <Text style={{ color: "black", fontSize: 16 }}>
//           Interior designer
//         </Text>

//         <View style={{ flexDirection: "row", marginVertical: 6, alignItems: "center" }}>
//           <Text style={{ fontSize: 16, marginLeft: 4 }}>Lagos, Nigeria</Text>
//         </View>

//         <View style={{ flexDirection: "row", paddingVertical: 8 }}>
//           <View style={{ flexDirection: "column", alignItems: "center", marginHorizontal: 20 }}>
//             <Text style={{ fontSize: 24, color: "blue" }}>122</Text>
//             <Text style={{ fontSize: 16, color: "blue" }}>Followers</Text>
//           </View>

//           <View style={{ flexDirection: "column", alignItems: "center", marginHorizontal: 20 }}>
//             <Text style={{ fontSize: 24, color: "blue" }}>67</Text>
//             <Text style={{ fontSize: 16, color: "blue" }}>Followings</Text>
//           </View>

//           <View style={{ flexDirection: "column", alignItems: "center", marginHorizontal: 20 }}>
//             <Text style={{ fontSize: 24, color: "blue" }}>77K</Text>
//             <Text style={{ fontSize: 16, color: "blue" }}>Likes</Text>
//           </View>
//         </View>

//         <View style={{ flexDirection: "row" }}>
//           <TouchableOpacity
//             style={{
//               width: 124,
//               height: 36,
//               alignItems: "center",
//               justifyContent: "center",
//               backgroundColor: "blue",
//               borderRadius: 10,
//               marginHorizontal: 20,
//             }}
//           >
//             <Text style={{ fontSize: 16, color: "white" }}>Edit Profile</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={{
//               width: 124,
//               height: 36,
//               alignItems: "center",
//               justifyContent: "center",
//               backgroundColor: "blue",
//               borderRadius: 10,
//               marginHorizontal: 20,
//             }}
//           >
//             <Text style={{ fontSize: 16, color: "white" }}>Add Friend</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={{ flex: 1, marginHorizontal: 22, marginTop: 20 }}>
//         <View style={{ flexDirection: "row", justifyContent: "center" }}>
//           <TouchableOpacity onPress={() => setIndex(0)} style={{ marginHorizontal: 20 }}>
//             <Text style={{ fontSize: 16, color: index === 0 ? "blue" : "grey" }}>Photos</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => setIndex(1)} style={{ marginHorizontal: 20 }}>
//             <Text style={{ fontSize: 16, color: index === 1 ? "blue" : "grey" }}>Likes</Text>
//           </TouchableOpacity>
//         </View>
//         {renderScene({ route: routes[index] })}
//       </View>
//     </View>
//   );
// };

// export default PerfilScreen;
