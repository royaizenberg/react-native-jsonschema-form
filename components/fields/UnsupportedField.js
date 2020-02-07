import React from "react";
import PropTypes from "prop-types";
import { View,Text } from 'react-native'

function UnsupportedField({ schema, idSchema, reason }) {
  return (
    <View className="unsupported-field">
      <View>
        <Text>
          Unsupported field schema
      </Text>
      </View>
    </View>
  );
}
      // {schema && <pre>{JSON.stringify(schema, null, 2)}</pre>}

// {idSchema && idSchema.$id && (
//   <span>
//     {" for"} field <code>{idSchema.$id}</code>
//   </span>
// )}
// {reason && <em>: {reason}</em>}.

if (process.env.NODE_ENV !== "production") {
  UnsupportedField.propTypes = {
    schema: PropTypes.object.isRequired,
    idSchema: PropTypes.object,
    reason: PropTypes.string,
  };
}

export default UnsupportedField;
