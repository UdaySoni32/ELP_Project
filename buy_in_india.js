document.addEventListener('DOMContentLoaded', () => {
    // Moved products data to products.json
    let products = []; // Will be populated from JSON

    const productGrid = document.getElementById('product-grid');
    const filterButtons = document.querySelectorAll('.filter-button');
    const marketplaceSection = document.getElementById('marketplace'); // For error display

    function createProductCard(product) {
        const card = document.createElement('div');
        card.classList.add('innovator-card', 'product-card');

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="innovator-img">
            <h3>${product.name}</h3>
            <p class="brand">${product.brand}</p>
            <p class="product-description">${product.description}</p>
            <div class="price">${product.price !== 'TBD' ? `Price: <span>${product.price}</span>` : 'Price: Coming Soon'}</div>
            <a href="${product.link}" class="cta-button" target="_blank" ${product.retailer === 'Coming Soon' ? 'style="pointer-events: none; opacity: 0.6;"' : ''}>
                ${product.retailer === 'Coming Soon' ? 'Notify Me' : `Buy on ${product.retailer}`}
            </a>
        `;
        return card;
    }

    function displayProducts(filter = 'all') {
        productGrid.innerHTML = '';
        const filteredProducts = products.filter(product => {
            return filter === 'all' || product.type === filter;
        });

        const productCountElement = document.getElementById('product-count');
        if (productCountElement) {
            productCountElement.textContent = `Showing ${filteredProducts.length} of ${products.length} products.`;
        }

        if (filteredProducts.length === 0) {
            productGrid.innerHTML = '<p>No products found for this category.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            productGrid.appendChild(createProductCard(product));
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            displayProducts(event.target.dataset.filter);
        });
    });

    // Fetch products from JSON
    fetch('./products.json')
        .then(response => response.json())
        .then(data => {
            products = data; // Assign fetched data to products array
            displayProducts('all'); // Initial display of all products once data is loaded
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            if (marketplaceSection) {
                marketplaceSection.innerHTML = `
                    <h2>Oops! Something went wrong.</h2>
                    <p>We couldn't load the product list. Please try again later.</p>
                    <p style="font-size: 0.8em; color: #666;">Error: ${error.message}</p>
                `;
            }
        });

});
