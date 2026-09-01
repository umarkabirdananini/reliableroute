/* Reliable Routes — static, dependency-free interactions. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const data = JSON.parse($('#site-data').textContent);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = $('#site-header');
  const menuToggle = $('.menu-toggle');
  const mobileNav = $('#mobile-nav');
  const form = $('#quote-form');
  let currentPort = data.ports[0];
  let lastDialogTrigger = null;
  let preparedMessage = '';

  const toggleMenu = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    mobileNav.hidden = !open;
  };
  menuToggle.addEventListener('click', () => toggleMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  $$('a', mobileNav).forEach(link => link.addEventListener('click', () => toggleMenu(false)));
  document.addEventListener('click', e => { if (!header.contains(e.target)) toggleMenu(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !mobileNav.hidden) { toggleMenu(false); menuToggle.focus(); }
  });
  window.matchMedia('(min-width: 721px)').addEventListener('change', e => { if(e.matches) toggleMenu(false); });
  const reflectScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 15);
  window.addEventListener('scroll', reflectScroll, { passive: true });
  reflectScroll();
  $('#year').textContent = new Date().getFullYear();

  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .06, rootMargin: '0px 0px 35px 0px' });
    document.documentElement.classList.add('js-ready');
    $$('.reveal').forEach(el => observer.observe(el));
    const sections = new IntersectionObserver(entries => entries.forEach(entry => {
      if(entry.isIntersecting) {
        $$('.desktop-nav a').forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id));
      }
    }), {rootMargin: '-20% 0px -65% 0px'});
    $$('main section[id]').forEach(section => sections.observe(section));
  }

  const openDialog = (dialog, trigger) => {
    lastDialogTrigger = trigger || document.activeElement;
    dialog.showModal();
    document.body.classList.add('dialog-open');
  };
  $$('.modal').forEach(dialog => {
    $('[data-close-dialog]', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => {
      if(e.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if(e.clientX < bounds.left || e.clientX > bounds.right || e.clientY < bounds.top || e.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('dialog-open');
      if(lastDialogTrigger && document.contains(lastDialogTrigger)) lastDialogTrigger.focus({preventScroll:true});
    });
  });
  const serviceDialog = $('#service-dialog');
  serviceDialog.setAttribute('aria-labelledby','service-dialog-title');
  serviceDialog.setAttribute('aria-describedby','service-dialog-description');
  $$('#enquiry-dialog h2').forEach(el => { el.id='enquiry-dialog-title'; });
  $('#enquiry-dialog').setAttribute('aria-labelledby','enquiry-dialog-title');
  $('#privacy-dialog').setAttribute('aria-labelledby','privacy-title');
  $$('[data-service]').forEach(button => button.addEventListener('click', () => {
    const service = data.services.find(item => item.id === button.dataset.service);
    $('#service-dialog-title').textContent = service.name;
    $('#service-dialog-description').textContent = service.details;
    $('#service-dialog-icon').innerHTML = data.icons[service.icon];
    const points = $('#service-dialog-points');
    points.replaceChildren(...service.points.map(point => {
      const li = document.createElement('li'); li.textContent = point; return li;
    }));
    $('#service-enquiry').dataset.selectedService = service.name;
    openDialog(serviceDialog, button);
  }));
  $('#service-enquiry').addEventListener('click', e => {
    $('#service').value = e.currentTarget.dataset.selectedService;
    lastDialogTrigger = null;
    serviceDialog.close();
    setTimeout(() => $('#full-name').focus({preventScroll:true}), 350);
  });
  $$('[data-partnership]').forEach(link => link.addEventListener('click', () => {
    $('#service').value = 'International Partnership';
  }));
  $$('[data-open-privacy]').forEach(button => button.addEventListener('click', () => openDialog($('#privacy-dialog'), button)));

  $$('[data-port]').forEach(button => button.addEventListener('click', () => {
    currentPort = data.ports.find(port => port.id === button.dataset.port);
    $$('[data-port]').forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active); item.setAttribute('aria-pressed', String(active));
    });
    $$('[data-map-port]').forEach(point => point.classList.toggle('is-active', point.dataset.mapPort === currentPort.id));
    $('#map-area').textContent = currentPort.area.toUpperCase();
    $('#map-selected-name').textContent = currentPort.name;
    $('#map-summary').textContent = currentPort.summary;
  }));
  $('#port-enquiry').addEventListener('click', () => {
    $('#port').value = currentPort.name + ' — ' + currentPort.place;
    if(!$('#service').value) $('#service').value = 'Customs Clearance';
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const requiredTextFields = [$('#full-name'), $('#details')];
    requiredTextFields.forEach(field => field.setCustomValidity(field.value.trim() ? '' : 'Please enter your details.'));
    if(!form.reportValidity()) return;
    const fields = new FormData(form);
    const get = key => String(fields.get(key) || '').trim();
    preparedMessage = [
      'Hello Reliable Routes Logistics Limited,', '',
      get('service') === 'International Partnership' ? 'I would like to discuss an international partnership.' : 'I would like to enquire about your logistics services.', '',
      'Name: ' + get('name'),
      ...(get('company') ? ['Company: ' + get('company')] : []),
      'Email: ' + get('email'),
      ...(get('phone') ? ['Phone: ' + get('phone')] : []),
      'Service: ' + get('service'),
      ...(get('port') ? ['Port / location: ' + get('port')] : []), '',
      'Requirements:', get('details')
    ].join('\n');
    $('#enquiry-preview').textContent = preparedMessage;
    const whatsapp = get('channel') === 'whatsapp';
    const send = $('#send-enquiry');
    send.href = whatsapp
      ? 'https://wa.me/2348030566130?text=' + encodeURIComponent(preparedMessage)
      : 'mailto:reliableroutes@gmail.com?subject=' + encodeURIComponent('Logistics enquiry — ' + get('service')) + '&body=' + encodeURIComponent(preparedMessage);
    send.innerHTML = (whatsapp ? 'Continue to WhatsApp' : 'Open my email app') + data.icons.arrow;
    $('#enquiry-instructions').textContent = whatsapp
      ? 'Review your details below, then continue to WhatsApp to send your message.'
      : 'Review your details below, then open your email app to send your message.';
    $('#copy-status').textContent = '';
    openDialog($('#enquiry-dialog'), $('.form-submit'));
  });
  [$('#full-name'), $('#details')].forEach(field => field.addEventListener('input', () => field.setCustomValidity('')));
  $('#copy-enquiry').addEventListener('click', async () => {
    const fallback = () => {
      const range = document.createRange(); range.selectNodeContents($('#enquiry-preview'));
      const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
      try { return document.execCommand('copy'); } catch { return false; }
    };
    let copied = false;
    try { await navigator.clipboard.writeText(preparedMessage); copied = true; } catch { copied = fallback(); }
    $('#copy-status').textContent = copied ? 'Message copied. Paste it into WhatsApp or email.' : 'Select the message above and copy it using your device’s copy command.';
  });
})();
