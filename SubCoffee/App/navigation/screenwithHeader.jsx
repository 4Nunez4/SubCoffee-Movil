import React from "react";
import CustomHeader from "./header";

const ScreenWithHeader = ({ component: Component, userName, ...props }) => (
    <React.Fragment>
      <CustomHeader userName={userName} navigation={props.navigation} />
      <Component {...props} />
    </React.Fragment>
  );
  
  export default ScreenWithHeader;