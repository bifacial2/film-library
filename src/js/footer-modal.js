import * as basicLightbox from 'basiclightbox';

import stanislavUrl from '../images/our_team/photo_stas2.jpg';
import anastasiaUrl from '../images/our_team/photo_anastasia1.jpg';
import andriiUrl from '../images/our_team/photo_andrii.jpg';
import irynaUrl from '../images/our_team/photo_irina2.jpg';
import alexandrUrl from '../images/our_team/photo_alex2.jpg';
import eduardUrl from '../images/our_team/photo_eduard1.jpg';
import serhiiUrl from '../images/our_team/photo_serhii1.jpg';
import andrii2Url from '../images/our_team/photo_andrii1.jpg';

import imageUrl from '../images/sprite.svg';
import closeUrl from '../images/sprite.svg';

const team = [
  {
    nameDev: 'Stanislav',
    surnameDev: 'Fedets',
    photo: `${stanislavUrl}`,
    roleDev: 'Team-lead',
    gitDev: 'https://github.com/bifacial2',
  },

  {
    nameDev: 'Andrii',
    surnameDev: 'Mohylnytskyi',
    photo: `${andriiUrl}`,
    roleDev: 'Scrum-master',
    gitDev: 'https://github.com/FossaX7',
  },

  {
    nameDev: 'Anastasia',
    surnameDev: 'Les',
    photo: `${anastasiaUrl}`,
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/AnastasiaLes',
  },

  {
    nameDev: 'Alexandr',
    surnameDev: 'Dmitriev',
    photo: `${alexandrUrl}`,
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/AlexanderDmitriev',
  },

  {
    nameDev: 'Andriy',
    surnameDev: 'Zhylchuk',
    photo: `${andrii2Url}`,
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/AndriyITua',
  },

  {
    nameDev: 'Iryna',
    surnameDev: 'Skopetska',
    photo: `${irynaUrl}`,
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/Irishka27',
  },

  {
    nameDev: 'Eduard',
    surnameDev: 'Bolma',
    photo: `${eduardUrl}`,
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/edbx',
  },

  {
    nameDev: 'Serhii',
    surnameDev: 'Khomaziuk',
    photo: `${serhiiUrl}`,
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/sergiihsv',
  },
];

const markupTeamCard = team
  .map(({ surnameDev, nameDev, photo, roleDev, gitDev }) => {
    return `
<li class="team-member">
<div class="thumb">
<img src="${photo}" alt="${nameDev}" class="member-image">
</div>

    
    <p class="member-name"">${surnameDev}<br>${nameDev}</p>
    <p class="member-position">${roleDev}</p>
    <a href="${gitDev}" target="_blank" class="member-git"><svg class="git-icon" width="26" height="26">
    <use href="${imageUrl}#icon-github"></use>
    </svg></a>
</li>`;
  })
  .join('');

const markupModal = `
<div class="basicLightbox__placeholder-modal">

<p class="team-title">OUR TEAM
 </p>
  <span class="our-logo"></span>
  <button type='button' class='modal-window__close-btn' data-modal-close>
    <span class='modal-close-button'>

     <svg class="icon-close" width="13" height="13">
    <use href="${closeUrl}#icon-close"></use>
    </svg>

    
    </use></span>
  </button>
<ul class="our-team-list">
${markupTeamCard}
</ul>
</div>
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
