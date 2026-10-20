const toggleButton = document.querySelector('.menu-toggle');
const body = document.body;
const tocLinks = document.querySelectorAll('.toc a');
const scanInput = document.getElementById('scanInput');
const scanBtn = document.getElementById('scanBtn');
const sampleBtn = document.getElementById('sampleBtn');
const results = document.getElementById('results');

const SAMPLE_TEXT = `In conclusion, it is important to delve into the comprehensive tapestry of modern neural networks. This study plays a pivotal role in illustrating that artificial intelligence continues to evolve. The findings suggest that this topic is crucial for understanding the transformative impact of technology on society.`;

const AI_PATTERNS = [
  {
    name: 'Em dash overload',
    description: 'Repeated em dash punctuation can signal a highly rhythmic, formulaic style.',
    check: (text) => /—/.test(text)
  },
  {
    name: 'Buzzword density',
    description: 'Repeated abstract, inflated words can sound generic or over-engineered.',
    check: (text) => /(delve|pivotal|tapestry|grounded|vibrant|transformative|realm|intricate|crucial|vivid|dynamic)/i.test(text)
  },
  {
    name: 'Formulaic structure',
    description: 'Sentence openings like “In conclusion” or “It is important to note” often show a mechanical structure.',
    check: (text) => /(in conclusion|it is important to note|in summary|overall|not just .* but also)/i.test(text)
  },
  {
    name: 'Cliché framing',
    description: 'Generic opening phrasing can make the writing sound less specific and more templated.',
    check: (text) => /(in today['’]s fast-paced digital landscape|in the dynamic world of|as the world continues to evolve|shouting into the void)/i.test(text)
  },
  {
    name: 'Forced rhetorical contrast',
    description: 'Pronounced “not just X, but Y” wording can feel synthetic or staged.',
    check: (text) => /(not just .* but also|here['’]s the deal|here['’]s why that matters)/i.test(text)
  },
  {
    name: 'Meta or chatbot voice',
    description: 'Meta statements can sound like a model or assistant rather than a human voice.',
    check: (text) => /(as a language model|as an ai|here are some|it is essential|it is important to emphasize)/i.test(text)
  }
];

function renderResults(matches) {
  results.innerHTML = '';

  if (!matches.length) {
    results.innerHTML = '<div class="result-item"><h4>No strong pattern matches found</h4><p class="no-match">This text does not show obvious formulaic or AI-like language patterns in the current ruleset.</p></div>';
    return;
  }

  matches.forEach((item) => {
    const box = document.createElement('div');
    box.className = 'result-item';

    const title = document.createElement('h4');
    title.textContent = item.name;

    const body = document.createElement('p');
    body.innerHTML = `${item.description} <span class="match">Match</span>`;

    box.appendChild(title);
    box.appendChild(body);
    results.appendChild(box);
  });
}

function runScan() {
  const input = (scanInput.value || '').trim();
  if (!input) {
    results.innerHTML = '<div class="result-item"><h4>No text entered</h4><p class="no-match">Add a paragraph to check for common AI-like patterns.</p></div>';
    return;
  }

  const matches = AI_PATTERNS.filter((pattern) => pattern.check(input));
  renderResults(matches);
}

if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    const isOpen = body.classList.toggle('nav-open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  });
}

for (const link of tocLinks) {
  link.addEventListener('click', () => {
    tocLinks.forEach(item => item.classList.remove('active'));
    link.classList.add('active');

    if (window.innerWidth <= 980) {
      body.classList.remove('nav-open');
      toggleButton?.setAttribute('aria-expanded', 'false');
    }
  });
}

const sections = document.querySelectorAll('.article-content section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute('id');
    if (!id) return;

    tocLinks.forEach((link) => {
      const isMatch = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isMatch);
    });
  });
}, {
  rootMargin: '-20% 0px -40% 0px',
  threshold: [0.1, 0.5]
});

sections.forEach((section) => observer.observe(section));

scanBtn?.addEventListener('click', runScan);
sampleBtn?.addEventListener('click', () => {
  scanInput.value = SAMPLE_TEXT;
  runScan();
});

runScan();
