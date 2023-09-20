import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";


const Container = styled.div`
border-radius: 10px;
padding: 8px;
min-height: 90px;
margin-left: 10px;
margin-right: 10px;
margin-top: 10px;
background-color:#DCAE1D;
cursor: pointer;
display: flex;
justify-content: space-between;
flex-direction: column;
`;

const TextContent = styled.div``;

const Icons = styled.div`
display: flex;
justify-content: end;
padding: 2px;
`;

function bgcolorChange(props) {
  return props.isDragging 
  ? "#DCAE1D" 
  : props.isDraggable 
  ? props.isBacklog 
    ? "#F2D7D5" 
    : "#DCDCDC"
  : props.isBacklog 
  ? "#F2D7D5" 
  : "#fffada";
}

export default function Task({ task, markAsCompleted, deleteCompleted }) {
  const handleTaskClick = () => {
    console.log("Task clicked:", task._id);
    markAsCompleted(task._id);
    /*if (task.title === "COMPLETADAS") {
      // Call the deletePendiente API to delete the task
      deleteCompleted(task._id);
    } else {
      // Update the task's tpEstado to '1' (completed) in the API
      markAsCompleted(task._id);
    }
    /*if (task.title === "POR HACER") {
      // Call the deletePendiente API to delete the task
      markAsCompleted(task._id);
    } else {
      // Update the task's tpEstado to '1' (completed) in the API
      
      deleteCompleted(task._id);
    }*/
  };
  return (

    <div className="Task" onClick={handleTaskClick}>
      <Container>
          <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
            <span>
              <small>
                #{task.nombre}
                {"  "}
              </small>
            </span>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", padding: 2 }}
          >
            <TextContent>{task.descripcion}</TextContent>
          </div>
          <Icons>
            <div>
            </div>
          </Icons>
          
      </Container>
      
    </div>
  );
} 