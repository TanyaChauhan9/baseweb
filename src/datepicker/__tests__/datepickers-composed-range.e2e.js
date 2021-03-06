/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount} = require('../../../e2e/helpers');

const START_DATE_INPUT = '[id="start-date"] input';
const END_DATE_INPUT = '[id="end-date"] input';

const DISPLAY_START_DATE = '[id="display-start-date"]';
const DISPLAY_END_DATE = '[id="display-end-date"]';

const SET_UNDEFINED_BTN = '[id="set-undefined"]';

describe('datepicker-composed-range', () => {
  it('displaying start date can update value from text input with existing dates', async () => {
    await mount(page, 'datepickers-composed-range');
    await page.waitFor(START_DATE_INPUT);

    const before = await page.$eval(DISPLAY_START_DATE, e => e.textContent);
    expect(before).toBe('2019/4/1');

    await page.focus(START_DATE_INPUT);
    await page.keyboard.press('Backspace');
    await page.keyboard.press('2');

    const after = await page.$eval(DISPLAY_START_DATE, e => e.textContent);
    expect(after).toBe('2019/4/2');
  });

  it('displaying end date can update value from text input with existing dates', async () => {
    await mount(page, 'datepickers-composed-range');
    await page.waitFor(END_DATE_INPUT);

    const before = await page.$eval(DISPLAY_END_DATE, e => e.textContent);
    expect(before).toBe('2019/4/10');

    await page.focus(END_DATE_INPUT);
    await page.keyboard.press('Backspace');
    await page.keyboard.press('1');

    const after = await page.$eval(DISPLAY_END_DATE, e => e.textContent);
    expect(after).toBe('2019/4/11');
  });

  it('displaying start date can update value from text input with undefined dates', async () => {
    await mount(page, 'datepickers-composed-range');
    await page.waitFor(START_DATE_INPUT);

    await page.click(SET_UNDEFINED_BTN);

    const before = await page.$eval(DISPLAY_START_DATE, e => e.textContent);
    expect(before).toBe('undefined');

    await page.focus(START_DATE_INPUT);
    await page.keyboard.type('20201010');

    const after = await page.$eval(DISPLAY_START_DATE, e => e.textContent);
    expect(after).toBe('2020/10/10');
  });

  it('displaying end date can update value from text input with undefined dates', async () => {
    await mount(page, 'datepickers-composed-range');
    await page.waitFor(END_DATE_INPUT);

    await page.click(SET_UNDEFINED_BTN);

    const before = await page.$eval(DISPLAY_END_DATE, e => e.textContent);
    expect(before).toBe('undefined');

    await page.focus(END_DATE_INPUT);
    await page.keyboard.type('20201010');

    const start = await page.$eval(DISPLAY_START_DATE, e => e.textContent);
    const end = await page.$eval(DISPLAY_END_DATE, e => e.textContent);
    expect(start).toBe('2020/10/10');
    expect(end).toBe('2020/10/10');
  });

  it('displaying start date does not update if selection is after end date', async () => {
    await mount(page, 'datepickers-composed-range');
    await page.waitFor(START_DATE_INPUT);

    const before = await page.$eval(DISPLAY_START_DATE, e => e.textContent);
    expect(before).toBe('2019/4/1');

    await page.focus(START_DATE_INPUT);
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('1');
    await page.keyboard.press('2');

    const after = await page.$eval(DISPLAY_START_DATE, e => e.textContent);
    expect(after).toBe('2019/4/1');
  });

  it('displaying end date does not update if selection is before start date', async () => {
    await mount(page, 'datepickers-composed-range');
    await page.waitFor(END_DATE_INPUT);

    const before = await page.$eval(DISPLAY_END_DATE, e => e.textContent);
    expect(before).toBe('2019/4/10');

    await page.focus(END_DATE_INPUT);
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('3');
    await page.keyboard.press('1');
    await page.keyboard.press('2');

    const after = await page.$eval(DISPLAY_END_DATE, e => e.textContent);
    expect(after).toBe('2019/4/10');
  });
});
