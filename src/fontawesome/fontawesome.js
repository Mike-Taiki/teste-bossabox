import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faSearch,
  faPlus,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
