const darkThemeBtn = document.querySelector('.menu__link-theme-btn');

console.log(darkThemeBtn);
darkThemeBtn.addEventListener('click', onDarkThemeBtnCkick);

const currentTheme = localStorage.getItem('dark-mode');

darkThemeCheck();

function onDarkThemeBtnCkick() {
  document.body.classList.toggle('dark-theme');
  if (localStorage.getItem('dark-mode') === 'true') {
    localStorage.setItem('dark-mode', 'false');
  } else {
    localStorage.setItem('dark-mode', 'true');
  }
}

function darkThemeCheck() {
  if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark-theme');
  }
}
