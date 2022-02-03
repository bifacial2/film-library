import * as basicLightbox from 'basiclightbox';

/* import stanislavUrl from '../images/photo_stasReSize.jpg'; */
import anastasiaUrl from '../images/photo_2022-01-31_23-47-53.jpg';
/* import andriiUrl from '../images/photo_andriiResize.jpg';
import irynaUrl from '../images/photo_irinaResize.jpg'; */
/* import alexandrUrl from '../images/photo_2022-01-31_23-47-53.jpg';
import eduardUrl from '../images/photo_2022-01-31_23-47-53.jpg';
import serhiiUrl from '../images/photo_2022-01-31_23-47-53.jpg';
import stanislavUrl from '../images/photo_2022-01-31_23-47-53.jpg';
 */
import imageUrl from '../images/github-icon.svg';

const team = [
  {
    nameDev: 'Stanislav',
    surnameDev: 'Fedets',
    photo: `${anastasiaUrl}`,
    roleDev: 'Team-lead',
    gitDev: 'https://github.com/bifacial2',
  },

  {
    nameDev: 'Andrii',
    surnameDev: 'Mohylnytskyi',
    photo: `${anastasiaUrl}`,
    roleDev: 'Scrum-master',
    gitDev: 'https://github.com/',
  },

  {
    nameDev: 'Anastasia',
    surnameDev: 'Les',
    photo: `${anastasiaUrl}`,
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/',
  },

  {
    nameDev: 'Alexandr',
    surnameDev: 'Dmitriev',
    photo: `${anastasiaUrl}`,
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/',
  },

  {
    nameDev: 'Andriy',
    surnameDev: 'Zhylchuk',
    photo: `${anastasiaUrl}`,
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/',
  },

  {
    nameDev: 'Iryna',
    surnameDev: 'Skopetska',
    photo: `${anastasiaUrl}`,
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/',
  },

  {
    nameDev: 'Eduard',
    surnameDev: 'Bolma',
    photo: `${anastasiaUrl}`,
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/',
  },

  {
    nameDev: 'Serhii',
    surnameDev: 'Khomaziuk',
    photo: `${anastasiaUrl}`,
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/sergiihsv',
  },
];

const markupTeamCard = team
  .map(({ surnameDev, nameDev, photo, roleDev, gitDev }) => {
    return `
<li class="team-member">
    <img src="${photo}" alt="${nameDev}" class="member-image">
    <p class="member-name"">${surnameDev}<br>${nameDev}</p>
    <p class="member-position">${roleDev}</p>
    <a href="${gitDev}" target="_blank" class="member-git"><svg class="git-icon" width="24" height="24">
    <use href="${imageUrl}#icon-github"></use>
    </svg></a>
</li>`;
  })
  .join('');

const markupModal = `<p class="team-title">OUR TEAM
 </p>
  <span class="our-logo"></span>
  <button type='button' class='modal-window__close-btn' data-modal-close>
    <span class='modal-close-button'>close</span>
  </button>
<ul class="our-team-list">
${markupTeamCard}
</ul>
</div>`;

const container = document.querySelector('.our-team');

container.addEventListener('click', openModal);

const modal = basicLightbox.create(markupModal);

function openModal(e) {
  e.preventDefault();
  modal.show();
  const body = document.querySelector('body');
  body.classList.add('bg-scrolling-element-when-modal-open');
  const closeModalBtn = document.querySelector('[data-modal-close]');
  closeModalBtn.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModalHandler);
  const backdrop = document.querySelector('.basicLightbox');
  backdrop.addEventListener('click', closeBackdrop);

  function closeModal(e) {
    modal.close();
    body.classList.remove('bg-scrolling-element-when-modal-open');
    closeModalBtn.removeEventListener('click', closeModal);
  }

  function closeModalHandler(e) {
    if (e.key === 'Escape') {
      modal.close();
      body.classList.remove('bg-scrolling-element-when-modal-open');
      window.removeEventListener('keydown', closeModalHandler);
    }
  }

  function closeBackdrop(e) {
    if (e.target === backdrop) {
      modal.close();
      body.classList.remove('bg-scrolling-element-when-modal-open');
      backdrop.removeEventListener('click', closeBackdrop);
    }
  }
}
