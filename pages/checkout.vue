<template>
  <div class="check_block">
    <Checkout/>
    <svg
      class="circles--monitors"
      width="949"
      height="1751"
      viewBox="0 0 949 1751"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g ref="circles-monitors" opacity="0.5">
        <circle
          opacity="0.3"
          cx="875.501"
          cy="875.5"
          r="639.5"
          transform="rotate(59.6991 875.501 875.5)"
          fill="url(#paint0_linear)"
          class="circle--1"
        />
        <ellipse
          opacity="0.2"
          cx="875.501"
          cy="875.499"
          rx="451.412"
          ry="451.412"
          transform="rotate(59.6991 875.501 875.499)"
          fill="url(#paint1_linear)"
          class="circle--2"
        />
        <ellipse
          opacity="0.2"
          cx="875.501"
          cy="875.5"
          rx="231.806"
          ry="231.806"
          transform="rotate(59.6991 875.501 875.5)"
          fill="url(#paint2_linear)"
          class="circle--3"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="347.837"
          y1="1254.73"
          x2="1332"
          y2="416.971"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#AA1A17" />
          <stop offset="1" stop-color="#AA1A17" stop-opacity="0.1" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="503.033"
          y1="1143.19"
          x2="1197.73"
          y2="551.832"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#AA1A17" />
          <stop offset="1" stop-color="#AA1A17" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="684.233"
          y1="1012.96"
          x2="1040.97"
          y2="709.293"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#AA1A17" />
          <stop offset="1" stop-color="#AA1A17" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<script>
export default {
  name: "checkout",
  layout: "dashboard",
}
</script>

<style scoped>
.check_block{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 4vh 5vw 15vh;
  position: relative;
  z-index: 100;
  /*height: 85vh;*/
}
.circles--monitors {
  position: absolute;
  right: -700px;
  top: 190px;
  z-index: 1;
  width: 200%;
  height: 200%;
  display: none;
}
</style>
