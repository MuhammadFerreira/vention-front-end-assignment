// logic to render flower cards and handle cart interactions
document.addEventListener('DOMContentLoaded', () => {
  const flowerContainer = document.getElementById('flower-container');
  const cart = new Set(); //Stores cart item IDs

  flowerInventory.forEach(flower => {
    // Create a card for each flower
    const flowerCard = document.createElement('article');
    flowerCard.classList.add('card');
    flowerCard.setAttribute('role', 'group');
    flowerCard.setAttribute('aria-label', `flower-title-${flower.id}`);
    flowerCard.setAttribute('tabindex', '0'); // allow keyboard navigation

    // Dynamically build star rating display
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      const ratingValue = flower.rating;
      if (i <= Math.floor(ratingValue)) {
        // Full star
        starsHtml += `<span class="star-wrapper full">
                        <img src="./assets/star.svg" class="star" alt="star" />
                      </span>`  ; 
      } else if (i - 1 < ratingValue && ratingValue < i) {
        // Half star
        starsHtml += `<span class="star-wrapper half">
                        <img src="./assets/star.svg" class="star" alt="star" />
                        <img src="./assets/star.svg" class="star fill-half" alt="half star" />
                      </span>`;
      } else {
        // Empty star
        starsHtml += `<span class="star-wrapper">
                        <img src="./assets/star.svg" class="star" alt="star" />
                      </span>`;
      }
    }

    //Card structure and contents
    flowerCard.innerHTML = `
    <div class="img-wrapper">
        <img src="${flower.image}" alt="${flower.name}" />
        <button class="toggle-cart" aria-label="${cart.has(flower.id) ? 'Remove from Cart' : 'Add to Cart'}">
          ${cart.has(flower.id) ? 'Remove from Cart' : 'Add to Cart'}
        </button>
    </div>
    <div class="cart-icon" style="display: ${cart.has(flower.id) ? 'flex' : 'none'}">In Cart</div>
    <div class="divider"></div>
    <h2 id="flower-title-${flower.id}">${flower.name}</h2>
    <p class="price">$${flower.price.toFixed(2)}</p>
    <p class="rating">${starsHtml}</p>
    `;

    //Grab DOM reference to the toggle button and cart badge
    const toggleCartButton = flowerCard.querySelector('.toggle-cart');
    const cartBadge = flowerCard.querySelector('.cart-icon');

    //Toggle item in/out of cart on click
    toggleCartButton.addEventListener('click', () => {
      if (cart.has(flower.id)) {
        cart.delete(flower.id);
        toggleCartButton.textContent = 'Add to Cart';
        cartBadge.classList.remove('visible');
        setTimeout(() => (cartBadge.style.display = "none"), 300); // Delay hides after animation
      } else {
        cart.add(flower.id);
        cartBadge.style.display = "flex";
        setTimeout(() => cartBadge.classList.add('visible'), 10); // Trigger CSS animation
        toggleCartButton.textContent = 'Remove from Cart';
        
      }

      // Refresh star states on re-render (optional but good if rating ever changes dynamically)
     flowerCard.querySelectorAll('.star').forEach((img, idx) =>
        img.classList.toggle('filled', idx < Math.round(flower.rating))
      );
    });

    //Inject completed card into the DOM
    flowerContainer.appendChild(flowerCard);
  });       
});
    
