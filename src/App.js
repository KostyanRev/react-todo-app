import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import List from './components/List/List';
import listSvg from './assets/img/list.svg';
import AddList from './components/AddList/AddList';
import Tasks from './components/Tasks/Tasks';

import './index.scss';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({ data }) => {
        setLists(data);
      });
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };

  const onEditListTitle = (id, title) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };

  useEffect(() => {
    const listId = location.pathname.split('lists/')[1];
    if (lists) {
      const list = lists.find((list) => list.id === Number(listId));
      setActiveItem(list);
    }
  }, [lists, location.pathname]);

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          onClickItem={() => {
            navigate('/');
          }}
          items={[
            {
              active: true,
              icon: <img src={listSvg} alt="List icon" />,
              name: 'All tasks',
            },
          ]}
        />
        {lists ? (
          <List
            items={lists}
            onRemove={(id) => {
              const newList = lists.filter((item) => item.id !== id);
              setLists(newList);
            }}
            onClickItem={(list) => {
              navigate(`/lists/${list.id}`);
            }}
            activeItem={activeItem}
            isRemovable
          />
        ) : (
          'Loading...'
        )}
        <AddList onAdd={onAddList} colors={colors} />
      </div>
      <div className="todo__tasks">
        <Routes>
          <Route
            exact
            path="/"
            element={
              lists &&
              lists.map((list) => (
                <Tasks
                  key={list.id}
                  onAddTask={onAddTask}
                  onEditTitle={onEditListTitle}
                  list={list}
                  withoutEmpty
                />
              ))
            }
          />
          <Route
            path="/lists/:id"
            element={
              lists &&
              activeItem && (
                <Tasks
                  onAddTask={onAddTask}
                  onEditTitle={onEditListTitle}
                  list={activeItem}
                />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
