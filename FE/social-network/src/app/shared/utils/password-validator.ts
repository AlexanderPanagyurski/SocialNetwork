import { ValidatorFn } from "@angular/forms";

export function passwordValidator(value: string): ValidatorFn {
    const regex = new RegExp(`(^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$)|(^[0-9]{6,}$)`);

    return (control) => {
        const isPasswordValid = control.value === '' || regex.test(control.value);
        console.log('valid:', isPasswordValid);

        return isPasswordValid ? null : { passwordValidator: true };
    };
}