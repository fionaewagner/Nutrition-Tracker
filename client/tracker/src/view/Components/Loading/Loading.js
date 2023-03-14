import { Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faSpinner,
  
 
  
} from "@fortawesome/free-solid-svg-icons";
import './Loading.css'

const Loading = ()=>{
    //<i className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"/>
    return(
        <Row className='loading'>
            <Col xs='4'/>
            <Col xs='1'>
                <FontAwesomeIcon className='loading-symbol fa-pulse fa-2x' icon={faSpinner}/>
            </Col>
            <Col >
                <h1>Loading...</h1>
            </Col>
        </Row>
    )

}

export default Loading