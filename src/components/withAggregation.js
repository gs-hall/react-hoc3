import React from "react";

export const withAggregation = (WrappedComponent, dataTransformFunction, dimention) => (props) => {
  //console.log('withAggregation', props);
  const {...args} = dataTransformFunction(props);
  return <WrappedComponent {...args} />
};