(function () {
  var root = document.getElementById('hotelList');
  if (!root) return;
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


  function toQuery(obj) {
    var p = new URLSearchParams();
    Object.keys(obj).forEach(function (k) { p.set(k, obj[k]); });
    return p.toString();
  }

  root.innerHTML = hotels.map(function (h) {
    var q = toQuery({ title: h.title, price: h.price, image: h.image });
    return (
      '<article class="hotel-card">' +
      '  <img src="' + h.image + '" alt="' + h.title + '">' +
      '  <div class="content">' +
      '    <h3>' + h.title + '</h3>' +
      '    <div class="meta">⭐ ' + h.rating + ' · ' + h.location + '</div>' +
      '    <div class="price">₾ ' + h.price + ' / ღამე</div>' +
      '    <div><a class="btn" href="Hotel-Details.html?' + q + '">დეტალურად</a></div>' +
      '  </div>' +
      '</article>'
    );
  }).join('');
})();



