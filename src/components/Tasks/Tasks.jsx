import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import editSvg from '../../assets/img/edit.svg';
import AddTaskForm from './AddTaskForm';
import Task from './Task';

import './Tasks.scss';

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  onRemoveTask,
  onEditTask,
  onCompleteTask,
  completed,
  withoutEmpty,
}) => {
  const editTitle = () => {
    const newTitle = prompt('List name', list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch('http://localhost:3001/lists/' + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert('Failed to update list name');
        });
    }
  };

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="tasks__title">
          {list.name}
          <img onClick={editTitle} src={editSvg} alt="Edit title" />
        </h2>
      </Link>
      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>There are no tasks</h2>
        )}
        {list.tasks &&
          list.tasks.map((task) => (
            <Task
              {...task}
              key={task.id}
              list={list}
              onRemove={onRemoveTask}
              onEdit={onEditTask}
              onCompelete={onCompleteTask}
            />
          ))}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
