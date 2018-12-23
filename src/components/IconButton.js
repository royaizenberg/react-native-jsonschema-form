import React from "react";
import {Button} from 'react-native'


export default function IconButton(props) {
  const { type = "default", icon, className, ...otherProps } = props;
  return (
    <Button
    title={'icon button'}
      // type="button"
      // className={`btn btn-${type} ${className}`}
      {...otherProps}>
    </Button>
  );
}

      // <i className={`glyphicon glyphicon-${icon}`} />
