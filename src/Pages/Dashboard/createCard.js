import React from 'react';
import Cards from 'react-credit-cards';
import {Row, Col, Card, Form, Button} from 'react-bootstrap';
import { ValidationForm, TextInput, BaseFormControl, SelectGroup, FileInput, Checkbox, Radio } from 'react-bootstrap4-form-validation';
import MaskedInput from 'react-text-mask';
import validator from 'validator';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData
  } from "./utils";
import Aux from "../../hoc/_Aux";
import AnimatedModal from "../../App/components/AnimatedModal";

import { createMedio } from './../../api/createMedio';


class FormsValidation extends React.Component  {


    constructor(props){
        super(props);
        this.state = {
            number: "",
            name: "",
            expiry: "",
            cvc: "",
            issuer: "",
            focused: "",
            fclearInputOnReset:false,
            submitting: false,
        };
        this.formRef = React.createRef();
        this.franquicia = {
            mastercard : '1',
            visa : '2',
            amex : '3',
            dinersclub : '4'
        }

    }
    
    getInputRef(){
        return this.inputRef.current.inputElement;
    }



    handleCallback = ({ issuer }) => {
        
          this.setState({ issuer });
        
      };

    handleCheckboxChange = (e, value) => {
        this.setState({
            [e.target.name]: value
        })
    };

    handleChange = (e) => {
        if (e.target.name === "number") {
            e.target.value = formatCreditCardNumber(e.target.value);
          } else if (e.target.name === "expiry") {
            e.target.value = formatExpirationDate(e.target.value);
          } else if (e.target.name === "cvc") {
            e.target.value = formatCVC(e.target.value);
          }



        this.setState({
            [e.target.name]: e.target.value
        })
    };

     handleSubmit = async(e) => {
        e.preventDefault();
        const { issuer } = this.state;
        this.setState({ submitting: true })
        if(this.state.expiry.slice(2, 4) > 12){
            alert(' Error Fecha de expiración')
            this.setState({ submitting: false })
          }
        else{
        let data = {
            numeroContrato : JSON.parse(localStorage.getItem('user')).numeroContrato,
            numeroTarjeta : this.state.number.replace(/\s/g, ''),
            fechaVencimiento : this.state.expiry.replace('/', ''),
            franquicia: this.franquicia[this.state.issuer],
            create: true
        }
     

        await createMedio(data)
        .then(result => {
            let response = result.response
            console.log('en el update ',response)
            if(response.status == 500) {
                this.setState({submitting: false , number:"", expiry:""})
                this.resetForm();
                alert('Petición erronea')
                
            }
            if(response.status == 400) {
                this.setState({submitting: false , number:"", expiry:""})
                this.resetForm();
                alert('Verifique sus Datos')
                
            }
            if(response.status == 404) {
                this.setState({submitting: false , number:"", expiry:""})
                this.resetForm();
                alert('Verifique sus Datos')
                
            }
            if(response.status == 200 || response.status == 201) {
                
                let data = response.data
                if(data.code == '00'){
                    alert('Medio de Pago Creado con Exito!')
                    this.setState({submitting: false , number:"", expiry:""})
                }
                else if(data.code == '03')
                {   
                    alert('Error Authenticacion')
                    this.setState({submitting: false , number:"", expiry:""})
                }
                else if(data.code == '05'){
                  
                    alert('No tiene Medios de Pago Registrados')
                    this.setState({submitting: false , number:"", expiry:""})
                }
                else if(data.code == '09'){
                    alert('Registro No valido')
                    this.setState({submitting: false , number:"", expiry:""})
                }
                this.resetForm();
                
            }
        })
        .catch(err => {
            alert(err);
        })


   


        }
        
        
        //this.form.reset();
      };



    handleErrorSubmit = (e, formData, errorInputs) => {
        console.log(errorInputs);
        alert('Verificar Campos')
     
    };

    handleInputFocus = ({ target }) => {
        this.setState({
          focused: target.name
        });
      };
    
      resetForm = () => {
        let formRef = this.formRef.current;
        formRef.resetValidationState(this.state.clearInputOnReset);
    }
 

