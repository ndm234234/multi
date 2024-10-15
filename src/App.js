import  { useEffect, useState, useCallback } from "react";

import * as React from 'react'

import logo from './logo.svg';
import './App.css';

import "bootstrap/dist/css/bootstrap.css";

import { Navbar, NavItem, Nav, NavLink, Collapse, Container, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import ButtonGroup from "react-bootstrap/ButtonGroup"; 
import Button from "react-bootstrap/Button";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';

function App() {
  const [tableColumns, setTableColumns] = useState(0);
  const [tableData, setTableData] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [fromValue, setFromValue] = useState(5);
  const [toValue, setToValue] = useState(5);
  const [open, setOpen] = useState(false);

 const onSubmit = useCallback(()=>{
    console.log(document.getElementById("from").value);

    const from = parseInt(document.getElementById("from").value);
    const to = parseInt(document.getElementById("to").value);

    const multi = new Array();

    for (let  k = 1; k < 10; k++)
    {
      for (let i = from; i <= to; ++i)
      {
        multi.push(
        {
          result : i * k,
          x : k,
          y : i,
          action : "x"
        });
      }
    }

    const devide = new Array();
    for(let rec of multi)
    {
        devide.push(
        {
          result : rec.result / rec.y,
          x : rec.result,
          y : rec.y,
          action : ":"
        });
    }

    let infos = new Array();
    for (let i = 0; i < 3; ++i)
    {
      infos = infos.concat(multi).concat(devide);
    }

    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) { 
          // Generate random number 
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
    };

    const columns = 6;

    let infoColumns = new Array();
    for (let i = 0; i < columns; ++i)
    {
      let newInfos = shuffleArray(infos);
      infoColumns.push(newInfos.slice());
    }

    let resultColumns = new Array();
    for (let i = 0; i < infos.length; ++i)
    {
      resultColumns.push(new Array());
      for (let k = 0; k < infoColumns.length; ++k)
      {
        resultColumns[resultColumns.length-1].push(infoColumns[k][i]);
      }
    }

    setTableColumns(infoColumns);
    setTableData(resultColumns);
    setOpen(true)
 },[])

  return (
  <div className="App">
  <Accordion defaultActiveKey="0">
    <Accordion.Item eventKey="0">
      <Accordion.Header>Генератор таблицы умножения</Accordion.Header>
      <Accordion.Body>
      <Form>
        <Form.Group as={Row}  className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>Начало</Form.Label>
          <Col sm={2}>
          <Form.Control id="from"
          required
          type="text"
          placeholder="First name"
          defaultValue={fromValue}
          />
          </Col>
        </Form.Group> 
        <Form.Group as={Row}  className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={2} >Конец</Form.Label>
          <Col sm={2}>
          <Form.Control id="to"
          required
          type="text"
          placeholder="First name"
          defaultValue={toValue}
          />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
          <Button type="button"
          onClick={() =>  { onSubmit(); setShowTable(true); }} 
          >Рассчитать</Button>
          </Col>
        </Form.Group>
      </Form>
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>

  <Collapse in={open} > 
  <div >
  <TableDisplay visible={showTable} tableData={tableData} tableColumns={tableColumns}/>
  </div>
  </Collapse>
  </div>
  );
}

export default App;

function TableDisplay(props) {
  if (!props.visible) 
  {
    return <div></div>
  }
  else 
  return (
    <Table responsive cellspacing="2" cellpading="2">
    <thead>
      <tr>
      {props.tableColumns.map(arrayData=>{
        return (
        <th></th>
        )})}
      </tr>
    </thead>
    <tbody>
      {props.tableData.map(arrayData=>{
        return(
        <tr>
          {arrayData.map(arrayCeil=>{
          return(  
          <td>{arrayCeil.x.toString().padStart(2) + arrayCeil.action + arrayCeil.y + "="}</td>
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
