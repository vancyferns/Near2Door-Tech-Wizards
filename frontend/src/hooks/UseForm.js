import { useState, useEffect } from 'react';

const useForm = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(true);
    if (Object.keys(validationErrors).length === 0) {
      callback(values);
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length === 0) {
        setErrors({});
      }
      setIsSubmitting(false);
    }
  }, [values, isSubmitting, validate]);

  return { values, errors, handleChange, handleSubmit };
};

export default useForm;