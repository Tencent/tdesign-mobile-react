import React from "react";

const THeader = (prop) => {
 
  const { title } = prop;
 
 return <>
    {
      title ? (<div v-show="title" className="tdesign-demo-topnav">
        <div className="tdesign-demo-topnav-title">{ title }</div>
        {/* <chevron-left-icon className="tdesign-demo-topnav__back" name="chevron-left"/> */}
        </div>) : null
    }
  </>
}

export default THeader;
