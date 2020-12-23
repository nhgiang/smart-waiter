import { FormGroup, FormControl } from '@angular/forms'
import { isInteger, isNumber } from 'lodash'

export const validPhoneNumber = (control: FormControl) => {
  const value = control.value
  if (!value) {
    return
  }
  return /^\+{1}\d+/.test(value) ? {
    invalid: true
  } : null
}

export const requiredHtml = (control: FormControl) => {
  let value = control.value
  value = value && value.replace(/<.*?>/g, '').replace('&nbsp;', '').replace(/\s+|$\s+/, '')
  return (!value || value.length === 0) ? {
    required: true
  } : null
}

export const requireDigit = (control: FormControl) => {
  return /\d+/.test(control.value) ? null : {
    requireDigit: true
  }
}

export const requireNonWhitespace = (control: FormControl) => {
  return /\s/gi.test(control.value) ? {
    requireNonWhitespace: true
  } : null
}

export const requireNonSpecialCharacters = (control: FormControl) => {
  return /^[\w\-]+$/.test(control.value) ? null : {
    requireNonSpecialCharacters: true
  }
}
export const requireNonAlphanumeric = (control: FormControl) => {
  return /[^a-zA-Z\d]/.test(control.value) ? null : {
    requireNonAlphanumeric: true
  }
}

export const requireLowercase = (control: FormControl) => {
  return /[a-z]/.test(control.value) ? null : {
    requireLowercase: true
  }
}

export const requireUppercase = (control: FormControl) => {
  return /[A-Z]/.test(control.value) ? null : {
    requireUppercase: true
  }
}

export const requireUrl = (control: FormControl) => {
  return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(control.value) ? null : {
    requireUrl: true
  }
}

export function mustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName]
    const matchingControl = formGroup.controls[matchingControlName]
    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true })
    } else {
      matchingControl.setErrors(null)
    }
  }
}

export const decimalNumber = (control: FormControl) => {
  if (!control) {
    return null
  }
  return isInteger(+control.value) ? null : {
    decimalNumber: true
  }
}

export const negativeNumber = (control: FormControl) => {
  return control && control.value > -1 ? null : {
    negativeNumber: true
  }
}

export const requiredIsNumber = (control: FormControl) => {
  if (!control || !control.value) {
    return null
  }
  return isNumber(control.value) ? null : {
    requireIsNumber: true
  }
}

export const fieldMatch = (field1, field2) =>
  (form: FormGroup) => {
    const v1 = form.value[field1]
    const v2 = form.value[field2]
    const result = v1 !== v2 ? { missmatch: [field1, field2] } : undefined
    return result
  }
