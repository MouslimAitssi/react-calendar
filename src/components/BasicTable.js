import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { days, rows } from '../shared/constants';
import CustomTableCell from './CustomTableCell';


export default function BasicTable() {

  function fillValuesWithZeros() {
    let vals = [];
    rows.map((row) => {
      let arr = []
      days.map((day) => {
        arr.push(0);
      })
      vals.push([row, arr]);
    });
    return vals;
  }
  
  function getValue(row, day) {
    for (let index = 0; index < values.length; index++) {
      if(values[index][0] === row) {
        if(values[index][1][day - 1] !==0) {// Modification ajoutée pour afficher le vide au lieu des zéros
          return values[index][1][day - 1];
        }
        return '';
      }
    }
  }


  
  function toggle(row, day) {
    let vals = Object.create(values);
    for (let index = 0; index < vals.length; index++) {
      if(vals[index][0] === row) {
        vals[index][1][day - 1] = (vals[index][1][day - 1] + 0.5)%2;
        break;
      }
    }
    setValues(vals);
  }

  const [values, setValues] = useState([]);
  useEffect(() => {
    setValues(fillValuesWithZeros());
  }, []);
  return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Jours du mois</TableCell>
              {days.map((day) => (
              <TableCell align="right" key={day}>{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell key={row} component="th" scope="row">
                  {row}
                </TableCell>
                {days.map((day) => {
                  return (
                    <CustomTableCell key={day + row} toggle={toggle} row={row} day={day} value={getValue(row, day)}/>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

  );
}