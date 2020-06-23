import React, { Component, useState } from "react";
import ReactDOM from "react-dom";

function Box(){
  let [newList,setNewList] = useState([])
  let [state1,setState1]=useState({
    allChecked: false,
      list: [
        { id: 1, name: "item1", isChecked: false },
        { id: 2, name: "item2", isChecked: false },
        { id: 3, name: "item3", isChecked: false }
      ]
    })
     
  

 const handleChange = e => {
    let itemName = e.target.name;
    let checked = e.target.checked;
    setState1(prevState => {
      let { list, allChecked } = prevState;
      if (itemName === "checkAll") {
        allChecked = checked;
        list = list.map(item => ({ ...item, isChecked: checked }));
      } else {
        list = list.map(item =>
          item.name === itemName ? { ...item, isChecked: checked } : item
          
        );
        allChecked = list.every(item => item.isChecked);
      }
      return { list, allChecked };
    });
  };

    return (
      <div>
        <input
          type="checkbox"
          name="checkAll"
          checked={state1.allChecked}
          onChange={handleChange}
        />
        Check all
        <br />
        { state1.list.map(item => (
          <div>
            <input
              key={item.id}
              type="checkbox"
              name={item.name}
              value={item.name}
              checked={item.isChecked}
              onChange={handleChange}
            />
            <label>{item.name}</label>
          </div>
        ))
      }
      {
      state1.allChecked=== true?
        <button>'Export1'</button>
        :''
    }
   {
     state1.list.map((l)=>{
       /*eslint-disable*/
      l.isChecked?
      console.log(l)
      :''
     })     
    }
      </div>
    );
  }

ReactDOM.render(<Box />, document.getElementById("root"));
