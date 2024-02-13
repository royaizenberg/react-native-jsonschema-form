import React from "react";
import {Text} from 'react-native' 
module.exports = {
  schema: {
    title: "Property dependencies",
    description: "These samples are best viewed without live validation.",
    type: "object",
    properties: {
      unidirectional: {
        title: "Unidirectional",
        src:
          "https://spacetelescope.github.io/understanding-json-schema/reference/object.html#dependencies",
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          credit_card: {
            type: "number",
          },
          billing_address: {
            type: "string",
          },
        },
        required: ["name"],
        dependencies: {
          credit_card: ["billing_address"],
        },
      },
      bidirectional: {
        title: "Bidirectional",
        src:
          "https://spacetelescope.github.io/understanding-json-schema/reference/object.html#dependencies",
        description:
          "Dependencies are not bidirectional, you can, of course, define the bidirectional dependencies explicitly.",
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          credit_card: {
            type: "number",
          },
          billing_address: {
            type: "string",
          },
        },
        required: ["name"],
        dependencies: {
          credit_card: ["billing_address"],
          billing_address: ["credit_card"],
        },
      },
    },
  },
  uiSchema: {
    unidirectional: {
      credit_card: {
        "ui:help": (
          <Text>
            If you enter anything here then <Text>billing_address</Text> will
            become required.
          </Text>
        ),
      },
      billing_address: {
        "ui:help":
          "It’s okay to have a billing address without a credit card number.",
      },
    },
    bidirectional: {
      credit_card: {
        "ui:help": (
          <Text>
            "If you enter anything here then <Text>billing_address</Text> will
            become required.
          </Text>
        ),
      },
      billing_address: {
        "ui:help": (
          <Text>
            If you enter anything here then <Text>credit_card</Text> will become
            required.
          </Text>
        ),
      },
    },
  },
  formData: {
    unidirectional: {
      name: "Tim",
    },
    bidirectional: {
      name: "Jill",
    },
  },
};
