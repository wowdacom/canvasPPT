import { ref } from 'vue';

const theCanvas = ref(null);
const context = ref(null);
export const page = ref(0);

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

        drawCoordinate();
        drawPaw(-5 + counter * 45, 250 + deviation, 10);
        counter++;
      } else {
        clearInterval(timeId);
        page.value = 1;
      }
    }, 100);
  }
};

const drawPaw = (x, y, size) => {
  context.value.clearRect(0, 0, 500, 500);
  context.value.save();
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
  context.value.restore();
};

const drawCoordinate = () => {
  context.value.clearRect(0, 0, 500, 500);
  context.value.save();
  context.value.beginPath();
  context.value.moveTo(250, 0);
  context.value.lineTo(250, 500);
  context.value.stroke();
  context.value.moveTo(0, 250);
  context.value.lineTo(500, 250);
  context.value.stroke();
  context.value.closePath();
  context.value.restore();
};

export const drawFlashTitle = () => {
  if (context.value) {
    let counter = 0;
    let timeId = setInterval(() => {
      if (counter < 100) {
        drawTitle(250, 250, 40, 'Helloooo Canvas!!!', counter);
        counter++;
      } else {
        clearInterval(timeId);
        page.value = 2;
      }
    }, 500);
  }
};

const drawTitle = (x, y, textSize, textContent = 'not find', counter) => {
  context.value.clearRect(0, 0, 500, 500);
  context.value.save();
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
  context.value.restore();
};
