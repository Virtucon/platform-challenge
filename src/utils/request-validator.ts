import { validate, ValidationError } from "class-validator";
import { plainToClass, ClassConstructor } from "class-transformer";

const getValidationErrors = async (input: any): Promise<ValidationError[] | null> => {
  const errors = await validate(input, {
    validationError: { target: false },
  });

  return errors.length ? errors : null;
};

const formatValidationErrors = (errors: ValidationError[]): string => {
  return errors.map((error) => Object.values(error.constraints || {}).join(", ")).join(", ");
};

export const RequestValidator = async <T>(
  type: ClassConstructor<T>,
  body: any
): Promise<{ error: boolean | string; input: T }> => {
  const input = plainToClass(type, body);
  const errors = await getValidationErrors(input);

  if (errors) {
    const errorMessage = formatValidationErrors(errors);
    return { error: errorMessage, input };
  }

  return { error: false, input };
};
