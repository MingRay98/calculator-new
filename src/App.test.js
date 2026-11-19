import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { expect, test } from 'vitest';
import App from './App';

test('calculator keeps arithmetic, clear, delete and decimal input working', () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  act(() => ReactDOM.render(<App />, container));
  const click = (label) => {
    const button = [...container.querySelectorAll('button')].find((item) => item.textContent.trim() === label);
    expect(button, 'button ' + label).toBeTruthy();
    act(() => button.dispatchEvent(new MouseEvent('click', { bubbles: true })));
  };
  const display = () => container.querySelector('.Display2').textContent.trim();
  const calculate = (...labels) => { click('C'); labels.forEach(click); click('='); };
  try {
    calculate('2', '+', '3');
    expect(display()).toBe('5');
    calculate('6', '*', '7');
    expect(display()).toBe('42');
    calculate('1', '.', '5', '*', '2');
    expect(display()).toBe('3');
    click('C');
    click('1'); click('2'); click('←');
    expect(container.querySelectorAll('.Display1')[1].textContent.trim()).toBe('1');
    click('C');
    expect(display()).toBe('0');
    calculate('8', '/', '2'); click('☰'); expect(container.querySelector('#history').textContent).toContain('8/2 = 4');
  } finally {
    act(() => ReactDOM.unmountComponentAtNode(container));
    container.remove();
  }
});
