import { ValidatorFn } from "@angular/forms";

export function emailValidator(domains: string[]): ValidatorFn {
    // ^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$
    const domainString = domains.join('|');
    const regex = new RegExp(`[A-Za-z0-9]+@[A-z]{3,}\.(${domainString})`);

    return (control) => {
        const isEmailValid = control.value === '' || regex.test(control.value);
        console.log('valid:', isEmailValid);

        return isEmailValid ? null : { emailValidator: true };
    };
}