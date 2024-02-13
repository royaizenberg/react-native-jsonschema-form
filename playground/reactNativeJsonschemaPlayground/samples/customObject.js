import React from "react";
import {View} from 'react-native'
function ObjectFieldTemplate({ TitleField, properties, title, description }) {
  return (
    <View>
      <TitleField title={title} />
      <View className="row">
        {properties.map(prop => (
          <View
            className="col-lg-2 col-md-4 col-sm-6 col-xs-12"
            key={prop.content.key}>
            {prop.content}
          </View>
        ))}
      </View>
      {description}
    </View>
  );
}

module.exports = {
  schema: {
    title: "A registration form",
    description:
      "This is the same as the simple form, but it is rendered as a bootstrap grid. Try shrinking the browser window to see it in action.",
    type: "object",
    required: ["firstName", "lastName"],
    properties: {
      firstName: {
        type: "string",
        title: "First name",
      },
      lastName: {
        type: "string",
        title: "Last name",
      },
      age: {
        type: "integer",
        title: "Age",
      },
      bio: {
        type: "string",
        title: "Bio",
      },
      password: {
        type: "string",
        title: "Password",
        minLength: 3,
      },
      telephone: {
        type: "string",
        title: "Telephone",
        minLength: 10,
      },
    },
  },
  formData: {
    firstName: "Chuck",
    lastName: "Norris",
    age: 75,
    bio: "Roundhouse kicking asses since 1940",
    password: "noneed",
  },
  ObjectFieldTemplate,
};
