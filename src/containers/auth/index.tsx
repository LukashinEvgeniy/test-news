import { Formik } from "formik";
import { useCallback } from "react";
import styled from 'styled-components';
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { object as objectYup, string as stringYup } from "yup";
import useInitialErrors from "../../hooks/formik-initial-errors";
import { authApi } from "../../lib/api";
import { onSignIn } from "../../redux/thunks/auth";
import { LoginData, initialLoginData } from "../../types/auth";

const ErrorMassage = styled.div`
    color: #FF6565;
    padding: .5em .2em;
    height: 1em;
    font-size: .8em;
`;

const Auth = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const initialErrors = useInitialErrors(
    initialLoginData,
    getValidationSchema()
  );

  const signInHandler = useCallback(
    async (values: LoginData) => {
      try {
        const response = await authApi.signIn(values);
        debugger
        if (response) {
          await dispatch(onSignIn(response.token));
        } else {
          alert(response);
        }
      } catch (err) {
        alert("Произошла ошибка. Повторите попытку позже.");
      }
    },
    [dispatch]
  );

  return (
    <Container fluid="md">
      <Row>
        <Col md={{ span: 3, offset: 3 }}>
          <Formik
            onSubmit={signInHandler}
            enableReinitialize
            initialValues={initialLoginData}
            validationSchema={getValidationSchema()}
            initialErrors={initialErrors}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicLogin">
                  <Form.Label>Login</Form.Label>
                  <Form.Control
                    name="login"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.login}
                    type="text"
                    placeholder="Enter login"
                  />
                  {touched.login && errors.login ? (
                <ErrorMassage>{errors.login}</ErrorMassage>
              ): null}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    type="password"
                    placeholder="Password"
                  />
                  {touched.password && errors.password ? (
                <ErrorMassage>{errors.password}</ErrorMassage>
              ): null}
                </Form.Group>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;

const getValidationSchema = () =>
  objectYup().shape({
    login: stringYup().required("Введите эл. почту"),
    password: stringYup().min(3, "Короткий пароль").required("Введите пароль"),
  });
