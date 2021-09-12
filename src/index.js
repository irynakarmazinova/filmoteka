// import fetchMovie from './js/fetchApi';

// pnotify
import { defaultModules, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css'; //color theme for error
defaultModules.set(PNotifyMobile, {});

import './js/header';
import './js/fetchFilms';
import './js/database';
import './js/auth';
import './js/modalFilm';
import './js/fn';
import './js/dark-theme';

import './js/loadMoreBtn';
import './js/footer-modal-window';

import './js/modalAuth';
import './js/btn-Up';
