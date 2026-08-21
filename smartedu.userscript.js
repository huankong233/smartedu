// ==UserScript==
// @name         教师研修网smartedu.cn自动点击确定
// @namespace    https://smartedu.cn/
// @version      2026.08.21
// @description  2026暑期教师研修自动答题点击确定（下一个），自动设置2倍速
// @author       huan_kong
// @match        *.smartedu.cn/jiaoshi/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=smartedu.cn
// @grant        none
// @license      MIT
// ==/UserScript==

;(async function () {
  'use strict'

  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  await sleep(10000)
  console.clear()
  console.log('教师研修网smartedu.cn自动点击确定脚本已启动')

  // 展开所有元素
  document
    .querySelectorAll('.fish-collapse-header')
    .forEach((item) => (item.ariaExpanded === 'false' ? item.click() : null))

  await sleep(5000)

  // 获取元素
  const resourceElements = document
    .querySelectorAll('.resource-item')
    .values()
    .toArray()
    .filter((item) => item.querySelector('i').title !== '已学完')
  let index = 0

  resourceElements[index].click()

  setInterval(() => {
    document
      .querySelectorAll('.fish-modal-confirm-btns')
      .forEach((button) => button.querySelector('button')?.click())

    const playbackRateElement = document.querySelector('.vjs-playback-rate')
    if (!playbackRateElement) return

    const playbackRateText = playbackRateElement.querySelector('.vjs-playback-rate-value')
    if (!playbackRateText || playbackRateText.innerText === '2x') return

    const firstLi = playbackRateElement.querySelector('.vjs-menu-item')
    if (firstLi) firstLi.click()

    const video = document.querySelector('video')
    if (!video) return

    if (video.paused) {
      video.play()
    }

    video.onpause = () => {
      video.play()
    }

    video.onended = () => {
      index++
      if (index < resourceElements.length) {
        resourceElements[index].click()
      } else {
        alert('已完成所有资源的学习')
      }
    }
  }, 3000)
})()
