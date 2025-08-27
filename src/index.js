import './styles.css';
import { homeScreen } from './home-screen';
import { processForm } from './tasks';

const form = document.querySelector('form');

form.addEventListener('submit', processForm)