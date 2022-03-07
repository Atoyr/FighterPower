import React from 'react';
import AppBar from 'components/AppBar';
import { useParams } from 'react-router-dom';


export default function GoalSheet() {
  let { id } = useParams<"id">();
  return (
  <div>
    <AppBar />
    Goal Sheet. ID : { id }.
  </div>
  );
}

