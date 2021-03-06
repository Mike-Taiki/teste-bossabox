import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faSearch,
  faPlus,
  faTimes,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
