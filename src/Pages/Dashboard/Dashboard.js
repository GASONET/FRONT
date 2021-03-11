import React from 'react';
import {Row, Col, Card, Table} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import visaBack from '../../assets/images/widget/visa-background.png';
import visa from '../../assets/images/widget/visa-logo.png';
import amex from '../../assets/images/widget/amex-logo.png';
import mastercard from '../../assets/images/widget/master-logo.png';
import dinners from '../../assets/images/widget/diners-logo.png';

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

import { getMedioPago } from './../../api/getMedio';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user:{},
            medio: false,
            tarjetas: [],
        };
        this.tipodocumento = {
            1: "Cedula Ciudadania",
            8: "NIT"
        }
        this.franquicia = {
            '1': mastercard,
            '2': visa,
            '3': amex,
            '4': dinners
        }
    }

    async fetchData() {

        // localstorage user data
        await this.setState({user: JSON.parse(localStorage.getItem('user'))});
        //console.log(this.state.user.numeroContrato)

        //get medio de pago 

      await getMedioPago(this.state.user.numeroContrato)
        .then(result => {
            let response = result.response
            console.log('en el dashboard ',response)
            if(response.status === 500) {
                alert('Error de Servidor')
            }
            if(response.status === 400) {
                alert('Not found')
            }
            if(response.status === 404) {
                alert('Verifique sus Datos')
                
            }
            if(response.status === 200 || response.status === 201) {
                console.log(response.data);
                let data = response.data
                if(data.code == '00'){
                    this.setState({medio: true, tarjetas: data.medios})
                }
                else if(data.code == '03')
                {   
                    this.setState({medio:false})
                    alert('Error Authenticacion')
                }
                else if(data.code == '05'){
                    this.setState({medio:false})
                    alert('No tiene Medios de Pago Registrados')
                }
            }
        })
        .catch(err => {
            alert(err);
        })




        /*const result = await getProducts();
        if(result.response.status === 500) {
            alert('Error en el servidor');
            this.setState({ user: [], loading: false})
        }
        else {
            this.setState({ user: result.response, loading: false})
        }*/
    }
    
    componentDidMount() {
        this.fetchData();

        // appFetch( { url, body, method, auth})
    }


    render() {
        const user = this.state.user;
        const medio = this.state.medio;
        
        let button;
        if(medio){
            button = <a href="/updateCard"className="btn btn-danger text-uppercase btn-block">Actualizar Tarjeta</a>
        }
        else(
            button = <a href="/createCard"className="btn btn-danger text-uppercase btn-block">Crear Tarjeta</a>
        )
        return (
            <Aux>
                <Row className="justify-content-md-center">
                <Col md={8} xl={6}>
                
                <Card>
                            <Card.Body>
                                <div className="text-center m-b-20">
                                    <img className="img-fluid rounded-circle" src={avatar2} alt="dashboard-user" />
                                        <h5 className="mt-3">{user.nombre}</h5>
                                </div>
                                <h5 className=" m-b-0">Tipo Documento <span className="float-right">{this.tipodocumento[user.tipoDocumento]}</span></h5>
                                <br></br>
                                <h5 className=" m-b-0">Documento <span className="float-right">{user.documento}</span></h5>
                                <br></br>
                                
                
                               
                                <div className="row m-t-20 justify-content-center">
                                    <div className="col-6">
                                            {button}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>  
                        
                        {
                            medio ? 

                            this.state.tarjetas.map((tarjeta)=>(
                                
                                <Card  key={tarjeta.id} className='bg-c-blue visa-top'  >
                                <Card.Header className='borderless'>
                                    <Card.Title as='h5' className='text-white float-left'>{user.nombre}</Card.Title>
                                    <img src={this.franquicia[tarjeta.franquicia]} className='img-fluid float-right' alt='card title' />
                                </Card.Header>
                                <Card.Body className='visa'>
                                    {
                                        /*
                                    }
    
                                    <h6 className="f-w-600 text-white ">VALID <span className="f-w-300 m-l-10">05/17</span></h6>
    */
                                    }
                                    <h3 className="f-w-300 text-white m-t-15 m-b-0">XXXX-XXXX-XXXX-{tarjeta.numeroTarjeta.substr(tarjeta.numeroTarjeta.length - 4)}</h3>
                                    {
                                        //<img src={visaBack} className='img-fluid' alt='card back' />
                                    }
                                </Card.Body>
                            </Card>

                            ))
                          

                        :
                        <br/>

                        }
                        

                            
                        </Col>
                        
                      
                </Row>
                

                
                
            </Aux>
        );
    }
}

export default Dashboard;