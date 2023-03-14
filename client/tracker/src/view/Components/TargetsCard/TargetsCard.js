import './TargetsCard.css';
import { Card, Row, Col } from 'reactstrap';
import ProgressBar from '../ProgressBar/ProgressBar';


const TargetsCard=({carbPercent, fatPercent, protienPercent, totalCarbs, totalFats, totalProtien})=>{
   return (
   <Card className='macro-targets-card'>
                            <Row>
                                <h4 className='text-center color-gray'>Targets</h4>
                            </Row>
                            <Row>
                                <Col xs='3' md='2'>
                                    <p>Carbs</p>
                                </Col>
                                <Col xs='8' md='9'>
                                    <ProgressBar bgcolor="#A65886" progress={carbPercent}  height={16} label={totalCarbs} />
                                </Col>
                                <Col/>
                            </Row>
                            <Row>
                                <Col xs='3' md='2'>
                                    <p>Fat</p> 
                                </Col>
                                <Col xs='8' md='9'>
                                    <ProgressBar bgcolor="#E18671" progress={fatPercent}  height={16} label={totalFats} />
                                </Col>
                                <Col/> 
                            </Row>
                            <Row>
                                <Col xs='3' md='2'>
                                    <p>Protein</p>
                                </Col>
                                <Col xs='8' md='9'>
                                    <ProgressBar bgcolor="#1F65B3" progress={protienPercent}  height={16} label={totalProtien} />
                                </Col>
                                <Col/>                      
                            </Row>
                            
                            
                        </Card>
   )
}

export default TargetsCard;