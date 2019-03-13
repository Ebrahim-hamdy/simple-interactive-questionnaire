export class Question {
  constructor(
    id,
    title,
    description,
    type,
    options,
    value,
    enabled,
    validations,
    valid
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.type = type;
    this.options = options;
    this.value = value;
    this.enabled = enabled;
    this.validations = validations;
    this.valid = valid;
  }
}
