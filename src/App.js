import  { useEffect, useState, useCallback } from "react";
import * as React from 'react'

import logo from './logo.svg';
import './App.css';

import "bootstrap/dist/css/bootstrap.css";

import { Collapse } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';

import  { shuffleArray, shuffle, deepCopyArray } from "./tools.js";
import InputPanel from "./InputPanel.js"

function App() {
  const [tableData, setTableData] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [fromValue, setFromValue] = useState(7);
  const [toValue, setToValue] = useState(7);
  const [open, setOpen] = useState(false);
  const [allowPrint, setAllowPrint] = useState(false);

 const onSubmit = useCallback(()=>{
    const from = Math.min(100, parseInt(document.getElementById("from").value));
    const to = Math.min(100, parseInt(document.getElementById("to").value));
   
    const multi = new Array();

    for (let k = 1; k < 10; k++) {
      for (let i = from; i <= to; ++i) {
        multi.push({
          result : i * k,
          x : k,
          y : i,
          action : "x"
        });
      }
    }

    const devide = multi.map((rec) => {
      return {
        result : rec.result / rec.y,
        x : rec.result,  y : rec.y,
        action : ":"
      }
    });

    const columns = 6;
    const repeatAction = 3;
    const oneColumndData = new Array();
    const arrayUnique = new Set();
    const dataByColumns = new Array();

    {
      for (let i = 0; i < repeatAction; ++i) {
        var multiNew = deepCopyArray(multi);
        for(let rec of multiNew) {
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
      const newArray = dataByColumns.map((item) => {
        const rec = item[i];
        return {
          id : index ++,
          result : rec.result,
          x : rec.x,
          y : rec.y,
          action : rec.action
        }});
      tableDataValue.push(newArray);
    }

    setTableData(tableDataValue);
    setOpen(true)
    setShowTable(true); 
    setAllowPrint(true);
 },[])

  return (
  <div className="App">
    <div className="d-print-none sticky-top">
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Генератор таблицы умножения</Accordion.Header>
        <Accordion.Body>
          <InputPanel allowPrint={allowPrint} fromValue={fromValue} setFromValue={setFromValue} toValue={toValue} onSubmit={onSubmit} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>

    <Collapse in={open} > 
      <div className="position-static">
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
