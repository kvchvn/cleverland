export interface CheckFnReturn {
  hasLatinLetter: boolean;
  hasNumber: boolean;
  hasOnlyLatinLetterOrNumber: boolean;
  hasCapitalLetter: boolean;
  hasRequiredLength: boolean;
  hasValidEmail: boolean;
}

export interface CheckFnOptions {
  requiredLength: number;
}

export type InputBoxStepByStepValidationProp = Array<{ type: keyof CheckFnReturn; stringSlice: string }>;
