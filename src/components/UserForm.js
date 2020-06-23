// import external modules
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FormGroup, Label, Button, Row, Col } from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
<<<<<<< HEAD
import Axios from 'axios';
=======
import { Spinner } from 'reactstrap';
import { useSelector } from 'react-redux';
>>>>>>> d6ee3b01ca2052c7d87fcbfa8a030545ac8a5727

import * as Icon from 'react-feather'
import { api } from '../api/api';
// /^[a-zA-Z0-9._'-? ]*$/

const formSchema = Yup.object().shape({
  firstName: Yup.string().required('Fisrname_required'),
  lastName: Yup.string().required('Lastname_required'),
  email: Yup.string().email('email_validation').required('email_required'),

});

<<<<<<< HEAD
const UserForm = ({ handleSubmit, user, handleChange }) => {
  console.log('User', user);
  const [inputList, setInputList] = useState(user.children);
  if (user.children.length > 0) {
    console.log(inputList)
  }

  let [Id,setId] = useState(null)
  let id
  React.useEffect(() => {
    setId(id);
}, [id])
  let [showAvatar, setShowAvatar] = useState({
    file: '',
    avatar: ''
  })
  let [show, setShow] = useState({
    file: '',
    imagePreviewUrl1: '',
  })
  let [show2, setShow2] = useState({
    file: '',
    imagePreviewUrl2: '',
  })
  let [show3, setShow3] = useState({
    file: '',
    imagePreviewUrl3: '',
  })
  let [show4, setShow4] = useState({
    file: '',
    imagePreviewUrl4: '',
  })
  let [show5, setShow5] = useState({
    file: '',
    imagePreviewUrl5: '',
  })

  let [show6, setShow6] = useState({
    file: '',
    imagePreviewUrl6: '',
  })
  // handle input change
  const handleInputChange = (e, index,setFieldValue) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setFieldValue(list)
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { name: "", gender: "", age: '' }]);
  };
  let loginResponse, adminid, token
  loginResponse = JSON.parse((localStorage.getItem('loginResponse')))
  adminid = loginResponse.id
  token = loginResponse.token
