// ДентаЛюкс — интерактивность: меню, форма, анимации
// Класс 'js' ставится только здесь: если этот файл не загрузился,
// CSS-правила .js .reveal{opacity:0} не применятся и контент останется видимым.
document.body.classList.add('js');
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

// Появление секций при прокрутке (контент виден и без JS)
const io = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      }
    }, { threshold: 0.12 })
  : null;
if (io) document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
else document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));

// Форма записи
const form = document.getElementById('bookForm');
const box = document.getElementById('formBox');

function setInvalid(id, bad) {
  const f = document.getElementById(id);
  if (f) f.classList.toggle('invalid', bad);
}

if (form && box) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#in-name');
    const phone = form.querySelector('#in-phone');
    const agree = form.querySelector('#in-agree');

    const nameBad = !name.value.trim();
    const digits = phone.value.replace(/\D/g, '');
    const phoneBad = digits.length < 10;

    setInvalid('f-name', nameBad);
    setInvalid('f-phone', phoneBad);
    if (nameBad || phoneBad) return;
    if (agree && !agree.checked) {
      agree.focus();
      return;
    }
    box.classList.add('sent');
  });

  ['in-name', 'in-phone'].forEach((id) => {
    const el = form.querySelector('#' + id);
    el.addEventListener('input', () => {
      const field = el.closest('.field');
      if (field) field.classList.remove('invalid');
    });
  });
}

// Текущий год в подвале
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
