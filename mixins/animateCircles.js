export default {
  methods: {
    animateCircles (container, animationDelay = 500, animationDuration = 1500) {
      container.forEach((node, index) => {
        node.style.animationDelay = ((((container.length - 1) - index) * animationDelay) / 1000) + 's'
        node.style.animationDuration = (animationDuration / 1000) + 's'

        if (index === 0) {
          node.classList.add('circles-animation-1')
        } else {
          node.classList.add('circles-animation-2')
        }
        node.addEventListener('animationend', handleAnimationEnd)

        function handleAnimationEnd () {
          node.classList.remove('circles-animation-1', 'circles-animation-2')
          node.removeEventListener('animationend', handleAnimationEnd)
        }
      })
    }
  }
}