=======
const UserForm = ({ firstName, email, lastName, handleSubmit, edit, user }) => {
  const { layout } = useSelector((state) => state);
  const { isLoading } = layout;
>>>>>>> d6ee3b01ca2052c7d87fcbfa8a030545ac8a5727
  return (
    <Formik
      initialValues={{
        ...user
      }}
      validationSchema={formSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        touched,
        handleChange,
        handleBlur,
        values,
        setFieldValue,
      }) => (
          <Form className="user-form">
            <Row>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label htmlFor="firstName">{'Name'}</Label>
                  <Field
                    type="text"
                    maxLength="20"
                    minLength="1"
                    name="firstName"
                    id="firstName"
                    placeholder={'Name'}
                    className={`form-control input ${
                      errors.firstName && touched.firstName && 'is-invalid'
                      }`}
                  />
                  {errors.firstName && touched.firstName ? (
                    <div className="invalid-feedback">{`${errors.firstName}`}</div>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label htmlFor="lastName">{'LastName'}</Label>
                  <Field
                    type="text"
                    maxLength="20"
                    minLength="1"
                    name="lastName"
                    id="lastName"
                    placeholder={'lastName'}
                    className={`form-control input ${
                      errors.lastName && touched.lastName && 'is-invalid'
                      }`}
                  />
                  {errors.lastName && touched.lastName ? (
                    <div className="invalid-feedback">{`${errors.lastName}`}</div>
                  ) : null}
                </FormGroup>
              </Col>

              <Col md="6" sm="12">
                <FormGroup>
                  <Label htmlFor="email">{'Email'}</Label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder={'Email'}
                    disabled={true}
                    onBlur={(e) => {
                      let email = e.target.value;
                      if (email) email = email.toLowerCase();
                      setFieldValue('email', email);
                      handleBlur(e);
                    }}
                    className={`form-control input ${
                      errors.email && touched.email && 'is-invalid'
                      }`}
                  />
                  {errors.email && touched.email ? (
                    <div className="invalid-feedback">{`${errors.email}`}</div>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md="6" sm="3">
                <FormGroup>
                  <Label htmlFor="emailVerified">{'Email Verified'}</Label>
                  <Field
                    type="checkbox"
                    name="emailVerified"
                    id="emailVerified"
                    className={`form-control input ${
                      errors.emailVerified && touched.emailVerified && 'is-invalid'
                      }`}
                  />
                  {errors.emailVerified && touched.emailVerified ? (
                    <div className="invalid-feedback">{`${errors.emailVerified}`}</div>
                  ) : null}
                </FormGroup>
              </Col>
              {/*profile Type*/}
              <Col md="6" sm="3">
                <label htmlFor="profileType">profileType</label>
                <Field as="select" name="profileType"
                  className={'form-control'} >
                  <option value="default" onChange={selectedOptions => {
                    setFieldValue("profileType", selectedOptions)
                  }}>default</option>
                  <option value='small' onChange={selectedOptions => {
                    setFieldValue("profileType", selectedOptions)
                  }}>small</option>
                  <option value='classic' onChange={selectedOptions => {
                    setFieldValue("profileType", selectedOptions)
                  }}>classic</option>
                  <option value='premium' onChange={selectedOptions => {
                    setFieldValue("profileType", selectedOptions)
                  }}>premium</option>
                  <option value='barrio' onChange={selectedOptions => {
                    setFieldValue("profileType", selectedOptions)
                  }}>barrio</option>
                  <option value='events' onChange={selectedOptions => {
                    alert(selectedOptions)
                    setFieldValue("profileType", selectedOptions)
                  }}>events</option>
                </Field>     
              </Col>
            {/*relationship status*/}
            <Col md="6" sm="3">
            <label htmlFor="relationshipStatus">relationshipStatus</label>
            <Field as="select" name="relationshipStatus"
              className={'form-control'} 
            >
              <option 
              value="SINGLE" 
              onChange={selectedOptions => {
                setFieldValue("relationshipStatus", selectedOptions)
              }}
              >SINGLE</option>
              <option 
              value='IN_A_RELATIONSHIP' 
              onChange={selectedOptions => {
                setFieldValue("relationshipStatus", selectedOptions)
              }}
              >IN_A_RELATIONSHIP</option>
              <option 
              value='ENGAGED' 
              onChange={selectedOptions => {
                setFieldValue("relationshipStatus", selectedOptions)
              }}
              >ENGAGED</option>
              <option value='MARRIED' 
              onChange={selectedOptions => {
                setFieldValue("relationshipStatus", selectedOptions)
              }}
              >MARRIED</option>

              <option value='SINGLE_PARENT' 
              onChange={selectedOptions => {
                setFieldValue("relationshipStatus", selectedOptions)
              }}>SINGLE_PARENT</option>

              <option 
              value='PATCHWORK' 
              onChange={selectedOptions => {
                setFieldValue("relationshipStatus", selectedOptions)
              }}
              >PATCHWORK</option>

              <option 
              value='RAINBOW' 
              onChange={selectedOptions => {
                setFieldValue("relationshipStatus", selectedOptions)
              }}
              >RAINBOW</option>

              <option 
              value='NO_INFO' 
              onChange={selectedOptions => {
                setFieldValue("relationshipStatus", selectedOptions)
              }}
              >NO_INFO</option>
            </Field>     
          </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="expirationDate">{'Expiration Date'}</Label>
                <Field
                  type="date"
                  name="expirationDate"
                  id="expirationDate"
                  className={`form-control input ${
                    errors.expirationDate && touched.expirationDate && 'is-invalid'
                    }`}
                />
                {errors.expirationDate && touched.expirationDate ? (
                  <div className="invalid-feedback">{`${errors.expirationDate}`}</div>
                ) : null}
              </FormGroup>
            </Col>

            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="description">{'Description'}</Label>
                <Field
                  type="textarea"
                  maxLength="200"
                  minLength="1"
                  name="description"
                  id="description"
                  className={`form-control input ${
                    errors.description && touched.description && 'is-invalid'
                    }`}
                />
                {errors.description && touched.description ? (
                  <div className="invalid-feedback">{`${errors.description}`}</div>
                ) : null}
              </FormGroup>
            </Col>

            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="city">{'City'}</Label>
                <Field
                  type="text"
                  maxLength="20"
                  minLength="1"
                  name="city"
                  id="city"
                  className={`form-control input ${
                    errors.city && touched.city && 'is-invalid'
                    }`}
                />
                {errors.city && touched.city ? (
                  <div className="invalid-feedback">{`${errors.city}`}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="lastKnownCity">{'Last Known City'}</Label>
                <Field
                  type="text"
                  maxLength="20"
                  minLength="1"
                  name="lastKnownCity"
                  id="lastKnownCity"
                  className={`form-control input ${
                    errors.lastKnownCity && touched.lastKnownCity && 'is-invalid'
                    }`}
                />
                {errors.lastKnownCity && touched.lastKnownCity ? (
                  <div className="invalid-feedback">{`${errors.lastKnownCity}`}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="latitude">{'Latitude'}</Label>
                <Field
                  type="text"
                  maxLength="20"
                  minLength="1"
                  name="latitude"
                  id="latitude"
                  className={`form-control input ${
                    errors.latitude && touched.latitude && 'is-invalid'
                    }`}
                />
                {errors.latitude && touched.latitude ? (
                  <div className="invalid-feedback">{`${errors.latitude}`}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="longitude">{'longitude'}</Label>
                <Field
                  type="number"
                  maxLength="20"
                  minLength="1"
                  name="longitude"
                  id="longitude"
                  className={`form-control input ${
                    errors.longitude && touched.longitude && 'is-invalid'
                    }`}
                />
                {errors.longitude && touched.longitude ? (
                  <div className="invalid-feedback">{`${errors.longitude}`}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="zipCode">{'zipCode'}</Label>
                <Field
                  type="text"
                  maxLength="20"
                  minLength="1"
                  name="zipCode"
                  id="zipCode"
                  className={`form-control input ${
                    errors.zipCode && touched.zipCode && 'is-invalid'
                    }`}
                />
                {errors.zipCode && touched.zipCode ? (
                  <div className="invalid-feedback">{`${errors.zipCode}`}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="birthYear">{'birthYear'}</Label>
                <Field
                  type="number"
                  maxLength="4"
                  minLength="1"
                  name="birthYear"
                  id="birthYear"
                  className={`form-control input ${
                    errors.birthYear && touched.birthYear && 'is-invalid'
                    }`}
                />
                {errors.birthYear && touched.birthYear ? (
                  <div className="invalid-feedback">{`${errors.birthYear}`}</div>
                ) : null}
              </FormGroup>
            </Col>

            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="avatar">{'avatar'}</Label>
                <Field
                  type="file"
                  name='avatar'
                  {...user.avatar}
                  value={null}
                  onChange={async (e) => {
                    e.preventDefault()
                    let reader = new FileReader();
                    let file = e.target.files[0];
                    console.log(file);
                    reader.onloadend = () => {
                      setShowAvatar({
                        file: file,
                        avatar: reader.result
                      });
                    }
                    reader.readAsDataURL(file)
                    let formData = new FormData();
                    formData.append('image', file);
                    await Axios.post(
                      `http://176.9.19.106:1337/v0/file`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                          "x-auth": `${token}`
                        }
                      })
                      .then(async (result) => {
                        console.log(result.data.data.id);
                        id = result.data.data.id
                        console.log(typeof id);                       
                        
                        setId(1)
                        console.log(Id);                        
                      });
                    setFieldValue('avatar',id)
                      
                    
                  }}
                 
                  className={`form-control input ${
                    errors.avatar && touched.avatar && 'is-invalid'
                    }`}
                />
                {  user.avatar == "" || showAvatar.avatar.length > 0
                    ? <img alt='preview'
                      height='100px'
                      width='100xp'
                      src={showAvatar.avatar} />                      
                    : <img alt='preview'
                    height='100px'
                    width='100xp'
                    src={`http://176.9.19.106:1337/v0/file/${user.avatar}`} />
                }
              </FormGroup>
            </Col>
            
            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="profileImage1">{'profileImage1'}</Label>
                <Field
                  type="file"
                  name="profileImage1"
                  id="profileImage1"
                  onChange={async (e) => {
                    let reader = new FileReader();
                    let file = e.target.files[0];
                    console.log(file);
                    reader.onloadend = () => {
                      setShow({
                        file: file,
                        imagePreviewUrl1: reader.result
                      });
                    }
                    reader.readAsDataURL(file)
                    let formData = new FormData();
                    formData.append('image', file);
                    await Axios.post(
                      `http://176.9.19.106:1337/v0/file`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                          "x-auth": `${token}`
                        }
                      })
                      .then(async (result) => {
                        console.log(result.data.data.id);
                        let id = result.data.data.id                        
                      }).catch((err) => {
                        console.log(err);
                      });
                  }}
                  className={`form-control input ${
                    errors.profileImage1 && touched.profileImage1 && 'is-invalid'
                    }`}
                />{
                  show.imagePreviewUrl1.length > 0
                    ? <img alt='preview'
                      height='100px'
                      width='100xp'
                      src={show.imagePreviewUrl1} />
                    : ''
                }
                {errors.profileImage1 && touched.profileImage1 ? (
                  <div className="invalid-feedback">{`${errors.profileImage1}`}</div>
                ) : null}
              </FormGroup>
            </Col>

            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="profileImage2">{'profileImage2'}</Label>
                <Field
                  type="file"
                  name="profileImage2"
                  id="profileImage2"
                  onChange={async (e) => {
                    let reader = new FileReader();
                    let file = e.target.files[0];
                    console.log(file);
                    reader.onloadend = () => {
                      setShow2({
                        file: file,
                        imagePreviewUrl2: reader.result
                      });
                    }
                    reader.readAsDataURL(file)
                    let formData = new FormData();
                    formData.append('image', file);
                    await Axios.post(
                      `http://176.9.19.106:1337/v0/file`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                          "x-auth": `${token}`
                        }
                      })
                      .then(async (result) => {
                        console.log(result.data.data.id);
                        let id = result.data.data.id
                       
                      }).catch((err) => {
                        console.log(err);
                      });
                  }}
                  className={`form-control input ${
                    errors.profileImage2 && touched.profileImage2 && 'is-invalid'
                    }`}
                />
                {
                  show2.imagePreviewUrl2.length > 0
                    ? <img alt='preview'
                      height='100px'
                      width='100xp'
                      src={show2.imagePreviewUrl2} />
                    : ''
                }
                {errors.profileImage2 && touched.profileImage2 ? (
                  <div className="invalid-feedback">{`${errors.profileImage2}`}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="profileImage3">{'profileImage3'}</Label>
                <Field
                  type="file"
                  name="profileImage3"
                  id="profileImage3"
                  onChange={async (e) => {
                    let reader = new FileReader();
                    let file = e.target.files[0];
                    console.log(file);
                    reader.onloadend = () => {
                      setShow3({
                        file: file,
                        imagePreviewUrl3: reader.result
                      });
                    }
                    reader.readAsDataURL(file)
                    let formData = new FormData();
                    formData.append('image', file);
                    await Axios.post(
                      `http://176.9.19.106:1337/v0/file`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                          "x-auth": `${token}`
                        }
                      })
                      .then(async (result) => {
                        console.log(result.data.data.id);
                        let id = result.data.data.id
                        

                      }).catch((err) => {
                        console.log(err);
                      });
                  }}
                  className={`form-control input ${
                    errors.profileImage3 && touched.profileImage3 && 'is-invalid'
                    }`}
                />
                {
                  show3.imagePreviewUrl3.length > 0
                    ? <img alt='preview'
                      height='100px'
                      width='100xp'
                      src={show3.imagePreviewUrl3} />
                    : ''
                }
                {errors.profileImage3 && touched.profileImage3 ? (
                  <div className="invalid-feedback">{`${errors.profileImage3}`}</div>
                ) : null}
              </FormGroup>
            </Col>

            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="profileImage4">{'profileImage4'}</Label>
                <Field
                  type="file"
                  name="profileImage4"
                  id="profileImage4"
                  onChange={async (e) => {
                    let reader = new FileReader();
                    let file = e.target.files[0];
                    console.log(file);
                    reader.onloadend = () => {
                      setShow4({
                        file: file,
                        imagePreviewUrl4: reader.result
                      });
                    }
                    reader.readAsDataURL(file)
                    let formData = new FormData();
                    formData.append('image', file);
                    await Axios.post(
                      `http://176.9.19.106:1337/v0/file`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                          "x-auth": `${token}`
                        }
                      })
                      .then(async (result) => {
                        console.log(result.data.data.id);
                        let id = result.data.data.id
                       
                      }).catch((err) => {
                        console.log(err);
                      });
                  }}
                  className={`form-control input ${
                    errors.profileImage4 && touched.profileImage4 && 'is-invalid'
                    }`}
                />
                {
                  show4.imagePreviewUrl4.length > 0
                    ? <img alt='preview'
                      height='100px'
                      width='100xp'
                      src={show4.imagePreviewUrl4} />
                    : ''
                }
                {errors.profileImage4 && touched.profileImage4 ? (
                  <div className="invalid-feedback">{`${errors.profileImage4}`}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="profileImage5">{'profileImage5'}</Label>
                <Field
                  type="file"
                  name="profileImage5"
                  id="profileImage5"
                  onChange={async (e) => {
                    let reader = new FileReader();
                    let file = e.target.files[0];
                    console.log(file);
                    reader.onloadend = () => {
                      setShow5({
                        file: file,
                        imagePreviewUrl5: reader.result
                      });
                    }
                    reader.readAsDataURL(file)
                    let formData = new FormData();
                    formData.append('image', file);
                    await Axios.post(
                      `http://176.9.19.106:1337/v0/file`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                          "x-auth": `${token}`
                        }
                      })
                      .then(async (result) => {
                        console.log(result.data.data.id);
                        let id = result.data.data.id
                       

                      }).catch((err) => {
                        console.log(err);
                      });
                  }}
                  className={`form-control input ${
                    errors.profileImage5 && touched.profileImage5 && 'is-invalid'
                    }`}
                />
                {
                  show5.imagePreviewUrl5.length > 0
                    ? <img alt='preview'
                      height='100px'
                      width='100xp'
                      src={show5.imagePreviewUrl5} />
                    : ''
                }
                {errors.profileImage5 && touched.profileImage5 ? (
                  <div className="invalid-feedback">{`${errors.profileImage5}`}</div>
                ) : null}
              </FormGroup>
            </Col>

            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="profileImage6">{'profileImage6'}</Label>
                <Field
                  type="file"
                  name="profileImage6"
                  id="profileImage6"
                  onChange={async (e) => {
                    let reader = new FileReader();
                    let file = e.target.files[0];
                    console.log(file);
                    reader.onloadend = () => {
                      setShow6({
                        file: file,
                        imagePreviewUrl6: reader.result
                      });
                    }
                    reader.readAsDataURL(file)
                    let formData = new FormData();
                    formData.append('image', file);
                    await Axios.post(
                      `http://176.9.19.106:1337/v0/file`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                          "x-auth": `${token}`
                        }
                      })
                      .then(async (result) => {
                        console.log(result.data.data.id);
                        let id = result.data.data.id
                        

                      }).catch((err) => {
                        console.log(err);
                      });
                  }}
                  className={`form-control input ${
                    errors.profileImage6 && touched.profileImage6 && 'is-invalid'
                    }`}
                />
                {
                  show6.imagePreviewUrl6.length > 0
                    ? <img alt='preview'
                      height='100px'
                      width='100xp'
                      src={show6.imagePreviewUrl6} />
                    : ''
                }
                {errors.profileImage6 && touched.profileImage6 ? (
                  <div className="invalid-feedback">{`${errors.profileImage6}`}</div>
                ) : null}
              </FormGroup>
            </Col>
            {/**social Profile */}

            <h1 style={{ textAlign: 'center', marginLeft: '290px', marginRight: '50px' }}>Social Profile</h1>
            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="socialProfile.website">{'Website'}</Label>
                <Field
                  type="text"
                  name="website"
                  id="website"
                  className={`form-control input ${
                    errors.website && 'is-invalid'
                    }`}
                />
                {errors.website ? (
                  <div className="invalid-feedback">{`${errors.website}`}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="socialProfile">{'Facebook'}</Label>
                <Field
                  type="text"
                  name="facebook"
                  id="facebook"
                  className={`form-control input ${
                    errors.facebook && touched.facebook && 'is-invalid'
                    }`}
                />
                {errors.facebook && touched.facebook ? (
                  <div className="invalid-feedback">{`${errors.facebook}`}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="socialProfile">{'Twitter'}</Label>
                <Field
                  type="text"
                  name="socialProfile.twitter"
                  id="twitter"
                  className={`form-control input ${
                    errors.facebook && touched.facebook && 'is-invalid'
                    }`}
                />
                {errors.twitter && touched.twitter ? (
                  <div className="invalid-feedback">{`${errors.twitter}`}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              {/* insta*/}
              <FormGroup>
                <Label htmlFor="socialProfile">{'Instagram'}</Label>
                <Field
                  type="text"
                  name="Instagram"
                  id="Instagram"
                  className={`form-control input ${
                    errors.instagram && 'is-invalid'
                    }`}
                />
                {errors.instagram ? (
                  <div className="invalid-feedback">{`${errors.instagram}`}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              {/* blog*/}
              <FormGroup>
                <Label htmlFor="socialProfile">{'Blog'}</Label>
                <Field
                  type="text"
                  name="blog"
                  id="blog"
                  className={`form-control input ${
                    errors.blog && 'is-invalid'
                    }`}
                />
                {errors.blog ? (
                  <div className="invalid-feedback">{`${errors.blog}`}</div>
                ) : null}
              </FormGroup>
            </Col>
            {/** Childern */}
            <h1 style={{ textAlign: 'center', marginLeft: '290px', marginRight: '100px' }}>Childern</h1>

            <Col md="10" sm="12">
              <FormGroup>
              {
                inputList.length  === 0 ?
                <Icon.PlusCircle onClick={handleAddClick}>
                </Icon.PlusCircle>
                :''
              }
                {inputList.map((x, i) => {
                  return (
                    <div key={{i}}>
                      <Field
                        name="name"
                        key={i+1}
                        placeholder="Enter Name"
                        value={x.name}
                        onChange={e => handleInputChange(e, i,setFieldValue)}
                        className={`form-control input`}
                      />
                      <Field
                      key={i+2}
                        className="ml10"
                        name="gender"
                        placeholder="type Male or Female"
                        value={x.gender}
                        className={`form-control input`}
                        onChange={e => handleInputChange(e, i,setFieldValue)}
                      />
                      <Field
                        id='age'
                        key={i+3}
                        name="age"
                        placeholder="Enter Age"
                        value={x.age}
                        className={`form-control input`}
                        onChange={e => handleInputChange(e, i,setFieldValue)
                        
                      }
                      />
                      <span className="btn-box">
                        {
                          inputList.length !== 1 &&
                          <Icon.MinusCircle
                            className="mr10"
                            onClick={() => handleRemoveClick(i)}
                          >Remove
                        </Icon.MinusCircle>
                        }
                       
                        {
                          inputList.length - 1 === i &&
                          <Icon.PlusCircle onClick={handleAddClick}>
                          </Icon.PlusCircle>
                        }
                      </span>
                    </div>
                  );
                })}
              </FormGroup>
            </Col>
            <br />
            <Col md="12" sm="12" className="text-right">
              <Button
                type="submit"
                color="primary"
                disabled={isLoading ? true : false}
                className="round"
              >
                {isLoading && <Spinner color="white" size="sm" />}
                <span className="ml-50">
                  {' '}
                  {isLoading ? 'Loading...' : 'Submit'}
                </span>
              </Button>
              <NavLink
                to={user ? '/dashboard' : '/users'}
                className="btn btn-secondary round ml-2"
              >
                {'Cancel'}
              </NavLink>
            </Col>
            </Row>
          </Form>
  )
}
    </Formik >
  );
};

UserForm.defaultProps = {
  firstName: '',
  lastName: '',
  email: '',
  emailVerified: '',
  expirationDate: '',
  description: '',
  city: '',
  lastKnownCity: '',
  latitude: '',
  name: '',
  zipCode: '',
  birthYear: '',
  handleSubmit: () => { },
  edit: false,
  user: false,
};

export default UserForm;
