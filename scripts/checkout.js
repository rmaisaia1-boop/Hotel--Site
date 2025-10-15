(function () {
  var root = document.getElementById('checkoutRoot');
  if (!root) return;

  var cart = [];
  try { cart = JSON.parse(sessionStorage.getItem('cart') || '[]'); } catch (_) { cart = []; }

  function format(n) { return '₾ ' + Number(n || 0).toFixed(2); }

  if (cart.length === 0) {
    root.innerHTML = '<p>თქვენი კალათა ცარიელია 😢 <a href="Hotel.html">დაიწყე არჩევა</a></p>';
    return;
  }

  var total = cart.reduce((sum, h) => sum + h.total, 0);

  root.innerHTML = `
    <section class="checkout-card">
      <h2>ჩეკაუტი</h2>
      ${cart.map(h => `
        <div class="cart-item" style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <img src="${h.image}" alt="${h.title}" style="width:80px;height:60px;object-fit:cover;border-radius:8px;">
          <div>
            <div><b>${h.title}</b></div>
            <div>${h.nights} ღამე × ${format(h.pricePerNight)}</div>
            <div>სულ: <b>${format(h.total)}</b></div>
          </div>
          <button class="remove-btn btn" data-title="${h.title}" style="margin-left:auto;">წაშლა</button>
        </div>
      `).join('')}
      <hr>
      <div class="summary">სულ გადასახდელი თანხა: <b id="amount">${format(total)}</b></div>

      <div class="summary"><b>აირჩიეთ გადახდის მეთოდი:</b></div>
      <div style="display:flex; gap:10px;">
        <button id="applePayBtn" class="btn" type="button"> Apple Pay</button>
        <button id="cardTab" class="btn" type="button">ბარათი</button>
      </div>

      <form class="checkout-form" id="payForm" style="margin-top:6px;">
        <input type="text" required placeholder="სახელი და გვარი">
        <input type="email" required placeholder="ელ.ფოსტა">
        <input type="tel" required placeholder="ტელ. ნომერი">
        <input id="cardNumber" type="text" inputmode="numeric" placeholder="ბარათის ნომერი (#### #### #### ####)">
        <div style="display:flex; gap:10px;">
          <input id="exp" type="text" inputmode="numeric" placeholder="MM/YY" style="flex:1;">
          <input id="cvc" type="password" inputmode="numeric" placeholder="CVC" style="flex:1;">
        </div>
        <button type="submit" class="btn">გადახდა ბარათით</button>
      </form>
      <a href="Hotel.html">უკან სასტუმროებში</a>
    </section>
  `;

  // Remove button logic
  root.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      var title = this.dataset.title;
      cart = cart.filter(h => h.title !== title);
      sessionStorage.setItem('cart', JSON.stringify(cart));
      location.reload();
    });
  });

  document.getElementById('applePayBtn').addEventListener('click', function () {
    alert('Apple Pay (სიმულაცია): გადახდა დადასტურებულია \nსულ თანხა: ' + format(total));
    sessionStorage.removeItem('cart');
    location.href = 'index.html';
  });

  document.getElementById('payForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('ბარათით გადახდა წარმატებულია! \nსულ თანხა: ' + format(total));
    sessionStorage.removeItem('cart');
    location.href = 'index.html';
  });
})();
