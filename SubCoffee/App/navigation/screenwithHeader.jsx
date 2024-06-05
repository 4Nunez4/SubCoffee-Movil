import React, { useState } from "react";
import CustomHeader from "./header";
import Notificaciones from "../components/templates/notificaciones";

const ScreenWithHeader = ({ component: Component, userName, ...props }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <React.Fragment>
      <CustomHeader userName={userName} navigation={props.navigation} toggleModal={() => setModalVisible(!modalVisible)} />
      <Component {...props} />
      <Notificaciones isVisible={modalVisible} onClose={() => setModalVisible(false)} />
    </React.Fragment>
  );
};

export default ScreenWithHeader;
