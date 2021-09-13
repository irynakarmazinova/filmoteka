import { darkThemeBtn, darkThemeIcon } from './refs';

darkThemeBtn.addEventListener('click', onDarkThemeBtnCkick);

const currentTheme = localStorage.getItem('dark-mode');

darkThemeCheck();

function onDarkThemeBtnCkick() {
  document.body.classList.toggle('dark-theme');
  if (localStorage.getItem('dark-mode') === 'true') {
    localStorage.setItem('dark-mode', 'false');
    darkThemeIcon.href.baseVal = '/sprite.5ec50489.svg#icon-sun';
  } else {
    localStorage.setItem('dark-mode', 'true');
    darkThemeIcon.href.baseVal = '/sprite.5ec50489.svg#icon-moon';
  }
}

function darkThemeCheck() {
  if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark-theme');
    darkThemeIcon.href.baseVal = '/sprite.5ec50489.svg#icon-moon';
  }
}
