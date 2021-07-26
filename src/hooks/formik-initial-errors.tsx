import { useState, useEffect } from 'react';
import { validateYupSchema, yupToFormErrors } from 'formik';

export default function useInitialErrors<T>(initialValues: T, validationSchema: any) {
  const [initialErrors, setInitialErrors] = useState({});

  useEffect(() => {
    async function checkInitialValues() {
      try {
        await validateYupSchema(initialValues, validationSchema);
        setInitialErrors({});
      } catch (err) {
        setInitialErrors(yupToFormErrors(err));
      }
    }
    checkInitialValues();

    /**
        Пропущена зависимость validationSchema.
        Предполагается, что initialErrors нужно сгенерировать только 1 раз при инициализации компонента с формой.
        Возникает ситуация, когда validationSchema зависит от стейта и может меняться при взаимодействии с
        пользователем. Переинициализация initialErrors нам в такой ситуации не нужна.
        Пропс формы isValid при этом меняется корректно т.к. зависит от validationSchema, а не initialErrors.
        */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  return initialErrors;
}
