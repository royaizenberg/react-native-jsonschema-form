import React, { Component } from "react";
import {View,Button,Text,TouchableOpacity,StyleSheet} from "react-native"
import PropTypes from "prop-types";
import { default as DefaultErrorList } from "./ErrorList";
import {
  getDefaultFormState,
  retrieveSchema,
  shouldRender,
  toIdSchema,
  setState,
  getDefaultRegistry,
  deepEquals,
  getStyle
} from "../utils";
import validateFormData, { toErrorList } from "../validate";

export default class Form extends Component {
  static defaultProps = {
    uiSchema: {},
    styleSheet:{},
    noValidate: false,
    liveValidate: false,
    disabled: false,
    safeRenderCompletion: false,
    noHtml5Validate: false,
    ErrorList: DefaultErrorList,
  };

  constructor(props) {
    super(props);
    this.state = this.getStateFromProps(props);
    if (
      this.props.onChange &&
      !deepEquals(this.state.formData, this.props.formData)
    ) {
      this.props.onChange(this.state);
    }
    this.formElement = null;
  }

  componentWillReceiveProps(nextProps) {
    const nextState = this.getStateFromProps(nextProps);
    this.setState(nextState);
    if (
      !deepEquals(nextState.formData, nextProps.formData) &&
      this.props.onChange
    ) {
      this.props.onChange(nextState);
    }
  }

