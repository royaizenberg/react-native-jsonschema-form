import React from "react";
import PropTypes from "prop-types";
import { View, Text,StyleSheet } from 'react-native'
function DescriptionField(props) {
  const { id, description } = props;
  if (!description) {
    // See #312: Ensure compatibility with old versions of React.
    return <View />;
  }
  if (typeof description === "string") {
    return (
      <View id={id} style={styles.container}>
        <Text >{description}</Text>
      </View>
    );
  } else {
    return (
      <View id={id} style={styles.container} >
        <Text>{description}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    marginTop:10,
    marginBottom:10,
  },
  text:{
  }
})

if (process.env.NODE_ENV !== "production") {
  DescriptionField.propTypes = {
    id: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  };
}

export default DescriptionField;
