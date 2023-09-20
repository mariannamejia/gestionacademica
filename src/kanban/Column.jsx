import React from "react";
import styled from "styled-components";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  background-color: white;
  border-radius: 2.5px;
  width: 300px;
  height: 475px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border: 1px solid gray;
`;

const Title = styled.h3`
  padding: 8px;
  background-color: pink;
  text-align: center;
`;

const TaskList = styled.div`
  padding: 3px;
  transition: background-color 0.2s ease;
  background-color: #f4f5f7;
  flex-grow: 1;
  min-height: 100px;
`;


export default function Column({ title, tasks, markAsCompleted, deleteCompleted }) {
  
  return (
    <Container className="column">
      <Title
        style={{
          backgroundColor: "#7A9D96",
        }} 
      >
        {title}
      </Title>
    <div className="Column">
      <div className="TaskList">
        {tasks.map((task) => (
          <Task
          key={task._id}
          task={task}
          markAsCompleted={markAsCompleted}
          deleteCompleted={deleteCompleted}
        />
        ))}
      </div>
    </div>
    </Container>
  );
} 