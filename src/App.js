import React, { useState, useEffect } from 'react';
import List from './components/List/List';
import listSvg from './assets/img/list.svg';
import AddList from './components/AddList/AddList';
import Tasks from './components/Tasks/Tasks';
import axios from 'axios';

import './index.scss';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);

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
    console.log(newList);
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[
            {
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
            isRemovable
          />
        ) : (
          'Loading...'
        )}
        <AddList onAdd={onAddList} colors={colors} />
      </div>
      <div className="todo__tasks">{lists && <Tasks list={lists[1]} />}</div>
    </div>
  );
}

export default App;
