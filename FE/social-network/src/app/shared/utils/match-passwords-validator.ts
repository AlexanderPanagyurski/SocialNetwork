import { ValidatorFn } from "@angular/forms";

export function matchPasswordsValidator(passwordControlName: string, confirmPasswordControlName: string): ValidatorFn {

    return (control) => {
        const passwordControl = control.get(passwordControlName);
        const confirmPasswordControl = control.get(confirmPasswordControlName);
        const areMatcihng = passwordControl?.value === confirmPasswordControl?.value;
        
        return areMatcihng ? null : { matchPasswordsValidator: true };
    }
}