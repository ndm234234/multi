import * as React from 'react'
import { Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

function InputPanel(props)
{
    return  (
         <><Form.Group as={Row} className="mb-3">
            <Form.Label column sm="1">Начало</Form.Label>
            <Col sm="2">
                <Form.Control id="from" required type="number" placeholder="Введите начальное число" defaultValue={props.fromValue} />
            </Col>
            </Form.Group><Form.Group as={Row} className="mb-3">
            <Form.Label column sm="1">Конец</Form.Label>
            <Col sm="2">
                <Form.Control id="to" required type="number" placeholder="Введите конечное число" defaultValue={props.toValue} />
            </Col>
            </Form.Group><Form.Group as={Row} className="mb-3">
                <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="me-2" aria-label="Third group">
                        <Button onClick={() => {
                            props.onSubmit();
                        } }>Рассчитать</Button>
                    </ButtonGroup>
                    <ButtonGroup className="me-2" aria-label="Third group">
                        <Button disabled={!props.allowPrint} onClick={() => window.print()}>Печать</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Form.Group></>);
}

export default InputPanel;
