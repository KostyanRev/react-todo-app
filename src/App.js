import React from 'react';
import List from './components/List/List';
import listSvg from './assests/img/list.svg';
import AddList from './components/AddList/AddList';

import DB from './assests/db.json';

import './index.scss';

function App() {
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
          items={[
            {
              color: 'green',
              name: 'Покупки',
            },
            {
              color: 'blue',
              name: 'Фронтенд',
              active: true,
            },
            {
              color: 'pink',
              name: 'Фильмы и сериалы',
            },
          ]}
          isRemovable
        />
        <AddList colors={DB.colors} />
      </div>
      <div className="todo__tasks"></div>
    </div>
  );
}

export default App;
