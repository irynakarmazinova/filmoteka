const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.btn'),
  container: document.getElementById('js-container'),

  logo: document.getElementById('logo'),
  homeBtn: document.querySelector('.menu__link'),
  myLibraryBtn: document.getElementById('my-library'),
  header: document.querySelector('.header'),
  watchedBtn: document.querySelector('.watched-btn-js'),
  queuedBtn: document.querySelector('.queue-btn-js'),
  btnContainerLibrary: document.querySelector('.btn-container__library'),
  registrationForm: document.getElementById('registration-form-js'),
  signInForm: document.getElementById('signin-form-js'),
  signOutBtn: document.querySelector('.signout-btn-js'),
     backdrop: document.querySelector('.backdrop'),
  modalCloseBtn: document.querySelector('.team__modal-close-btn'),
  modal: document.querySelector('.modal'),
  footerLink: document.getElementById('footer__link'),

};

export const { searchForm, gallery, loadBtn, container, registrationForm,
  signInForm, logo, homeBtn, myLibraryBtn, header, watchedBtn, queuedBtn, btnContainerLibrary, signOutBtn, backdrop, modalCloseBtn, footerLink} = refs;
