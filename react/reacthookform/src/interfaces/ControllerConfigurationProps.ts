import { UseControllerPropConfigs } from "./UseControllerPropsConfig";
export type ControllerConfigurationProps<TFormModel> = {[P in keyof TFormModel] : UseControllerPropConfigs<TFormModel>};
