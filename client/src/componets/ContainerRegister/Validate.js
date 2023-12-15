export default function Validate(values) {
    let errors = {};
  
    if(!values.name) {
      errors.name = '→ Por favor ingrese un valor';
    }
    if(!values.email) {
      errors.email = '→ Ingrese un email';
    }
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
      errors.email = '→ Ingrese un email valido'
    }
    if(!values.password) {
      errors.password = '→ Ingrese una contraseña';
    }
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$#@$!%*?&])([A-Za-z\d$@$!%*?&]|[^]){8,15}$/.test(values.password)) {
      errors.password = '→ 8 a 15 caracteres - Al menos una letra mayúscula - Al menos un dígito numérico - Sin espacios - Al menos un carácter especial.'
    }
    return errors;
}