    render() {

        const { submitting, issuer } = this.state;
        return (
            <Aux>
                <Row className="justify-content-md-center">
                <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Crear Tarjeta</Card.Title>
                            </Card.Header>
                            <Card.Body>
                            <div id="PaymentForm">
                            <Cards
                                cvc={this.state.cvc}
                                expiry={this.state.expiry}
                                focused={this.state.focused}
                                name={this.state.name}
                                number={this.state.number}
                                callback={this.handleCallback}
                            />

                            <ValidationForm ref={this.formRef} onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
                                    <Form.Row className="justify-content-md-center">

                                    <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="number"></Form.Label>
                                            <TextInput
                                                name="number"
                                                type="tel"
                                                id="number"
                                                pattern="[\d| ]{16,22}"
                                                placeholder="Card Number"
                                                onChange={this.handleChange}
                                                onFocus={this.handleInputFocus}
                                                autoComplete="off"
                                                value={this.state.number}
                                                required
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                { /*
                                    <Form.Row className="justify-content-md-center">
                                    <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="name"></Form.Label>
                                            <TextInput
                                                name="name"
                                                type="text"
                                                id="name"
                                                placeholder="Name"
                                                onChange={this.handleChange}
                                                onFocus={this.handleInputFocus}
                                                autoComplete="off"
                                                required
                                            />
                                        </Form.Group>
                                
                               

                                    </Form.Row>
                                    */
    }
                                    <Form.Row className="justify-content-md-center">
                                    <Form.Group as={Col} md="4">
                                            <Form.Label htmlFor="expiry"></Form.Label>
                                            <TextInput
                                                name="expiry"
                                                type="tel"
                                                id="expiry"
                                                pattern="\d\d/\d\d"
                                                placeholder="yy/mm"
                                                onFocus={this.handleInputFocus}
                                                onChange={this.handleChange}
                                                value={this.state.expiry}
                                                autoComplete="off"
                                                required
                                            />
                                        </Form.Group>

                                    {
                                        /*
                                        <Form.Group as={Col} md="2">
                                            <Form.Label htmlFor="cvv"></Form.Label>
                                            <TextInput
                                                name="cvc"
                                                type="tel"
                                                id="cvc"
                                                pattern="\d{3,4}"
                                                placeholder="CVC"
                                                onFocus={this.handleInputFocus}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                
                               */
                                    }

                                    </Form.Row>

                                    <Form.Row className="justify-content-md-center">
                                    <Form.Group md={12}  className="mt-3">
                                    <input type="hidden" name="issuer" value={issuer} />
{
                                    !submitting ?
                                            <Button className="btn btn-danger" type="submit">Crear Tarjeta</Button>
                                            :
                                            <Button disabled>
                                                <span className="spinner-grow spinner-grow-sm mr-1" role="status" />Creando...
                                            </Button>
    }
                                        </Form.Group>


                                    </Form.Row>


                                    
                                </ValidationForm>

                                </div>
                                {
                                    /*                                
                                <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
                                    <Form.Row>
                                        <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="firstName">Nombre</Form.Label>
                                            <TextInput
                                                name="firstName"
                                                id="firstName"
                                                placeholder="Nombre"
                                                required value={this.state.firstName}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="lastName">Apellido</Form.Label>
                                            <TextInput
                                                name="lastName"
                                                id="lastName"
                                                placeholder="Apellido"
                                                minLength="4"
                                                value={this.state.lastName}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="email">Email</Form.Label>
                                            <TextInput
                                                name="email"
                                                id="email"
                                                type="email"
                                                placeholder="Dirección Email "
                                                validator={validator.isEmail}
                                                errorMessage={{validator:"email no valido"}}
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="password">Contraseña</Form.Label>
                                            <TextInput
                                                name="password"
                                                id="password"
                                                type="password"
                                                placeholder="Contraseña"
                                                required
                                                pattern="(?=.*[A-Z]).{6,}"
                                                errorMessage={{required:"Contraseña requerida", pattern: "La contraseña debe ser mayor a 6 caracteres y debe contener al menos una letra Mayuscula"}}
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="confirmPassword">Confirmar Contraseña</Form.Label>
                                            <TextInput
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                type="password"
                                                placeholder="Confirmar Contraseña"
                                                required
                                                validator={this.matchPassword}
                                                errorMessage={{required:"Confirmacion es requerido", validator: "Las contraseñas no coinciden"}}
                                                value={this.state.confirmPassword}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="phone">Telefono</Form.Label>
                                            <MaskWithValidation
                                                name="phone"
                                                id="phone"
                                                placeholder="Telefono de Contacto"
                                                className="form-control"
                                                required
                                                //validator={(value) => value === "(123) 456-7890"}
                                                value={this.state.phone}
                                                onChange={this.handleChange}
                                                //successMessage="Looks good!"
                                                //errorMessage={{validator: "Please enter (123) 456-7890"}}
                                                mask={['(', /[1-9]/, /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                        
                                        
                                        <Form.Group as={Col} sm="12">
                                            <Form.Label htmlFor="description">Descripcion</Form.Label>
                                            <TextInput
                                                name="description"
                                                id="description"
                                                placeholder="Descripcion"
                                                multiline
                                                required
                                                value={this.state.description}
                                                onChange={this.handleChange}
                                                rows="3"
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={12} className="mt-3">
                                            <Button type="submit">Crear</Button>
                                        </Form.Group>


                                        
                                    </Form.Row>
                                </ValidationForm>
                                <AnimatedModal animation='slideInDown' showModal={this.state.showModal} modalClosed={() => this.setState({ showModal: false })}>
                                    <Card>
                                        <Card.Header as="h5" className="theme-bg2">
                                            User Information
                                        </Card.Header>
                                        <Card.Body>
                                            <ul>
                                                <li><strong>Full Name:</strong> {this.state.firstName} {this.state.lastName}</li>
                                                <li><strong>Email:</strong> {this.state.email}</li>
                                                <li><strong>Password:</strong> Yes</li>
                                                <li><strong>Phone:</strong> {this.state.phone}</li>
                                                 <li><strong>About:</strong> {this.state.description}</li>
                                            </ul>
                                        </Card.Body>
                                        <Card.Footer className="text-center">
                                            <button onClick={() => this.setState({ showModal: false })} className="btn btn-theme2 md-close">Close Me!!</button>
                                        </Card.Footer>
                                    </Card>
                                </AnimatedModal>
*/
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default FormsValidation;