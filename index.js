function createCalendar(elem, year, month) {
    elem = document.querySelector(elem)
    
    let mon = month-1; // месяцы в JS идут от 0 до 11
    let d = new Date(year, mon);

    let table = `
    <table>
      <caption>${month}.${year}</caption>
      <tr>
        <th>пн</th>
        <th>вт</th>
        <th>ср</th>
        <th>чт</th>
        <th>пт</th>
        <th>сб</th>
        <th>вс</th>
      </tr>
      <tr>`;

    // пробелы для первого ряда
    // с понедельника до первого дня месяца
    // * * * 1  2  3  4
    for (let i = 0; i < getDay(d); i++) {
      table += '<td></td>';
    }

    // <td> ячейки календаря с датами
    while (d.getMonth() == mon) {
      table += '<td>' + d.getDate() + '</td>';

      if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
        table += '</tr><tr>';
      }

      d.setDate(d.getDate() + 1);
    }

    // добить таблицу пустыми ячейками, если нужно
    // 29 30 31 * * * *
    if (getDay(d) != 0) {
      for (let i = getDay(d); i < 7; i++) {
        table += '<td></td>';
      }
    }

    // закрыть таблицу
    table += '</tr></table>';

    elem.insertAdjacentHTML('afterbegin', table);
  }

  function getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
    let day = date.getDay();
    if (day == 0) day = 7; // сделать воскресенье (0) последним днем
    return day - 1;
  }

  for(let i=12; i>0; i--) {
    createCalendar('.container', 2024, i)
  }



  // slider animation
  const slider = document.querySelector('.container');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  const slides = Array.from(slider.querySelectorAll('table'));
  const slideCount = slides.length;
  let slideIndex = 0;

// Устанавливаем обработчики событий для кнопок
prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

// Функция для показа предыдущего слайда
function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

// Функция для показа следующего слайда
function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

// Функция для обновления отображения слайдера
function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

// Инициализация слайдера
updateSlider();