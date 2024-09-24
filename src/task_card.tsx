import React, { useEffect } from 'react'
import './App.css'
import highPriority from './assets/high-priority-svgrepo-com.svg'
import mediumPriority from './assets/medium-priority-svgrepo-com.svg'
import lowPriority from './assets/low-priority-svgrepo-com.svg'
import CustomizedSwitches from './done_switch'

function returnPriorityIcon(importance: number) {
  switch (importance) {
    case 1:
      return highPriority
    case 2:
      return mediumPriority
    case 3:
      return lowPriority
    default:
      return lowPriority
  }
}

interface Task {
  id: number;
  title: string;
  description: string;
  importance: number;
  due_date: string;
  created_at: string;
  is_done: boolean;
}

export default function TaskCards() {
  const [tasks, setTasks] = React.useState<Task[]>([])

  useEffect(() => {

    fetch('http://localhost/app/get_tasks.php')
      .then(response => response.json())
      .then(data => {
        setTasks(data)
      })
      .catch(error => console.error(error))
  },[])

  return (
    <>
      {tasks.map((task) => (
        <div className="todo_card" key={task.id}>
          <h2>{task.title}</h2>
          <hr className='hr_card' />
          <p>{task.description}</p>
          <img className='priority_pic' src={returnPriorityIcon(task.importance)} alt="Priority icon" />
          <p>{task.due_date}</p>
          <small>{task.created_at}</small>
          <CustomizedSwitches />
          <code>{task.is_done}</code>
        </div>
      ))}
    </>
  );
}
