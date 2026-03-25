/* =============================================
   ux.ui.dan — main.js
   All interactive behaviour for the landing page
   ============================================= */


/* =============================================
   1. NAVBAR — frosted glass on scroll
   ============================================= */
(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;

  var ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (window.scrollY > 80) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
})();


/* =============================================
   2. MOBILE NAVIGATION
   ============================================= */
(function () {
  var burger = document.getElementById('navBurger');
  var mobileMenu = document.getElementById('navMobile');
  if (!burger || !mobileMenu) return;

  burger.addEventListener('click', function () {
    var isOpen = burger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  document.addEventListener('click', function (e) {
    var nav = document.getElementById('nav');
    if (!nav.contains(e.target)) {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });
})();


/* =============================================
   3. SMOOTH SCROLL with navbar offset
   ============================================= */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var nav = document.getElementById('nav');
      var navHeight = nav ? nav.offsetHeight : 0;
      var targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 24;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
})();


/* =============================================
   4. SCROLL REVEAL ANIMATIONS
   ============================================= */
(function () {
  var revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
})();


/* =============================================
   5. STAT COUNTER ANIMATION
   Numbers in the About section count up from 0
   ============================================= */
(function () {
  var statNums = document.querySelectorAll('.stat-num[data-target]');
  if (!statNums.length) return;

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffixEl = el.querySelector('.suffix');
    var suffix = suffixEl ? suffixEl.outerHTML : '';
    var duration = 1400;
    var startTime = performance.now();

    function update(currentTime) {
      var elapsed = currentTime - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(eased * target);

      el.innerHTML = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.innerHTML = target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNums.forEach(function (el) {
    observer.observe(el);
  });
})();


/* =============================================
   6. CASE STUDY DATA
   Edit this to match your real projects
   ============================================= */
var caseStudies = {

  fintech: {
    category: 'FinTech · Mobile App',
    title: 'FinVault — Banking Reimagined',
    subtitle: 'A complete redesign of a legacy mobile banking app, turning a frustrating experience into one users genuinely enjoy.',
    client: 'FinVault',
    year: '2024',
    scope: 'UX Research, UI Design, Prototyping',
    coverGradient: 'linear-gradient(135deg, #0f1a2e 0%, #1a2d4a 100%)',
    sections: [
      {
        tag: '01 — Research',
        title: 'Understanding where the pain lived',
        text: [
          'We began with a 3-week research sprint: 12 user interviews, session recordings from 500+ real users, and an audit of every flow in the existing app.',
          'The data was clear: users abandoned the app primarily during the onboarding flow and when trying to make transfers. The navigation was confusing — five tabs with inconsistent labelling — and the visual hierarchy made key information hard to find under stress.'
        ],
        quote: '"I use the app every day but I still feel like I\'m figuring it out each time." — Research participant',
        tags: ['User Interviews', 'Usability Testing', 'Analytics Audit', 'Competitive Analysis'],
        imagePlaceholder: 'Research findings & user journey maps'
      },
      {
        tag: '02 — Process',
        title: 'From 48 screens to a coherent system',
        text: [
          'We restructured the information architecture from scratch, reducing the navigation from 5 tabs to 3 focused ones. Every flow was mapped, challenged, and simplified.',
          'We ran three rounds of prototype testing with actual FinVault customers before touching final visuals. Each round reduced task completion time and confusion scores. By round three, users moved through the transfer flow in under 40 seconds — down from 2+ minutes.'
        ],
        quote: '"Seeing users complete tasks effortlessly in testing was the proof we needed to take this direction to leadership." — Product Lead, FinVault',
        tags: ['Information Architecture', 'Wireframing', 'Prototype Testing', 'Iteration'],
        imagePlaceholder: 'Wireframes and prototype testing sessions'
      },
      {
        tag: '03 — UI Design',
        title: 'A visual language built for trust',
        text: [
          'The final UI was designed around one principle: financial apps need to feel calm and in control. We introduced a deep navy palette with clear typographic hierarchy and a single vibrant accent used only for actions.',
          'Every component was designed with accessibility in mind — AA contrast ratios, generous touch targets, and readable type sizes. We also built a full design system so the internal team could build future features without needing to come back to us for every new screen.'
        ],
        quote: null,
        tags: ['Visual Design', 'Design System', 'Accessibility', 'iOS & Android'],
        imagePlaceholder: 'Final UI screens — light and dark mode'
      },
      {
        tag: '04 — Outcome',
        title: 'The numbers that mattered',
        text: [
          'Within 90 days of launching the redesigned app, FinVault saw significant improvements across every key metric. The redesign paid for itself within the first quarter through reduced support volume alone.'
        ],
        quote: null,
        tags: null,
        imagePlaceholder: null,
        stats: [
          { number: '40%', label: 'Reduction in support tickets' },
          { number: '3×', label: 'Increase in daily active users' },
          { number: '4.8', label: 'App store rating (up from 2.9)' }
        ]
      }
    ]
  },

  ecommerce: {
    category: 'E-Commerce · Web Platform',
    title: 'Maple — Commerce Platform',
    subtitle: 'Redesigning a high-traffic e-commerce experience to turn browsers into buyers — without sacrificing brand feel.',
    client: 'Maple',
    year: '2023',
    scope: 'UX Strategy, UI Design, Conversion Optimisation',
    coverGradient: 'linear-gradient(135deg, #1a0f1a 0%, #2d1a2d 100%)',
    sections: [
      {
        tag: '01 — Research',
        title: 'Where the funnel was leaking',
        text: [
          'Maple came to us with a clear problem: high traffic but a checkout abandonment rate above 70%. Heatmaps and session recordings revealed that users were getting lost between the product page and cart.',
          'We interviewed 15 customers and ran a survey with 200+ responses. The consistent theme: the site felt designed for showcasing products, not buying them. Critical CTAs were buried, trust signals were missing, and the checkout had 7 unnecessary steps.'
        ],
        quote: '"I love the brand but buying from the website is a bit of a chore." — Customer survey response',
        tags: ['Conversion Audit', 'Heatmap Analysis', 'Customer Surveys', 'Funnel Analysis'],
        imagePlaceholder: 'Funnel analysis and heatmap findings'
      },
      {
        tag: '02 — Process',
        title: 'Redesigning around the buying moment',
        text: [
          'We rebuilt the product page, cart experience, and checkout flow in parallel, running constant A/B tests with Maple\'s traffic to validate decisions in real time.',
          'The checkout was reduced from 7 steps to 3. Trust signals (reviews, returns policy, secure payment badges) were repositioned to appear exactly when users hesitate. The add-to-cart interaction was made more satisfying and immediate.'
        ],
        quote: null,
        tags: ['A/B Testing', 'Wireframing', 'Checkout Redesign', 'Component Design'],
        imagePlaceholder: 'Before / After wireframe comparison'
      },
      {
        tag: '03 — UI Design',
        title: 'Beautiful and built to convert',
        text: [
          'The final design retained Maple\'s warm, editorial aesthetic while making every interaction feel more intentional. Product photography was given more space. Typography was tightened. The CTA colour became unmissable.',
          'We also designed a new mobile experience from scratch, since over 65% of Maple\'s traffic came from phones. The result was a thumb-friendly layout with a sticky add-to-cart bar on every product page.'
        ],
        quote: null,
        tags: ['E-Commerce UI', 'Mobile-First', 'Design System', 'Brand Design'],
        imagePlaceholder: 'Final product pages — desktop and mobile'
      },
      {
        tag: '04 — Outcome',
        title: 'More buyers, happier brand',
        text: [
          'The redesigned platform launched over a single weekend. Results were visible within the first week and continued improving over the following months as the A/B learnings were rolled in.'
        ],
        quote: null,
        tags: null,
        imagePlaceholder: null,
        stats: [
          { number: '28%', label: 'Increase in conversion rate' },
          { number: '41%', label: 'Reduction in cart abandonment' },
          { number: '2.3×', label: 'Increase in mobile purchases' }
        ]
      }
    ]
  },

  saas: {
    category: 'SaaS · Dashboard',
    title: 'Orbit — Analytics Dashboard',
    subtitle: 'Transforming a data-heavy analytics tool from a daily frustration into an actual competitive advantage for operations teams.',
    client: 'Orbit',
    year: '2024',
    scope: 'Product Design, Design System, Developer Handoff',
    coverGradient: 'linear-gradient(135deg, #0f1a14 0%, #1a2d1e 100%)',
    sections: [
      {
        tag: '01 — Research',
        title: 'Too much data, not enough insight',
        text: [
          'Orbit\'s dashboard had grown organically over 4 years. Every new feature request added another widget, table, or chart. By the time we were brought in, the main dashboard had 47 visible data points and a navigation system that even senior users couldn\'t confidently describe.',
          'We shadowed 8 operations team members across 3 days to understand how they actually used the tool vs. how it was designed to be used. The gap was significant.'
        ],
        quote: '"I know the data is in there. I just spend 10 minutes looking for it every morning." — Operations Manager, Orbit user',
        tags: ['Contextual Inquiry', 'Jobs-to-be-Done', 'Feature Audit', 'Analytics Review'],
        imagePlaceholder: 'Shadow research documentation and findings'
      },
      {
        tag: '02 — Process',
        title: 'Designing for the 3 key jobs',
        text: [
          'Our research revealed that 90% of what users did every day fell into just 3 jobs: check overnight performance, investigate an anomaly, and export a report. We redesigned the entire dashboard around these three workflows.',
          'Everything else — the 40+ other data points — was still accessible, but not competing for attention on the main view. We ran card sorting sessions with 12 users to validate the new information architecture before committing to visual design.'
        ],
        quote: null,
        tags: ['Information Architecture', 'Card Sorting', 'User Flows', 'Wireframing'],
        imagePlaceholder: 'IA restructure and new navigation system'
      },
      {
        tag: '03 — UI Design',
        title: 'Data clarity as a design principle',
        text: [
          'The visual language was built around one idea: data should be easy to read under pressure. We established a strict typographic scale, a colour system where only anomalies were highlighted, and a consistent chart style across all 60+ chart types in the product.',
          'We also built a comprehensive component library — Orbit\'s first — covering every state of every UI element. This alone halved the time their engineering team spent on UI questions.'
        ],
        quote: null,
        tags: ['Data Visualisation', 'Design System', 'Component Library', 'Dark Mode'],
        imagePlaceholder: 'Dashboard UI — before and after'
      },
      {
        tag: '04 — Outcome',
        title: 'Faster decisions, fewer support calls',
        text: [
          'Orbit\'s team reported that onboarding new employees was cut from 3 weeks to under a week just because the interface now made sense. Enterprise customers renewed at a higher rate, citing "product quality improvements" as a key reason.'
        ],
        quote: null,
        tags: null,
        imagePlaceholder: null,
        stats: [
          { number: '67%', label: 'Faster time-to-insight for core tasks' },
          { number: '55%', label: 'Reduction in support queries' },
          { number: '94%', label: 'User satisfaction score at relaunch' }
        ]
      }
    ]
  },

  health: {
    category: 'HealthTech · iOS & Android',
    title: 'Kare — Patient Experience',
    subtitle: 'Making healthcare administration as simple as messaging a friend — for patients and providers alike.',
    client: 'Kare Health',
    year: '2023',
    scope: 'UX Research, UI Design, Accessibility, Mobile',
    coverGradient: 'linear-gradient(135deg, #1a1a0f 0%, #2d2d1a 100%)',
    sections: [
      {
        tag: '01 — Research',
        title: 'Healthcare is stressful. The app shouldn\'t be.',
        text: [
          'Healthcare apps carry a unique design burden: users are often anxious, unwell, or navigating complex information under pressure. Our research began by understanding the emotional state of users — not just their tasks.',
          'We conducted 10 in-depth interviews with patients ranging from 22 to 74 years old, and 5 interviews with healthcare providers. Accessibility was a central concern from day one: 30% of Kare\'s user base were over 60.'
        ],
        quote: '"When I\'m not feeling well, the last thing I want is a confusing app. I just want to know what to do next." — Research participant, age 58',
        tags: ['Empathy Research', 'Accessibility Audit', 'Persona Development', 'Service Design'],
        imagePlaceholder: 'User research sessions and persona maps'
      },
      {
        tag: '02 — Process',
        title: 'One task at a time',
        text: [
          'Our core design principle became: never ask the user to hold more than one thing in their head at once. Every screen has a single primary action. Every flow is broken into the smallest possible steps.',
          'We tested with users across a wide age range throughout the process. An 18-year-old and a 71-year-old both completing the same task without hesitation was our definition of success. It took four rounds of testing to get there.'
        ],
        quote: null,
        tags: ['Progressive Disclosure', 'Cognitive Load Reduction', 'Inclusive Design', 'Prototype Testing'],
        imagePlaceholder: 'User testing across age groups'
      },
      {
        tag: '03 — UI Design',
        title: 'Calm, clear, and completely accessible',
        text: [
          'The visual design used a calm, warm palette — far from the clinical blues common in healthcare. Type sizes are larger than industry standard. Every interactive element meets WCAG AA contrast requirements, with most meeting AAA.',
          'We designed for both iOS and Android simultaneously, using platform-native patterns where they reduced cognitive load and custom patterns where they genuinely improved the experience.'
        ],
        quote: null,
        tags: ['Accessible Design', 'WCAG AA/AAA', 'iOS & Android', 'Inclusive Typography'],
        imagePlaceholder: 'Final UI screens across iOS and Android'
      },
      {
        tag: '04 — Outcome',
        title: 'Healthier patients, happier providers',
        text: [
          'Kare launched the redesigned app to their full user base 8 months after we started. The response from both patients and providers was immediate and overwhelmingly positive.'
        ],
        quote: null,
        tags: null,
        imagePlaceholder: null,
        stats: [
          { number: '4.9', label: 'App store rating on launch week' },
          { number: '82%', label: 'Reduction in appointment no-shows' },
          { number: '3×', label: 'Faster task completion vs. previous app' }
        ]
      }
    ]
  }

};


/* =============================================
   7. CASE STUDY MODAL
   ============================================= */
(function () {
  var modal = document.getElementById('caseStudyModal');
  var modalClose = document.getElementById('modalClose');
  if (!modal) return;

  // Build HTML for one case study section
  function buildSection(section) {

    // Stats (outcome section)
    var statsHtml = '';
    if (section.stats && section.stats.length) {
      var statItems = section.stats.map(function (s) {
        return '<div class="cs-stat-box">'
          + '<div class="cs-stat-n">' + s.number + '</div>'
          + '<div class="cs-stat-l">' + s.label + '</div>'
          + '</div>';
      }).join('');
      statsHtml = '<div class="cs-stats-row">' + statItems + '</div>';
    }

    // Image placeholder
    var imgHtml = '';
    if (section.imagePlaceholder) {
      imgHtml = '<div class="cs-img-ph">' + section.imagePlaceholder + '</div>';
    }

    // Quote block
    var quoteHtml = '';
    if (section.quote) {
      quoteHtml = '<div class="cs-quote-block"><p>' + section.quote + '</p></div>';
    }

    // Tags
    var tagsHtml = '';
    if (section.tags && section.tags.length) {
      var chips = section.tags.map(function (t) {
        return '<span class="cs-tag-chip">' + t + '</span>';
      }).join('');
      tagsHtml = '<div class="cs-tags-row">' + chips + '</div>';
    }

    // Body text
    var bodyHtml = '<div class="cs-body">'
      + section.text.map(function (p) { return '<p>' + p + '</p>'; }).join('')
      + quoteHtml
      + tagsHtml
      + '</div>';

    // Layout: two-column if image, else full-width with stats
    var contentHtml;
    if (imgHtml) {
      contentHtml = '<div class="cs-cols">' + bodyHtml + '<div>' + imgHtml + '</div></div>';
    } else {
      contentHtml = bodyHtml + statsHtml;
    }

    return '<div class="cs-sec">'
      + '<div class="cs-tag-label"><span class="cs-pill">' + section.tag + '</span></div>'
      + '<h2 class="cs-title">' + section.title + '</h2>'
      + contentHtml
      + '</div>';
  }

  // Open modal
  function openModal(caseKey) {
    var data = caseStudies[caseKey];
    if (!data) return;

    document.getElementById('modalCategoryBadge').textContent = data.category;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalSubtitle').textContent = data.subtitle;
    document.getElementById('modalClient').textContent = data.client;
    document.getElementById('modalYear').textContent = data.year;
    document.getElementById('modalScope').textContent = data.scope;

    var cover = document.getElementById('modalCover');
    cover.style.background = data.coverGradient;
    cover.textContent = 'Your project cover image here';

    document.getElementById('modalSections').innerHTML = data.sections.map(buildSection).join('');

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modal.scrollTop = 0;
  }

  // Close modal
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Attach open handlers to case cards
  document.querySelectorAll('.case-card[data-case]').forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(card.getAttribute('data-case'));
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.getAttribute('data-case'));
      }
    });
  });

  // Close via back button
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close via Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
})();


