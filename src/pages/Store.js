import {Row, Col} from "react-bootstrap"
import { productsArray } from "../ProductsStore";

function Store() {
    return(
    <>
        <h1 aling="center" className="p-3">Welcome to store</h1>
        <Row xs={1} md={3} className="g-4" >
           
                {productsArray.map((product, index)=> (
                    <Col aling="center" key={index}>
                        <h1>{product.title}</h1>
                    </Col>
                ))}
            
        </Row> 
    </>
    )
}

export default Store;