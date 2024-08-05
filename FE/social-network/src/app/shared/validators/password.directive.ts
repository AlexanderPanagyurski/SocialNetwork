import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { passwordValidator } from '../utils/password-validator';

@Directive({
  selector: '[appPassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordDirective,
      multi: true
    }
  ]
})
export class PasswordDirective implements Validator, OnChanges {
  @Input() appPassword: string[] = [];
  validator: ValidatorFn = () => null;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue } = changes['appPassword'];

    if (currentValue?.length) {
      this.validator = passwordValidator(currentValue);
    }
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control);
  }
}
