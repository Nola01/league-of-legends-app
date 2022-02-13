import { useState } from 'react';

const useForm = (initialValues)=> {

  const [values, setValues] = useState(initialValues);

  const [errors, setErrors ] = useState({});

  const onChangeField = (event) => {
      
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value
    });

    validate({ [name]: value });
  }

  const onChangeFileField = (event) => {
    const { name, files } = event.target;
    console.log(name, files);
    setValues({
      ...values,
      [name]: files
    });
    validate({ [name]: files });
  }

  const getErrors = (inputValues = values) => {
    let newErrors = {...errors, isValid: true};

    if ("name" in inputValues) {
      newErrors.name = "";
      if (!inputValues.name || inputValues.name.length === 0) {
        newErrors.name = 'El campo nombre es obligatorio';
        newErrors.isValid = false;
      }
      if (inputValues.name.length > 40) {
          newErrors.name = 'El nombre no puede ser mayor a 20 caracteres';
          newErrors.isValid = false;
      }
    }

    if ("category" in inputValues) {
      newErrors.category = "";
      if (!inputValues.category || inputValues.category == '') {
        newErrors.category = 'El campo categoría es obligatorio';
        newErrors.isValid = false;
      }
    }

    if ("description" in inputValues) {
      newErrors.description = "";
      if (!inputValues.description || inputValues.description.length === 0) {
        newErrors.description = 'El campo descripción es obligatorio';
        newErrors.isValid = false;
      }
      if (inputValues.description.length < 5) {
        newErrors.description = 'La descripción debe ser mayor de 5 caracteres.'
        newErrors.isValid = false;
      }
    }
    
    return newErrors;
  }

  const isValid = () => {
      const errors = getErrors();
      return errors.isValid;
  }

  const validate = (inputValues = values)  => {
      const errors = getErrors(inputValues);
      setErrors(errors);
  }

  return  [
    values,
    errors,
    onChangeField,
    onChangeFileField,
    isValid,
    validate,
  ];

}

export default useForm;