import React from "react";

export const withAggregation = (WrappedComponent, dataTransformFunction) => (props) => {
  const {...args} = dataTransformFunction(props);
  return <WrappedComponent {...args} />
};