import  { useEffect, useState, useCallback } from "react";
import * as React from 'react'

import logo from './logo.svg';
import './App.css';

import "bootstrap/dist/css/bootstrap.css";

import { Navbar, NavItem, Nav, NavLink, Collapse, Container, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import ButtonGroup from "react-bootstrap/ButtonGroup"; 
import Button from "react-bootstrap/Button";
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';

import  { shuffleArray, deepCopyArray } from "./tools.js";

function App() {
  const [tableData, setTableData] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [fromValue, setFromValue] = useState(5);
  const [toValue, setToValue] = useState(5);
  const [open, setOpen] = useState(false);
  const [allowPrint, setAllowPrint] = useState(false);

 const onSubmit = useCallback(()=>{
    console.log(document.getElementById("from").value);

    const from = parseInt(document.getElementById("from").value);
    const to = parseInt(document.getElementById("to").value);

    const multi = new Array();

    for (let  k = 1; k < 10; k++) {
      for (let i = from; i <= to; ++i) {
        multi.push({
          result : i * k,
          x : k,
          y : i,
          action : "x"
        });
      }
    }

    const devide = new Array();
    for(let rec of multi) {
        devide.push({
          result : rec.result / rec.y,
          x : rec.result,
          y : rec.y,
          action : ":"
        });
    }

    const columns = 6;
    const repeatAction = 3;
    const oneColumndData = new Array();
    const arrayUnique = new Set();
    const dataByColumns = new Array();

    {
      for (let i = 0; i < repeatAction; ++i) {
        var multiNew = deepCopyArray(multi);
        for(var rec of multiNew) {
          var key = rec.x.toString() + "x" + rec.y.toString();
          if (arrayUnique.has(key)) {
            arrayUnique.delete(key);
            [ rec.x, rec.y ] = [rec.y, rec.x];
            key = rec.x.toString() + "x" + rec.y.toString();
            arrayUnique.add(key);
          } else {
            arrayUnique.add(key);
          }
        }
        var newData = multiNew.concat(devide.slice());
        oneColumndData.push(...newData);
      }

      for (let i = 0; i < columns; ++i) {
        dataByColumns.push(shuffleArray(deepCopyArray(oneColumndData)));
      }
    }

    let index = 0;
    const tableDataValue = new Array();
    for (let i = 0; i < oneColumndData.length; ++i)
    {
      const newArray = new Array();
      for (let data of dataByColumns) {
        const rec = data[i];
        newArray.push({
          id : index ++,
          result : rec.result,
          x : rec.x,
          y : rec.y,
          action : rec.action
        });
      }
      tableDataValue.push(newArray);
    }

    setTableData(tableDataValue);
    setOpen(true)
 },[])

  return (
  <div className="App">
    <div className="d-print-none fixed-top">
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Генератор таблицы умножения</Accordion.Header>
        <Accordion.Body>
          <Form.Group as={Row}  className="mb-3">
            <Form.Label column sm="1" >Начало</Form.Label>
            <Col sm="1">
              <Form.Control column sm="1" id="from" required type="number" placeholder="Введите начальное число" defaultValue={fromValue}/>
            </Col>
          </Form.Group> 
          <Form.Group as={Row}  className="mb-3">
            <Form.Label column sm="1" >Конец</Form.Label>
            <Col sm="1">
            <Form.Control id="to" required type="number" placeholder="Введите конечное число" defaultValue={toValue} />
            </Col>
          </Form.Group> 
          <Form.Group as={Row} className="mb-3">
              <ButtonToolbar aria-label="Toolbar with button groups">
                <ButtonGroup className="me-2" aria-label="Third group">
                  <Button onClick={() => { 
                    onSubmit(); 
                    setShowTable(true); 
                    setAllowPrint(true);
                    }} >Рассчитать</Button>
                </ButtonGroup>
                <ButtonGroup className="me-2" aria-label="Third group">
                  <Button disabled={!allowPrint} onClick={() => window.print()} >Печать</Button>
                </ButtonGroup>
            </ButtonToolbar>
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>

    <Collapse in={open} > 
      <div >
        <TableDisplay visible={showTable} tableData={tableData}/>
      </div>
    </Collapse>
  </div>
  );
}

export default App;

function TableDisplay(props) {
  if (!props.visible) 
  {
    return null;
  }
  else 
  return (
   <Table className="TableResult table-bordered" responsive>
    <tbody>
      {props.tableData.map((arrayData, index)=>{
        return(
        <tr key= {index}>
          {arrayData.map(arrayCeil=>{
          return(  
          <td key={arrayCeil.id}>{arrayCeil.x.toString().padStart(2) + " " + arrayCeil.action + " " + arrayCeil.y + " ="}</td>
          )
          })}
        </tr>
        )
        }) 
      }
    </tbody>
  </Table>
  );
}
