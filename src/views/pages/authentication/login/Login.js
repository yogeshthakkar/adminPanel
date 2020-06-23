import React, { useState } from "react"
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap"
import { Mail, Lock } from "react-feather"
import { history } from "../../../../history"
import loginImg from "../../../../assets/img/pages/login.png"
import "../../../../assets/scss/pages/authentication.scss"

// Own Module
import CustomAlert from '../../../../components/Alert/myAlert'
import { api } from "../../../../api/api"

function Login() {
  const [message, setMessage] = useState({
    alertMessage: ''
  });
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  function handleChange(event) {
    // event.persist();
    const val = event.target.value
    setData({
      ...data,
      [event.target.name]: val
    })
  }
  async function handleLogin(event) {
    event.preventDefault()
    // let val = {email,password}
    console.log(data);
    let response = await api(
      'v0/admin/login',
      data,
      null,
      'postPassWithoutToken'
    )
    if (response) {
      // result.data.data.id
      // console.log();
      localStorage.setItem('loginResponse', JSON.stringify(response.data.data))
      console.log(
        localStorage.getItem('loginResponse')

      );
        
      setMessage({
        alertMessage: response.data.message
      })
      history.push("/admins")
    }
    else {
      // console.log(err.data);
      // error is not set in backend
      setMessage({
        alertMessage: 'Invalid credentials'
      })
    }

  }
  return (
    <Row className="m-0 justify-content-center">
      <Col
        sm="8"
        xl="7"
        lg="10"
        md="8"
        className="d-flex justify-content-center"
      >
        <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
          <Row className="m-0">
            <Col
              lg="6"
              className="d-lg-block d-none text-center align-self-center px-1 py-0"
            >
              <img src={loginImg} alt="loginImg" />
            </Col>
            <Col lg="6" md="12" className="p-0">
              <Card className="rounded-0 mb-0 px-2">
                <CardBody>
                  <h4>Login</h4>
                  <p>Welcome back, please login to your account.</p>
                  <Form onSubmit={e => e.preventDefault()}>
                    <FormGroup className="form-label-group position-relative has-icon-left">
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={handleChange}
                        required
                      />
                      <div className="form-control-position">
                        <Mail size={15} />
                      </div>
                      <Label>Email</Label>
                    </FormGroup>
                    <FormGroup
                      className="form-label-group position-relative has-icon-left"
                    >
                      <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={handleChange}
                      />
                      <div className="form-control-position">
                        <Lock size={15} />
                      </div>
                      <Label>Password</Label>
                    </FormGroup>
                    {message.alertMessage.length > 0 ?
                      <CustomAlert message={message.alertMessage} /> : ''}

                    <div className="d-flex justify-content-between">
                      <Button.Ripple
                        color="primary"
                        type="submit"
                        onClick={handleLogin}
                      >
                        Login
                      </Button.Ripple>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}
export default Login
