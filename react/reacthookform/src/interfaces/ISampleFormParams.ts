import { ISampleFormInput } from "./ISampleFormInput";

export interface ISampleFormParams {
    onSubmit: (formData : ISampleFormInput) => void;
}