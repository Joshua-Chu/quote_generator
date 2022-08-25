const randomBtn = document.querySelector('#random__generator');
const authorQuotesBtn = document.querySelector('#quote__author--card');

const quotesAuthor = document.querySelector('#quotes__author');
const quotesAuthorName = document.querySelector('#quotes__author h1');
const quoteAuthor = document.querySelector('#quote__author');

const quoteWrapper = document.getElementById('quote__wrapper');

const quoteInfo = document.getElementById('quote__author--info');

const spinner = document.querySelector('#spinner');
const content = document.querySelector('#content');

const quoteURL = 'https://quote-garden.herokuapp.com/api/v3/quotes';

const createQuote = (text) => {
  const _quote = document.createElement('div');
  _quote.className = 'quote__text';

  const quoteText = document.createElement('p');
  quoteText.textContent = text;

  _quote.appendChild(quoteText);

  return _quote;
};

const changeQuoteAuthorInfo = (name, genre) => {
  const quoteAuthor = document.createElement('h3');
  const quoteGenre = document.createElement('p');

  quoteAuthor.textContent = name;
  quoteGenre.textContent = genre;

  quoteInfo.appendChild(quoteAuthor);
  quoteInfo.appendChild(quoteGenre);
};

const fetchRandomQuote = () =>
  fetch(quoteURL + '/random').then((data) => data.json());

const fetchQuotesByAuthor = (author) =>
  fetch(quoteURL + `?author=${author}`).then((data) => data.json());

const addRandomQuoteToDOM = (data) => {
  const quote = data[0];
  const { quoteAuthor: _quoteAuthor, quoteGenre, quoteText } = quote;

  quoteWrapper.innerHTML = '';
  quoteInfo.innerHTML = '';

  const _quote = createQuote(quoteText);
  quoteWrapper.appendChild(_quote);

  if (quoteAuthor.classList.contains('hidden'))
    quoteAuthor.classList.remove('hidden');

  if (quotesAuthor.className === 'show') quotesAuthor.className = 'hide';

  if (quotesAuthorName.textContent !== '') quotesAuthorName.textContent = '';

  changeQuoteAuthorInfo(_quoteAuthor, quoteGenre);
};

randomBtn.addEventListener('click', () => {
  spinner.className = 'show';
  content.classList.add('hidden');
  fetchRandomQuote().then((res) => addRandomQuoteToDOM(res.data));

  setTimeout(() => {
    content.classList.remove('hidden');
    spinner.className = 'hidden';
  }, 1000);
});

authorQuotesBtn.addEventListener('click', () => {
  spinner.className = 'show';
  content.classList.add('hidden');
  const authorName = document.querySelector('#quote__author--info h3');

  fetchQuotesByAuthor(authorName.textContent).then((res) => {
    const { data } = res;

    const fragment = document.createDocumentFragment();

    quoteWrapper.innerHTML = '';

    data.forEach(({ quoteText, quoteAuthor }) => {
      const _quote = createQuote(quoteText);
      fragment.appendChild(_quote);
    });

    quotesAuthorName.textContent = authorName.textContent;
    quoteWrapper.appendChild(fragment);
    quotesAuthor.className = 'show';
    quoteAuthor.className = 'hidden';
  });

  setTimeout(() => {
    content.classList.remove('hidden');
    spinner.className = 'hidden';
  }, 1000);
});

window.onload = fetchRandomQuote().then((res) => addRandomQuoteToDOM(res.data));
