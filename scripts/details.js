(function () {
  var root = document.getElementById('detailsRoot');
  if (!root) return;

  // --- Hotel Data ---
  var hotels = [
    {
      id: 1,
      title: 'Hotel Paradise Bravo',
      image: '/Hotel-1.webp',
      price: 220,
      location: 'ბათუმი',
      description: 'ზღვისპირა სასტუმრო ბათუმში. დიდი აუზი, საუზმე და ვახშამი შედის.',
      amenities: ['უფასო Wi-Fi', 'საუზმე', 'ღია აუზი', 'ფიტნეს დარბაზი'],
      policies: ['ჩექინი: 14:00', 'ჩექაუთი: 11:00', 'გაუქმება: 24 საათით ადრე']
    },
    {
      id: 2,
      title: 'Hotel Monblan',
      image: '/Hotel-4.jpg',
      price: 180,
      location: 'გუდაური',
      description: 'მთის ხედები და თბილი სპა ზონა გუდაურში.',
      amenities: ['სპა', 'სკის ინვენტარი', 'პარკინგი', 'რესტორანი'],
      policies: ['ჩექინი: 15:00', 'ჩექაუთი: 11:00', 'გაუქმება: 24 საათით ადრე']
    },
    {
      id: 3,
      title: 'Hotel Paradise India',
      image: '/Hotel-3.webp',
      price: 260,
      location: 'თბილისი',
      description: 'თბილისში პრემიუმ სერვისი, ავტორეული სამზარეულო.',
      amenities: ['რესტორანი', 'ბარი', 'კონფერენციის ოთახი', '24/7 კონსიერჟი'],
      policies: ['რეგისტრაცია პირადობით აუცილებელია', 'ჩექინი: 15:00', 'ჩექაუთი: 11:00', 'გაუქმება: 24 საათით ადრე']
    }
  ];

  // --- URL Params ---
  var params = new URLSearchParams(location.search);
  var title = params.get('title');
  var hotel = hotels.find(h => h.title === title) || hotels[0];

  // --- Helpers ---
  function format(n) { return '₾ ' + n.toFixed(2); }

  // --- Render Details Section ---
  root.innerHTML = `
    <section class="details-hero">
      <img src="${hotel.image}" alt="${hotel.title}">
      <div class="details-panel">
        <h2>${hotel.title}</h2>
        <div class="summary">ფასი: <b>${format(hotel.price)}</b> / ღამე</div>
        <p>${hotel.description}</p>
        <div><b>სერვისები:</b><br>${hotel.amenities.map(a => '• ' + a).join('<br>')}</div>
        ${hotel.policies.length ? '<div><b>წესები:</b><br>' + hotel.policies.map(p => '• ' + p).join('<br>') + '</div>' : ''}
        <label class="qty">ღამეები: <input id="nights" type="number" value="1" min="1"></label>
        <div id="total">სულ: <b>${format(hotel.price)}</b></div>
        <div style="display:flex; gap:10px; align-items:center;">
          <a class="btn" id="bookBtn" href="#">დამატება კალათაში</a>
          <a href="Hotel.html">დაბრუნება</a>
        </div>
      </div>
    </section>

    <!-- Comments Section (hidden until fetched) -->
    <section id="commentsSection" style="display:none; margin-top:40px;">
      <h3>მომხმარებელთა კომენტარები</h3>
      <div id="commentsContainer" class="comments"></div>
    </section>
  `;

  // --- Recalculate total nights ---
  var nightsInput = document.getElementById('nights');
  var totalEl = document.getElementById('total');
  function recalc() {
    var nights = Math.max(1, parseInt(nightsInput.value || '1', 10));
    var total = hotel.price * nights;
    totalEl.innerHTML = 'სულ: <b>' + format(total) + '</b>';
  }
  nightsInput.addEventListener('input', recalc);
  recalc();

  // --- Add to Cart ---
  var bookBtn = document.getElementById('bookBtn');
  bookBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var nights = Math.max(1, parseInt(nightsInput.value || '1', 10));
    var total = hotel.price * nights;

    var cart = [];
    try { cart = JSON.parse(sessionStorage.getItem('cart') || '[]'); } catch (_) { cart = []; }

    cart.push({
      id: hotel.id,
      title: hotel.title,
      image: hotel.image,
      pricePerNight: hotel.price,
      nights: nights,
      total: total
    });

    sessionStorage.setItem('cart', JSON.stringify(cart));
    location.href = 'checkout.html';
  });

  // --- Fetch Comments Async ---
  async function fetchComments() {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${hotel.id}`);
      const comments = await res.json();

      const commentsContainer = document.getElementById('commentsContainer');
      commentsContainer.innerHTML = comments.slice(0, 5).map(c => `
        <div class="comment">
          <strong>${c.name}</strong> <br>
          <em>${c.email}</em>
          <p>${c.body}</p>
        </div>
      `).join('');

      document.getElementById('commentsSection').style.display = 'block';
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  }

  // Call after everything loads
  fetchComments();
})();