  getStateFromProps(props) {
    const state = this.state || {};
    const schema = "schema" in props ? props.schema : this.props.schema;
    const uiSchema = "uiSchema" in props ? props.uiSchema : this.props.uiSchema;
    const styleSheet = "styleSheet" in props ? props.styleSheet :{}
    const edit = typeof props.formData !== "undefined";
    const liveValidate = props.liveValidate || this.props.liveValidate;
    const mustValidate = edit && !props.noValidate && liveValidate;
    const { definitions } = schema;
    const formData = getDefaultFormState(schema, props.formData, definitions);
    const retrievedSchema = retrieveSchema(schema, definitions, formData);

    const { errors, errorSchema } = mustValidate
      ? this.validate(formData, schema)
      : {
          errors: state.errors || [],
          errorSchema: state.errorSchema || {},
        };
    const idSchema = toIdSchema(
      retrievedSchema,
      uiSchema["ui:rootFieldId"],
      definitions,
      formData,
      props.idPrefix
    );
    return {
      schema,
      uiSchema,
      idSchema,
      styleSheet,
      formData,
      edit,
      errors,
      errorSchema,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  validate(formData, schema = this.props.schema) {
    const { validate, transformErrors } = this.props;
    const { definitions } = this.getRegistry();
    const resolvedSchema = retrieveSchema(schema, definitions, formData);
    return validateFormData(
      formData,
      resolvedSchema,
      validate,
      transformErrors
    );
  }

  renderErrors() {
    const { errors, errorSchema, schema, uiSchema } = this.state;
    const { ErrorList, showErrorList, formContext } = this.props;

    if (errors.length && showErrorList != false) {
      return (
        <ErrorList
          errors={errors}
          errorSchema={errorSchema}
          schema={schema}
          uiSchema={uiSchema}
          formContext={formContext}
        />
      );
    }
    return null;
  }

  onChange = (formData, newErrorSchema) => {
    const mustValidate = !this.props.noValidate && this.props.liveValidate;
    let state = { formData };
    if (mustValidate) {
      const { errors, errorSchema } = this.validate(formData);
      state = { ...state, errors, errorSchema };
    } else if (!this.props.noValidate && newErrorSchema) {
      state = {
        ...state,
        errorSchema: newErrorSchema,
        errors: toErrorList(newErrorSchema),
      };
    }
    setState(this, state, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  };

  onBlur = (...args) => {
    if (this.props.onBlur) {
      this.props.onBlur(...args);
    }
  };

  onFocus = (...args) => {
    if (this.props.onFocus) {
      this.props.onFocus(...args);
    }
  };

  onSubmit = event => {
    // event.preventDefault();
    if (!this.props.noValidate) {
      const { errors, errorSchema } = this.validate(this.state.formData);
      if (Object.keys(errors).length > 0) {
        setState(this, { errors, errorSchema }, () => {
          if (this.props.onError) {
            this.props.onError(errors);
          } else {
            console.log("Form validation failed", errors);
          }
        });
        return;
      }
    }

    this.setState({ errors: [], errorSchema: {} }, () => {
      if (this.props.onSubmit) {
        this.props.onSubmit({ ...this.state, status: "submitted" });
      }
    });
  };

  getRegistry() {
    // For BC, accept passed SchemaField and TitleField props and pass them to
    // the "fields" registry one.
    const { fields, widgets } = getDefaultRegistry();
    return {
      fields: { ...fields, ...this.props.fields },
      widgets: { ...widgets, ...this.props.widgets },
      ArrayFieldTemplate: this.props.ArrayFieldTemplate,
      ObjectFieldTemplate: this.props.ObjectFieldTemplate,
      FieldTemplate: this.props.FieldTemplate,
      definitions: this.props.schema.definitions || {},
      formContext: this.props.formContext || {},
    };
  }

  submit(formData) {
    if (this.formElement) {
      this.onSubmit();
    }
  }

  render() {
    const {
      children,
      safeRenderCompletion,
      id,
      idPrefix,
      className,
      name,
      method,
      target,
      action,
      autocomplete,
      enctype,
      acceptcharset,
      noHtml5Validate,
      disabled,
      submitTitle
    } = this.props;

    const { schema, uiSchema, styleSheet,formData, errorSchema, idSchema } = this.state;
    const registry = this.getRegistry();
    const _SchemaField = registry.fields.SchemaField;

    return (
      <View
        className={className ? className : "rjsf"}
        id={id}
        name={name}
        method={method}
        target={target}
        action={action}
        autoComplete={autocomplete}
        encType={enctype}
        acceptCharset={acceptcharset}
        noValidate={noHtml5Validate}
        onSubmit={this.onSubmit}
        ref={form => {
          this.formElement = form;
        }}>
        {this.renderErrors()}
        <_SchemaField
          schema={schema}
          uiSchema={uiSchema}
          styleSheet={styleSheet}
          errorSchema={errorSchema}
          idSchema={idSchema}
          idPrefix={idPrefix}
          formData={formData}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          registry={registry}
          safeRenderCompletion={safeRenderCompletion}
          disabled={disabled}
        />
        {children ? (
          children
        ) : (
            // <Button  title="Submit Request" onPress={()=>{}}/>
            <TouchableOpacity
            style={styles.buttonContainer}
            activeOpacity={0.85}
            onPress={(formData) => this.onSubmit(formData)}
          >
              <Text style={[styles.buttonText,getStyle(styleSheet,'buttonText','Form')]}>{submitTitle}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer:{
    borderRadius: 3,
    backgroundColor: '#6DA1B7',
    paddingVertical: 15,
    marginBottom: 20,
    alignItems:'center',
    justifyContent:"center",
    marginTop:15
  },
  buttonText:{
    color:'white',
    fontWeight:'500'
  }
})

if (process.env.NODE_ENV !== "production") {
  Form.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    formData: PropTypes.any,
    widgets: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    ),
    fields: PropTypes.objectOf(PropTypes.func),
    ArrayFieldTemplate: PropTypes.func,
    ObjectFieldTemplate: PropTypes.func,
    FieldTemplate: PropTypes.func,
    ErrorList: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    showErrorList: PropTypes.bool,
    onSubmit: PropTypes.func,
    id: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    method: PropTypes.string,
    target: PropTypes.string,
    action: PropTypes.string,
    autocomplete: PropTypes.string,
    enctype: PropTypes.string,
    acceptcharset: PropTypes.string,
    noValidate: PropTypes.bool,
    noHtml5Validate: PropTypes.bool,
    liveValidate: PropTypes.bool,
    validate: PropTypes.func,
    transformErrors: PropTypes.func,
    safeRenderCompletion: PropTypes.bool,
    formContext: PropTypes.object,
  };
}
