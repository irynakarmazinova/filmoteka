export const footerLink = document.getElementById('footer__link');

export default function clickOnFooterLink(e) {
  e.preventDefault();
  console.log('hi');
}
footerLink.addEventListener('click', clickOnFooterLink);
