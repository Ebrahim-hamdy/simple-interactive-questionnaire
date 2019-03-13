export class QuestionValidator {
  static hasValidResponse = function(question) {
    const { value, validations } = question;

    if (value === null) {
      return {
        valid: false,
        errors: []
      };
    }

    return validations.reduce(
      (validationData, validation) => {
        const valid =
          validationData.valid && this.validateResponse(value, validation);
        const errors = validationData.errors;

        return {
          valid,
          errors: valid ? errors : errors.concat(validation.message)
        };
      },
      { valid: true, errors: [] }
    );
  };

  static validateResponse = (value, validation) => {
    if (validation.type === "min") {
      return value && value.length >= 3;
    }

    if (validation.type === "max") {
      return value && value.length <= 25;
    }
  };
}
