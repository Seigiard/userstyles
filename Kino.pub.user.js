// ==UserScript==
// @name        Kino.pub
// @namespace   Violentmonkey Scripts
// @grant       none
// @version     0.0.1
// @match       https://kino.pub/item/view/*
// @updateURL   https://raw.githubusercontent.com/Seigiard/userstyles/refs/heads/main/Kino.pub.user.js
// ==/UserScript==
(() => {
  const container = document.querySelector('#view h3');
  const stage = document.getElementsByClassName('owl-stage')[0];
  const selectId = 'custom-serie-selector'

  const isSerial = !!stage

  function createPlaylistSelect({ container, stage }) {
    const prevSelect = document.getElementById(selectId)
    if (prevSelect) {
      prevSelect.remove()
    }

    const select = document.createElement('select');
    select.id = selectId

    // Добавляем placeholder опцию
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = 'Выберите файл';
    select.appendChild(defaultOpt);

    if (isSerial) {
      window.playlist.forEach((item, i) => {
        const el = document.querySelector(`#media-${item.id} .media-holder`)
        const link = getIinaLink(item.file, '▶️')
        el.append(link)
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
  window.addEventListener('load', handleChanges)
})()
