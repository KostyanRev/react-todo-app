import React, { useState } from 'react';
import List from './components/List/List';
import listSvg from './assests/img/list.svg';
import AddList from './components/AddList/AddList';
import Tasks from './components/Tasks/Tasks';

import DB from './assests/db.json';

import './index.scss';

function App() {
  const [lists, setLists] = useState(
    DB.lists.map((item) => {
      item.color = DB.colors.filter(
        (color) => color.id === item.colorId
      )[0].name;
      return item;
    })
  );

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
              active: false,
            },
          ]}
        />
        <List
          onRemove={(item) => {
            console.log(item);
          }}
          items={lists}
          isRemovable
        />
        <AddList onAdd={onAddList} colors={DB.colors} />
      </div>
      <div className="todo__tasks">
        <Tasks />
      </div>
    </div>
  );
}

export default App;
