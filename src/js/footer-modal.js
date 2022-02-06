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

import text from '../partials/dictionary.json';
import { locale } from './localization';

const team = [
  {
    nameDev: text[locale.lang].stanislav,
    surnameDev: text[locale.lang].fedets,
    photo: `${stanislavUrl}`,
    roleDev: 'Team-lead',
    gitDev: 'https://github.com/bifacial2',
  },

  {
    nameDev: text[locale.lang].andrii,
    surnameDev: text[locale.lang].mohylnytskyi,
    photo: `${andriiUrl}`,
    roleDev: 'Scrum-master',
    gitDev: 'https://github.com/FossaX7',
  },

  {
    nameDev: text[locale.lang].anastasia,
    surnameDev: text[locale.lang].les,
    photo: `${anastasiaUrl}`,
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/AnastasiaLes',
  },

  {
    nameDev: text[locale.lang].alexander,
    surnameDev: text[locale.lang].dmitriev,
    photo: `${alexandrUrl}`,
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/AlexanderDmitriev',
  },

  {
    nameDev: text[locale.lang].andrii,
    surnameDev: text[locale.lang].zhylchuk,
    photo: `${andrii2Url}`,
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/AndriyITua',
  },

  {
    nameDev: text[locale.lang].iryna,
    surnameDev: text[locale.lang].skopetska,
    photo: `${irynaUrl}`,
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/Irishka27',
  },

  {
    nameDev: text[locale.lang].eduard,
    surnameDev: text[locale.lang].bolma,
    photo: `${eduardUrl}`,
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/edbx',
  },

  {
    nameDev: text[locale.lang].serhii,
    surnameDev: text[locale.lang].khomaziuk,
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
