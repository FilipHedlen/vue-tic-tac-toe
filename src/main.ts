import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Player from './components/Player.vue';
import Gameboard from './components/Gameboard.vue';
import Boardsquare from './components/Boardsquare.vue';

const app = createApp(App);
app.component('Player', Player);
app.component('Gameboard', Gameboard);
app.component('Boardsquare', Boardsquare);

app.mount('#app');
