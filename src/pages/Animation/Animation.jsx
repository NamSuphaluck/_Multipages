import  { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Animation.css';

const fieldWidth = 700;
const fieldHeight = 400;
const diameter = 50;

const maxLeft = fieldWidth - diameter;
const maxTop = fieldHeight - diameter;
const vx = 5;
const vy = 5;

const Animation = () => {
  const [running, setRunning] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const goRight = useRef(true);
  const goDown = useRef(true);
  const intervalId = useRef(null);

  useEffect(() => {
    const field = document.getElementById('field');
    field.style.width = fieldWidth + 'px';
    field.style.height = fieldHeight + 'px';
    field.style.position = 'relative'; // ใช้ position relative สำหรับ field

    const ball = document.getElementById('ball');
    ball.style.width = diameter + 'px';
    ball.style.height = diameter + 'px';
    ball.style.position = 'absolute'; // ใช้ position absolute สำหรับ ball

    return () => clearInterval(intervalId.current);
  }, []);

  useEffect(() => {
    if (running) {
      intervalId.current = setInterval(() => {
        calculate();
        render();
      }, 25);
    } else {
      clearInterval(intervalId.current);
    }
  });

  const calculate = () => {
    setPosition((prev) => {
      let newX = prev.x;
      let newY = prev.y;

      if (goRight.current) {
        newX += vx;
        if (newX >= maxLeft) goRight.current = false;
      } else {
        newX -= vx;
        if (newX <= 0) goRight.current = true;
      }

      if (goDown.current) {
        newY += vy;
        if (newY >= maxTop) goDown.current = false;
      } else {
        newY -= vy;
        if (newY <= 0) goDown.current = true;
      }

      return { x: newX, y: newY };
    });
  };

  const render = () => {
    document.getElementById('ball').style.left = position.x + 'px';
    document.getElementById('ball').style.top = position.y + 'px';

    const btn = document.getElementById('run');
    if (running) {
      btn.classList.remove('btn-success');
      btn.classList.add('btn-danger');
      btn.innerHTML = '<span class="bi bi-pause">&nbsp;PAUSE</span>';
    } else {
      btn.innerHTML = '<span class="bi bi-play">&nbsp;RUN</span>';
      btn.classList.remove('btn-danger');
      btn.classList.add('btn-success');
    }
  };

  return (
    <div id="container">
      <div id="field">
        <div id="ball"></div>
      </div>

      <div id="control">
        <button id="run" className="btn btn-success" onClick={() => setRunning(!running)}>
          <span className="bi bi-play">&nbsp;RUN</span>
        </button>
        <button className="btn btn-secondary">None</button>
        <button className="btn btn-primary">Basketball</button>
        <button className="btn btn-football">FOOTBALL</button>
      </div>
    </div>
  );
};

export default Animation;
