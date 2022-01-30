import * as basicLightbox from 'basiclightbox';

const team = [
  {
    nameDev: 'Serhii',
    surnameDev: 'Serhii',
    /* photo: `${serhiiUrl}`, */
    roleDev: 'Team-lead',
    gitDev: 'https://github.com/',
  },

  {
    nameDev: 'Serhii',
    surnameDev: 'Serhii',
    /* photo: `${serhiiUrl}`, */
    roleDev: 'Scrum-master',
    gitDev: 'https://github.com/',
  },

  {
    nameDev: 'Serhii',
    surnameDev: 'Serhii',
    /* photo: `${serhiiUrl}`, */
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/',
  },

  {
    nameDev: 'Serhii',
    surnameDev: 'Serhii',
    /* photo: `${serhiiUrl}`, */
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/',
  },

  {
    nameDev: 'Serhii',
    surnameDev: 'Serhii',
    /* photo: `${serhiiUrl}`, */
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/',
  },

  {
    nameDev: 'Serhii',
    surnameDev: 'Serhii',
    /* photo: `${serhiiUrl}`, */
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/',
  },

  {
    nameDev: 'Serhii',
    surnameDev: 'Serhii',
    /* photo: `${serhiiUrl}`, */
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/',
  },

  {
    nameDev: 'Serhii',
    surnameDev: 'Serhii',
    /* photo: `${serhiiUrl}`, */
    roleDev: 'Front-end Developer',
    gitDev: 'https://github.com/',
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
    
    </svg></a>
</li>`;
  })
  .join('');

const markupModal = `<p class="team-title">IT squad</p>
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
