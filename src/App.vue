<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  /* http://meyerweb.com/eric/tools/css/reset/
  v2.0 | 20110126
  License: none (public domain)
*/
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  * {
    box-sizing: border-box;
  }

  body {
    color: #4C4C4C;
    background: #EFEFF4;
    font-size: 0.65rem;
    font-family: "Microsoft YaHei", Roboto, Lato, sans-serif, "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei UI", "WenQuanYi Micro Hei", sans-serif;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing :1px;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  input {
    outline: none;
  }

  span {
    display: inline-block;
  }

  img {
    width: 100%;
    height: 100%;
    vertical-align: bottom;
  }

  .lm-text-text {
    color: #212121 !important;
  }

  .lm-text-second {
    color: #757575 !important;
  }

  .lm-text-red {
    color: #E64E42 !important;
  }

  .lm-font-default {
    font-size: 1rem;
  }

  .lm-font-second {
    font-size: 0.875rem;
  }

  .lm-font-sm {
    font-size: 0.75rem;
  }

  .lm-font-head {
    font-size: 1.5rem;
  }

  .lm-margin-t {
    margin-top: 1rem;
  }
</style>
