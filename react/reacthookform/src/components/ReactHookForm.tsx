import React, { useState } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import {  Form, Button, Row, Modal } from "react-bootstrap"
import { ControllerConfigurationProps } from "../interfaces/ControllerConfigurationProps";
import { ICheckboxItem, useCheckboxGroup } from "../hooks/useCheckboxGroup";
import { ISampleFormParams } from "../interfaces/ISampleFormParams";
import { ISampleFormInput } from "../interfaces/ISampleFormInput";

const SampleForm = (props: ISampleFormParams) => {

  const fieldConfigurations : ControllerConfigurationProps<ISampleFormInput> =  {
    firstName: {
      name: "firstName",
      label: "First Name",
      defaultValue:"",
      rules:{
        minLength: {
          value: 5,
          message: 'Minimum length of 5',
        },
        required: "Required"
      }
    },
    lastName: {
      name: "lastName",
      label: "Last Name",
      defaultValue:"",
      rules:{
        validate: {
          isBob: v => v === "Bob"
        },
        required: "Required",
      }
    },
    gender: {
      name: "gender",
      label: "Gender",
      defaultValue:""
    },
    includeMoreInfo: {
      name: "includeMoreInfo",
      label: "More Info",
      defaultValue: true
    },
    favoriteColor: {
      name: "favoriteColor",
      label: "Favorite Colors",
      defaultValue: ["red"]
    }
  };

  const { control, handleSubmit } = useForm<ISampleFormInput>();
  const onSubmit: SubmitHandler<ISampleFormInput> = data => {
    console.log(data)
    
  };

  /* Modal */
  const [showModal, setShowModal] = useState(false);

  /* Show more info Checkbox */
  const [showMoreInfo, setShowMoreInfo] = useState(fieldConfigurations.includeMoreInfo.defaultValue);

  /* Color handling, pain in the butt to get to work right... */
  // TO DO: Add this to our custom schema
  const colorOptions : ICheckboxItem<string>[] = [
    {
      label: "Blue",
      value: "blue"
    }, 
    {
      value: "green"
    },
    {
      label: "Really Red",
      value: "red"
    }
  ];
  // Arrays need to be handled outside of the module so it can render the proper values
  const [getColorCheckboxes, toggleColorChangeAndReturnValues] = useCheckboxGroup<string>(colorOptions, fieldConfigurations.favoriteColor.defaultValue);
 
  // TODO: Convert individual fields to default rendering components that take the controller and the configuration
  // 
  return (
<div>
    <Button onClick={() => setShowModal(!showModal)} variant="primary">Show Modal</Button>
    <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
  <Modal.Header closeButton>
    <Modal.Title>Demonstration</Modal.Title>
  </Modal.Header>
  <Form onSubmit={handleSubmit(onSubmit)}>
  <Modal.Body>
          <Controller control={control} {...fieldConfigurations.firstName} render={({ field: {name, value, onChange, onBlur}, fieldState: {invalid, error} }) => 
              <Form.Group as={Row} className="mb-3" controlId={name}>
                <Form.Label column sm="2">{fieldConfigurations.firstName.label}</Form.Label>
                <Form.Control isInvalid={invalid} value={value} onBlur={onBlur} onChange={onChange} />
                <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>
              </Form.Group>
              }
            />    

            <Controller control={control} {...fieldConfigurations.lastName} render={({ field: {name, value, onChange, onBlur}, fieldState: {invalid, error} }) => 
              <Form.Group as={Row} className="mb-3" controlId={name}>
                <Form.Label column sm="2">{fieldConfigurations.lastName.label}</Form.Label>
                <Form.Control isInvalid={invalid} value={value} onBlur={onBlur} onChange={onChange} />
                {invalid && error?.type === "isBob" && <Form.Control.Feedback type="invalid">Must be Bob</Form.Control.Feedback>}
                {invalid && error?.type === "required" && <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>}
              </Form.Group>
              } 
            />    

            <Controller control={control} {...fieldConfigurations.gender} render={({ field: {name, value, onChange, onBlur}, fieldState: {invalid, error} }) => 
              <Form.Group as={Row} className="mb-3" controlId={name}>
                <Form.Label column sm="2">{fieldConfigurations.gender.label}</Form.Label>
                <Form.Control as="select" isInvalid={invalid} value={value} onBlur={onBlur} onChange={onChange}>
                <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Control>
              </Form.Group> 
              }
            />    

            <Controller control={control} {...fieldConfigurations.includeMoreInfo} render={({ field: {name, value, onChange, onBlur}, fieldState: {invalid} }) => 
              <Form.Group as={Row} className="mb-3" controlId={name}>
                <Form.Check type="checkbox" isInvalid={invalid} checked={value} onBlur={onBlur} onChange={(e) => { setShowMoreInfo(e.target.checked); onChange(e)}} label={fieldConfigurations.includeMoreInfo.label}/>
              </Form.Group>
              }
            /> 

            {showMoreInfo &&
              <div className="more-info">
                <Form.Group className="mb-3">
                  <Controller control={control} {...fieldConfigurations.favoriteColor} render={({ field: {name, onChange}, fieldState: {invalid, error} }) => 
                    <React.Fragment>
                      <label htmlFor={name}>{fieldConfigurations.favoriteColor.label}</label>
                      {getColorCheckboxes().map(checkbox => (
                        <Form.Check
                          type="checkbox"
                          key={checkbox.value}
                          id={`${name}-${checkbox.value}`}
                          label={checkbox.label}
                          name={`${name}`}
                          checked={checkbox.checked}
                          onChange={() => onChange(toggleColorChangeAndReturnValues(checkbox.value))}
                          value={checkbox.value}
                        />
                      ))}
                    </React.Fragment>
                    }
                  />
                </Form.Group>
              </div>
            }
              
            
          </Modal.Body>

<Modal.Footer>
      <Button variant="primary" type="submit">Submit</Button>
    
    
    </Modal.Footer>
    </Form>
</Modal>

    </div>

    
  );
};
export default SampleForm;