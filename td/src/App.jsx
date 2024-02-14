import React, { useState } from 'react';
import './style/App.sass';
import './style/vendor/vendor.sass';
import checkmark from '../public/checkmark.svg';

function App() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: 'Bratishkinoff',
      items: [
        { id: 1, title: 'Start follow chanel', subtitle: 'Its time to start watching this streamer!' },
        { id: 3, title: 'Stop follow', subtitle: 'Trash!!' },
      ],
    },
    {
      id: 2,
      title: 'Download',
      items: [
        { id: 4, title: 'Visual Studio Code' },
        { id: 5, title: 'Vim' },
      ],
    },
    {
      id: 3,
      title: 'Проверить',
      items: [
        { id: 6, title: 'Test title' },
        {
          id: 7,
          title: 'Ponasenkov',
          subtitle: '<a href="https://youtu.be/dQw4w9WgXcQ?si=xGUVMZdNOBabGwPs">Link</a> on my page',
        },
      ],
    },
  ]);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);

  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.className == 'task') {
      e.target.classList.add('task__shadow');
    }
  }

  function dragLeaveHandler(e) {
    e.target.classList.remove('task__shadow');
  }

  function dragStartHandler(e, board, task) {
    setCurrentBoard(board);
    setCurrentTask(task);
  }

  function dropHandler(e, board, task) {
    e.preventDefault();
    e.target.classList.remove('task__shadow');

    const currentIndex = currentBoard.items.indexOf(currentTask);
    currentBoard.items.splice(currentIndex, 1);

    const dropIndex = board.items.indexOf(task);
    board.items.splice(dropIndex + 1, 0, currentTask);

    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  }

  return (
    <div className="app">
      {boards.map((board) => (
        <div className="board" key={board.id}>
          <h1 className="board__title">{board.title}</h1>
          <ul className="board__tasks">
            {board.items.map((task) => (
              <li
                onFocus={(e) => e.stopPropagation()}
                className="task"
                key={task.id}
                draggable={true}
                onDragOver={(e) => dragOverHandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, task)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDrop={(e) => dropHandler(e, board, task)}>
                <label className="task__label">
                  <input type="checkbox" name="" className="task__checkbox" />
                  <img src={checkmark} alt="Checkmark" className="task__checkmark" />
                </label>
                <div className="task__container">
                  <h2 className="task__title">{task.title}</h2>
                  <p className="task__subtitle" dangerouslySetInnerHTML={{ __html: task.subtitle }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
