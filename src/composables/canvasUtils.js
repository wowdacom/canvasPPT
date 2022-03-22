import { ref } from 'vue';

const theCanvas = ref(null);
const context = ref(null);
const pawList = ref([]);
export const page = ref(2);

export const canvasInit = (domName) => {
  theCanvas.value = document.getElementById(domName);
  context.value = theCanvas.value.getContext('2d');
};

// 還沒用到旋轉
// const deg = (2 * Math.PI) / 360;

export const drawScreen = () => {
  if (context.value) {
    let counter = 0;

    let timeId = setInterval(() => {
      if (counter < 14) {
        let deviation =
          counter % 2 === 0
            ? 15 + ((Math.random() * 100) % 7)
            : (15 + ((Math.random() * 100) % 7)) * -1;
        // context.value.clearRect(0, 0, 500, 500);
        // context.value.save();
        drawCoordinate();
        drawPaw(-5 + counter * 45, 250 + deviation, 10);
        let pawInfo = { x: -5 + counter * 45, y: 250 + deviation, size: 10 };
        pawList.value.push(pawInfo);
        // context.value.restore();
        counter++;
      } else {
        clearInterval(timeId);
        page.value = 1;
      }
    }, 100);
  }
};

const drawPaw = (x, y, size) => {
  context.value.beginPath();
  context.value.arc(x, y, size, 0, 2 * Math.PI);
  context.value.fillStyle = 'white';
  context.value.fill();
  context.value.closePath();
  context.value.beginPath();
  context.value.arc(x + 5, y - 15, size / 3, 0, 2 * Math.PI);
  context.value.fillStyle = 'white';
  context.value.fill();
  context.value.closePath();
  context.value.beginPath();
  context.value.arc(x + 15, y - 10, size / 3, 0, 2 * Math.PI);
  context.value.fillStyle = 'white';
  context.value.fill();
  context.value.closePath();
  context.value.beginPath();
  context.value.arc(x + 18, y, size / 3, 0, 2 * Math.PI);
  context.value.fillStyle = 'white';
  context.value.fill();
  context.value.closePath();
  context.value.beginPath();
  context.value.arc(x + 13, y + 10, size / 3, 0, 2 * Math.PI);
  context.value.fillStyle = 'white';
  context.value.fill();
  context.value.closePath();
};

const drawCoordinate = () => {
  context.value.beginPath();
  context.value.moveTo(250, 0);
  context.value.lineTo(250, 500);
  context.value.stroke();
  context.value.moveTo(0, 250);
  context.value.lineTo(500, 250);
  context.value.stroke();
  context.value.closePath();
};

export const drawFlashTitle = (msg) => {
  console.log(msg);
  if (context.value) {
    let counter = 0;
    let timeId = setInterval(() => {
      if (counter < 100) {
        context.value.clearRect(0, 0, 500, 500);
        context.value.save();
        drawCoordinate();
        pawList.value.forEach((element) => {
          drawPaw(element.x, element.y, element.size);
        });
        drawTitle(250, 250, 60, msg, counter);
        context.value.restore();
        counter++;
      } else {
        clearInterval(timeId);
        page.value = 2;
      }
    }, 500);
  }
};

const drawTitle = (x, y, textSize, textContent = 'not find', counter) => {
  context.value.fillStyle = `rgba(255, 189, 51, ${counter % 2})`;
  context.value.font = `${textSize}px Arial`;
  const centerAjustX = context.value.measureText(textContent).width / 2;

  //   let textW = context.value.measureText(textContent).width;
  context.value.translate(x - centerAjustX, y);
  context.value.rotate(
    (Math.PI / 180) * 5 * (((counter - 1) / 2) % 2 === 0 ? 1 : -1)
  );
  context.value.translate(-(x - centerAjustX), -y);

  context.value.fillText(textContent, x - centerAjustX, y);
};

export const drawScreen2 = () => {
  var speed = 5;
  var p1 = { x: 485, y: 15 };
  var p2 = { x: 50, y: 450 };
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  var moves = distance / speed;
  var xunits = (p2.x - p1.x) / moves;
  var yunits = (p2.y - p1.y) / moves;
  var ball = { x: p1.x, y: p1.y };

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (moves > 0) {
      moves--;
      ball.x += xunits;
      ball.y += yunits;
      context.value.clearRect(0, 0, 500, 500);
      context.value.save();
      drawBall(ball.x, ball.y);
      context.value.restore();

      window.requestAnimationFrame(step);
    }
  }
};

const drawBall = (x, y) => {
  context.value.fillStyle = '#000000';
  context.value.beginPath();
  context.value.arc(x, y, 15, 0, Math.PI * 2, true);
  context.value.closePath();
  context.value.fill();
};
