const products = {
  vase: { name: "مزهرية هدوء", price: 480, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=88" },
  lamp: { name: "مصباح مساء", price: 920, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=88" },
  bowl: { name: "وعاء يومي", price: 360, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=88" },
  chair: { name: "كرسي نور", price: 1850, image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=88" },
  table: { name: "طاولة مَسَا", price: 2400, image: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b?auto=format&fit=crop&w=900&q=88" },
  tray: { name: "صينية رَكْن", price: 590, image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=88" },
  pendant: { name: "قنديل صُبْح", price: 640, image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=900&q=88" },
  desk: { name: "مكتب لُب", price: 3200, image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=88" },
  sofa: { name: "أريكة ورد", price: 8900, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=88" },
  armchair: { name: "كرسي سُكّن", price: 2650, image: "https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=900&q=88" },
  coffeetable: { name: "طاولة قهوة سكون", price: 1920, image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=900&q=88" },
  pillow: { name: "وسادة خِرِف", price: 385, image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=88" },
  bed: { name: "سرير هَنَا", price: 6800, image: "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=900&q=88" },
  wardrobe: { name: "دولاب ضُلّ", price: 5450, image: "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=900&q=88" },
  kitchenshelf: { name: "رف مطبخ رُمّان", price: 1350, image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=88" },
  cups: { name: "كوب صباح", price: 280, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=88" },
  board: { name: "لوح تقطيع عُسّ", price: 335, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=88" },
  soap: { name: "صابون حجر الكلس", price: 160, image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=88" },
  towel: { name: "منشفة نسيم", price: 495, image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=88" },
  candle: { name: "شمعة خريف", price: 420, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=88" },
  plant: { name: "نبتة بَهْجة", price: 320, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=88" },
  mirror: { name: "مرآة وَهْج", price: 1150, image: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=900&q=88" },
  art: { name: "لوحة مَحْدود", price: 750, image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=88" },
  rug: { name: "سجادة طِين", price: 1480, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=88" }
};
const cartKey = "forme-cart-v1";
const cartCount = document.getElementById("cart-count");
const cartDialog = document.getElementById("cart-dialog");
const cartItems = document.getElementById("cart-items");
const cartEmpty = document.getElementById("cart-empty");
const cartFooter = document.getElementById("cart-footer");
const cartTotal = document.getElementById("cart-total");
const cartItemLabel = document.getElementById("cart-item-label");
const toast = document.getElementById("toast");
const numberFormat = new Intl.NumberFormat("ar-EG");
let toastTimer;
let cart = loadCart();

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2400);
}

function loadCart() {
  let saved;
  try {
    saved = window.localStorage.getItem(cartKey);
  } catch (error) {
    showToast("التخزين غير متاح؛ السلة هتفضل شغالة خلال الزيارة دي.");
    return {};
  }
  if (!saved) return {};

  try {
    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new TypeError("Invalid cart data");
    }
    return Object.fromEntries(
      Object.entries(parsed).filter(([id, quantity]) =>
        Object.prototype.hasOwnProperty.call(products, id) &&
        Number.isInteger(quantity) && quantity > 0
      )
    );
  } catch (error) {
    showToast("تعذر استعادة السلة المحفوظة؛ ابدأ سلة جديدة.");
    return {};
  }
}

function saveCart() {
  try {
    window.localStorage.setItem(cartKey, JSON.stringify(cart));
    return true;
  } catch (error) {
    return false;
  }
}

function formatPrice(price) {
  return `${numberFormat.format(price)} ج.م`;
}

function createQuantityButton(label, text, action, productId) {
  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("aria-label", label);
  button.dataset.action = action;
  button.dataset.productId = productId;
  button.textContent = text;
  return button;
}

function createCartItem(productId, quantity) {
  const product = products[productId];
  const item = document.createElement("article");
  item.className = "cart-item";

  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.name;
  item.append(image);

  const info = document.createElement("div");
  info.className = "cart-item-info";
  const name = document.createElement("h3");
  name.textContent = product.name;
  const unitPrice = document.createElement("p");
  unitPrice.textContent = `للقطعة: ${formatPrice(product.price)}`;
  const actions = document.createElement("div");
  actions.className = "cart-item-actions";
  const quantityControl = document.createElement("div");
  quantityControl.className = "quantity-control";
  quantityControl.append(
    createQuantityButton(`تقليل كمية ${product.name}`, "−", "decrease", productId)
  );
  const quantityLabel = document.createElement("span");
  quantityLabel.textContent = numberFormat.format(quantity);
  quantityControl.append(quantityLabel);
  quantityControl.append(
    createQuantityButton(`زيادة كمية ${product.name}`, "+", "increase", productId)
  );
  const remove = createQuantityButton(`حذف ${product.name} من السلة`, "حذف", "remove", productId);
  remove.className = "remove-item";
  actions.append(quantityControl, remove);
  info.append(name, unitPrice, actions);
  item.append(info);

  const lineTotal = document.createElement("strong");
  lineTotal.className = "cart-item-price";
  lineTotal.textContent = formatPrice(product.price * quantity);
  item.append(lineTotal);
  return item;
}

function renderCart() {
  const entries = Object.entries(cart);
  const itemCount = entries.reduce((sum, [, quantity]) => sum + quantity, 0);
  const total = entries.reduce((sum, [id, quantity]) => sum + products[id].price * quantity, 0);

  cartCount.textContent = numberFormat.format(itemCount);
  cartItemLabel.textContent = `${numberFormat.format(itemCount)} ${itemCount === 1 ? "منتج" : "منتجات"}`;
  cartTotal.textContent = formatPrice(total);
  cartEmpty.hidden = itemCount > 0;
  cartFooter.hidden = itemCount === 0;
  cartItems.replaceChildren(...entries.map(([id, quantity]) => createCartItem(id, quantity)));
}

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const product = products[productId];
    if (!product) {
      showToast("المنتج ده مش متاح حاليًا.");
      return;
    }
    cart[productId] = (cart[productId] || 0) + 1;
    const saved = saveCart();
    renderCart();
    showToast(saved
      ? `اتضاف ${product.name} للسلة`
      : "اتضاف المنتج مؤقتًا؛ تعذر حفظ السلة للزيارة القادمة.");
  });
});

document.getElementById("open-cart").addEventListener("click", () => {
  renderCart();
  cartDialog.showModal();
});

document.getElementById("close-cart").addEventListener("click", () => cartDialog.close());
document.getElementById("continue-shopping").addEventListener("click", () => {
  cartDialog.close();
  document.getElementById("collection").scrollIntoView({ behavior: "smooth" });
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const { action, productId } = button.dataset;
  if (!Object.prototype.hasOwnProperty.call(products, productId) || !cart[productId]) return;

  if (action === "increase") cart[productId] += 1;
  if (action === "decrease") {
    cart[productId] -= 1;
    if (cart[productId] === 0) delete cart[productId];
  }
  if (action === "remove") delete cart[productId];

  const saved = saveCart();
  renderCart();
  if (!saved) showToast("تم تحديث السلة مؤقتًا؛ تعذر حفظها للزيارة القادمة.");
});

document.getElementById("clear-cart").addEventListener("click", () => {
  cart = {};
  const saved = saveCart();
  renderCart();
  if (!saved) showToast("تم إفراغ السلة الحالية، لكن تعذر حفظ التغيير.");
});

document.getElementById("checkout-button").addEventListener("click", () => {
  const entries = Object.entries(cart);
  if (entries.length === 0) return;

  const total = entries.reduce((sum, [id, quantity]) => sum + products[id].price * quantity, 0);
  const lines = entries.map(([id, quantity]) =>
    `- ${products[id].name} × ${numberFormat.format(quantity)} = ${formatPrice(products[id].price * quantity)}`
  );
  const message = ["أهلًا، عايز أأكد الطلب ده:", ...lines, `الإجمالي: ${formatPrice(total)}`].join("\n");
  window.location.href = `https://wa.me/201095295675?text=${encodeURIComponent(message)}`;
});

cartDialog.addEventListener("click", (event) => {
  if (event.target === cartDialog) cartDialog.close();
});

renderCart();