/* =============================================
   8. MANIFESTO — scroll-driven word opacity reveal
   ============================================= */
(function () {
  var section = document.getElementById('manifesto');
  if (!section) return;
  var copy = section.querySelector('.manifesto-copy');
  if (!copy) return;

  // Detach from standard reveal observer
  copy.classList.remove('reveal');

  var words = [];

  function wrapTextNode(node) {
    var text = node.textContent;
    if (!text.trim()) return;
    var frag = document.createDocumentFragment();
    var parts = text.split(/(\s+)/);
    parts.forEach(function (part) {
      if (/\S/.test(part)) {
        var span = document.createElement('span');
        span.className = 'm-word';
        span.textContent = part;
        words.push(span);
        frag.appendChild(span);
      } else if (part) {
        frag.appendChild(document.createTextNode(part));
      }
    });
    node.parentNode.replaceChild(frag, node);
  }

  function processChildren(parent) {
    var children = Array.from(parent.childNodes);
    children.forEach(function (child) {
      if (child.nodeType === Node.TEXT_NODE) {
        wrapTextNode(child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        if (child.tagName === 'BR') {
          // leave <br> intact
        } else if (child.classList.contains('hl')) {
          child.classList.add('m-hl');
          words.push(child);
        } else {
          processChildren(child);
        }
      }
    });
  }

  processChildren(copy);

  var ticking = false;

  function update() {
    var vh = window.innerHeight;
    var mid = vh * 0.5;
    var fadeZone = vh * 0.18; // words start fading in ~18vh before reaching centre

    words.forEach(function (word) {
      var rect = word.getBoundingClientRect();
      var wordMid = rect.top + rect.height / 2;
      // dist > 0: word is below centre; dist <= 0: word has passed centre
      var dist = wordMid - mid;
      var p = dist <= 0 ? 1 : Math.max(0, 1 - dist / fadeZone);
      word.style.opacity = 0.1 + p * 0.9;
    });

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
})();


/* =============================================
   9. CONTACT FORM — Formspree submission
   ============================================= */
(function () {
  var form = document.getElementById('contactForm');
  var submitBtn = document.getElementById('submitBtn');
  var successMsg = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = form.querySelector('#name').value.trim();
    var email = form.querySelector('#email').value.trim();
    var message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      [{ el: '#name', val: name }, { el: '#email', val: email }, { el: '#message', val: message }].forEach(function (f) {
        if (!f.val) {
          var el = form.querySelector(f.el);
          el.style.borderColor = '#ff6b6b';
          el.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.15)';
          el.addEventListener('input', function () {
            el.style.borderColor = '';
            el.style.boxShadow = '';
          }, { once: true });
        }
      });
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
    .then(function (response) {
      if (response.ok) {
        form.style.display = 'none';
        successMsg.classList.add('show');
      } else {
        response.json().then(function (data) {
          var errorMsg = (data.errors && data.errors.map(function (e) { return e.message; }).join(', '))
            || 'Something went wrong. Please try again or email us directly.';
          alert(errorMsg);
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send message';
        });
      }
    })
    .catch(function () {
      alert('Could not send your message. Please check your connection and try again.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    });
  });
})();
