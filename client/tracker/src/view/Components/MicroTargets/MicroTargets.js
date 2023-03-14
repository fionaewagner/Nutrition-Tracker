import { Row, Card, Col } from "reactstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  
    faCircle
    
  } from "@fortawesome/free-solid-svg-icons";
  import './MicroTargets.css'
const MicroTargets=({iron, calcium, magnesium, zinc, potassium})=>{
    return(
        <Row>
                    <Card className='minerals-card'>
                        <Row className='pt-1 mb-3'>
                            <Col className='text-center color-gray'>
                                <strong>Iron</strong>
                            </Col>
                            <Col className='text-center color-gray'>
                                <strong>Calcium</strong>
                            </Col>
                            <Col className='text-center color-gray'>
                                <strong>Magnesium</strong>
                            </Col>
                            <Col className='text-center color-gray'>
                                <strong>Zinc</strong>
                            </Col>
                            <Col className='text-center color-gray'>
                                <strong>Potassium</strong>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='text-center mb-3'>
                                <span className="fa-stack fa-xl sp">
                                    <FontAwesomeIcon className='circle-icon iron fa-2x' icon={faCircle}/>
                                        <strong className="fa-stack-1x iron-text">{iron + "mg"}</strong>
                                </span>
                            </Col>
                            <Col className='text-center'>
                                <span className="fa-stack fa-xl sp">
                                    <FontAwesomeIcon className='circle-icon calcium fa-2x' icon={faCircle}/>
                                        <strong className="fa-stack-1x iron-text">{calcium + "mg"}</strong>
                                </span>
                            </Col>
                            <Col className='text-center'>
                                <span className="fa-stack fa-xl sp">
                                    <FontAwesomeIcon className='circle-icon magnesium fa-2x' icon={faCircle}/>
                                        <strong className="fa-stack-1x iron-text">{magnesium + "mg"}</strong>
                                </span>
                            </Col>
                            <Col className='text-center'>
                                <span className="fa-stack fa-xl sp">
                                    <FontAwesomeIcon className='circle-icon zinc fa-2x' icon={faCircle}/>
                                        <strong className="fa-stack-1x iron-text">{zinc + "mg"}</strong>
                                </span>
                            </Col>
                            <Col className='text-center'>
                            <span className="fa-stack fa-xl sp">
                                    <FontAwesomeIcon className='circle-icon potassium fa-2x' icon={faCircle}/>
                                        <strong className="fa-stack-1x iron-text">{potassium + "mg"}</strong>
                                </span>
                            </Col>

                        </Row>
                    </Card>
                </Row>
    )
}

export default MicroTargets