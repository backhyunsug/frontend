import React, { Component } from 'react';
import { Link, useNavigate  } from "react-router-dom";
import Axios from 'axios';

function TableRow(props){
  let history = useNavigate ();


  const deleteItem = (e)=>{
      if(window.confirm("삭제하시겠습니까?"))
      {
        Axios.get(process.env.REACT_APP_HOST_URL+'/board/delete/'+props.obj.id)
            .then(
              ()=>{
                console.log('Deleted');
                //부모 컴포
                props.itemDelete();
              }
            ).catch(err => console.log(err));

      }
  }
  
    return (
        <tr>
          <td>
            {props.totalCnt-props.obj.id+1}
          </td>
          <td>
            {props.obj.reply}{props.obj.title}
          </td>
          <td>
            {props.obj.writer}
          </td>
          <td>
          <Link to={"/board/view/"+props.obj.id} className="btn btn-primary">Edit</Link>
          </td>
          <td >
            <button  onClick={deleteItem} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
  

export default TableRow;