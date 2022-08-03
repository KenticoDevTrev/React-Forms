import * as ReactDOM from 'react-dom';
import * as React from 'react';
import SampleForm from './components/ReactHookForm'
import { ISampleFormInput } from './interfaces/ISampleFormInput';
import { ISampleFormParams } from './interfaces/ISampleFormParams';
// Replace

let handleSubmit = (formData: ISampleFormInput) => {
    // handle stuff
}
const SampleFormProps : ISampleFormParams = {
    onSubmit : (formData) => handleSubmit(formData)
};

ReactDOM.render(
    <SampleForm {...SampleFormProps}/>
, document.getElementById("MyApp"));