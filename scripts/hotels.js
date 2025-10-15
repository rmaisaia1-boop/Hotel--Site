(function () {
  var root = document.getElementById('hotelList');
  if (!root) return;
  var hotels = [
    { title: 'Hotel Paradise Bravo', image: '/Hotel-1.webp', price: 220, rating: 4.8, location: 'ბათუმი' },
    { title: 'Hotel Monblan', image: '/Hotel-4.jpg', price: 180, rating: 4.7, location: 'გუდაური' },
    { title: 'Hotel Paradise India', image: '/Hotel-3.webp', price: 260, rating: 4.9, location: 'თბილისი' },
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



