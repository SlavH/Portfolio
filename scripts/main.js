// Animations
AOS.init({
  anchorPlacement: 'top-left',
  duration: 1000
});

// Lord Icon Hover
const icons = document.querySelectorAll('lord-icon')

for (const icon of icons) {
  const mainColor = icon.getAttribute('colors')
  icon.addEventListener('mouseover', () => {
    icon.setAttribute('colors', icon.dataset.hoverColor)
  })
  icon.addEventListener('mouseout', () => {
    icon.setAttribute('colors', mainColor)
  })
}



document.getElementById('age').innerText = new Date().getFullYear() - 2005