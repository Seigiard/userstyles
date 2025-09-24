// ==UserScript==
// @name        Kino.pub
// @namespace   Violentmonkey Scripts
// @grant       none
// @version     0.0.3
// @match       https://kino.pub/item/view/*
// @updateURL   https://raw.githubusercontent.com/Seigiard/userstyles/refs/heads/main/Kino.pub.user.js
// ==/UserScript==
(() => {
  const container = document.querySelector('#view h3');
  const stage = document.getElementsByClassName('owl-stage')[0];
  const selectId = 'custom-serie-selector'

  const isSerial = !!stage

  function createPlaylistSelect({ container, stage }) {
    const prevLinks = document.querySelectorAll('.iina')
    prevLinks.forEach(link => {
        link.remove(); // Removes the element from the DOM
    });


    if (isSerial) {
      window.playlist.forEach((item, i) => {
        const el = document.querySelector(`#media-${item.id} .media-holder`)
        const link = getIinaLink(item.file, '▶️')
        el.append(link)
      })

      const lastWatchedEpisode = Array.from(document.querySelectorAll('.owl-stage .owl-item:has(a.darken)')).pop();
      lastWatchedEpisode.parentElement.scrollTo({
        left: lastWatchedEpisode.offsetLeft,
      })
    } else {
      // Добавляем опции из плейлиста
      window.playlist.forEach((item, i) => {
        const link = getIinaLink(item.file, '▶️')
        container.appendChild(link);
      })
    }
  }

  function getIinaLink(baseURL, title = '') {
    var link = document.createElement("a");
    link.href = `iina://open?url=${baseURL}&title=`;
    link.textContent = title;
    link.classList.add('iina')
    return link
  }

  function openIINA(baseURL) {
    var link = getIinaLink(baseURL)
    document.body.appendChild(link, '');
    link.click();
    link.remove();
  }

  function handleChanges() { createPlaylistSelect({ container, stage }); }

  function handleTheaterMode() {
    var button = document.createElement("button");
    button.textContent = '🎞️';
    button.addEventListener('click', () => {
      if (document.body.hasAttribute('data-theater')) {
        document.body.removeAttribute('data-theater')
      } else {
        document.body.setAttribute('data-theater', true)
      }
    })
    container.appendChild(button);
  }

  window.addEventListener('load', handleTheaterMode)
  window.addEventListener('load', handleChanges)
})()
