(function () {
  var root = document.getElementById('detailsRoot');
  if (!root) return;

  var params = new URLSearchParams(location.search);
  var title = params.get('title') || 'სასტუმრო';
  var image = params.get('image') || '/Hotel-1.webp';
  var price = parseFloat(params.get('price') || '0');

  var infoByHotel = {
    'Hotel Paradise Bravo': {
      description: 'ზღვისპირა სასტუმრო ბათუმში. დიდი აუზი, საუზმე და ვახშამი შედის.',
      amenities: ['უფასო Wi-Fi', 'საუზმე', 'ღია აუზი', 'ფიტნეს დარბაზი'],
      policies: ['ჩექინი: 14:00', 'ჩექაუთი: 11:00', 'გაუქმება: 24 საათით ადრე']
    },
    'Hotel Monblan': {
      description: 'მთის ხედები და თბილი სპა ზონა გუდაურში.',
      amenities: ['სპა', 'სკის ინვენტარი', 'პარკინგი', 'რესტორანი'],
      policies: ['ჩექინი: 15:00', 'ჩექაუთი: 11:00', 'გაუქმება: 24 საათით ადრე']
    },
    'Hotel Paradise India': {
      description: 'თბილისში პრემიუმ სერვისი, ავტორეული სამზარეულო.',
      amenities: ['რესტორანი', 'ბარი', 'კონფერენციის ოთახი', '24/7 კონსიერჟი'],
      policies: ['რეგისტრაცია პირადობით აუცილებელია', 'ჩექინი: 15:00', 'ჩექაუთი: 11:00', 'გაუქმება: 24 საათით ადრე']
    }
  };

  function format(n) { return '₾ ' + n.toFixed(2); }

  var add = infoByHotel[title] || { description: 'სასიამოვნო სასტუმრო.', amenities: ['უფასო Wi-Fi'], policies: [] };

  root.innerHTML = `
    <section class="details-hero">
      <img src="${image}" alt="${title}">
      <div class="details-panel">
        <h2>${title}</h2>
        <div class="summary">ფასი: <b>${format(price)}</b> / ღამე</div>
        <p>${add.description}</p>
        <div><b>სერვისები:</b><br>${add.amenities.map(a => '• ' + a).join('<br>')}</div>
        ${add.policies.length ? '<div><b>წესები:</b><br>' + add.policies.map(p => '• ' + p).join('<br>') + '</div>' : ''}
        <label class="qty">ღამეები: <input id="nights" type="number" value="1" min="1"></label>
        <div id="total">სულ: <b>${format(price)}</b></div>
        <div style="display:flex; gap:10px; align-items:center;">
          <a class="btn" id="bookBtn" href="#">დამატება კალათაში</a>
          <a href="Hotel.html">დაბრუნება</a>
        </div>
      </div>
    </section>
  `;

  var nightsInput = document.getElementById('nights');
  var totalEl = document.getElementById('total');
  function recalc() {
    var nights = Math.max(1, parseInt(nightsInput.value || '1', 10));
    var total = price * nights;
    totalEl.innerHTML = 'სულ: <b>' + format(total) + '</b>';
  }
  nightsInput.addEventListener('input', recalc);
  recalc();

  var bookBtn = document.getElementById('bookBtn');
  bookBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var nights = Math.max(1, parseInt(nightsInput.value || '1', 10));
    var total = price * nights;

    // Get existing cart or create new
    var cart = [];
    try { cart = JSON.parse(sessionStorage.getItem('cart') || '[]'); } catch (_) { cart = []; }

    // Add new hotel to cart
    cart.push({
      title: title,
      image: image,
      pricePerNight: price,
      nights: nights,
      total: total
    });

    // Save back to sessionStorage
    sessionStorage.setItem('cart', JSON.stringify(cart));

    // Redirect to checkout
    location.href = 'checkout.html';
  });
})();
