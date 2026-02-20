// Mobile menu
const menuToggle = document.querySelector('.menu-toggle')
const nav = document.querySelector('.nav')

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open')
    menuToggle.setAttribute('aria-expanded', open)
  })

  document.querySelectorAll('.nav a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open')
      menuToggle.setAttribute('aria-expanded', 'false')
    })
  })
}

// Footer year
const yearEl = document.getElementById('year')
if (yearEl) yearEl.textContent = new Date().getFullYear()

// Scroll visibility for sections
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.12 }
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible')
  })
}, observerOptions)

document.querySelectorAll('.section').forEach((section) => observer.observe(section))

// Animated stat counters
const statValues = document.querySelectorAll('.stat-value[data-target]')

const animateValue = (el, target, duration = 2000) => {
  const start = 0
  const startTime = performance.now()

  const step = (now) => {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOut = 1 - (1 - progress) ** 2
    const current = start + (target - start) * easeOut
    el.textContent = Math.round(current)
    if (progress < 1) requestAnimationFrame(step)
    else el.textContent = target
  }

  requestAnimationFrame(step)
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const el = entry.target
      const target = Number(el.dataset.target)
      if (isNaN(target)) return
      animateValue(el, target)
      statsObserver.unobserve(el)
    })
  },
  { threshold: 0.5 }
)

statValues.forEach((el) => statsObserver.observe(el))

// Contact form (prevent default, show feedback)
const form = document.querySelector('.contact-form')
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const btn = form.querySelector('button[type="submit"]')
    const originalText = btn.textContent
    btn.textContent = 'Sent!'
    btn.disabled = true
    setTimeout(() => {
      btn.textContent = originalText
      btn.disabled = false
    }, 2500)
  })
}
