document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            id: 'beyond-burger',
            name: 'Beyond Burger Patties',
            brand: 'Beyond Meat',
            description: 'Juicy, plant-based burger patties that sizzle and satisfy. Made from peas, they deliver the meaty experience you crave.',
            image: 'assets/images/product-beyond-burger.jpg',
            type: 'plant-based',
            price: '₹399.00',
            retailer: 'Amazon.in',
            link: 'https://www.amazon.in/s?k=beyond+meat'
        },
        {
            id: 'imagine-seekh',
            name: 'Imagine Meats Seekh Kebab',
            brand: 'Imagine Meats',
            description: 'Flavorful plant-based seekh kebabs, perfect for grilling or pan-frying. A delicious Indian twist on alternative protein.',
            image: 'assets/images/product-imagine-kebab.jpg',
            type: 'plant-based',
            price: '₹249.00',
            retailer: 'BigBasket',
            link: 'https://www.bigbasket.com/ps/v2/bb-search/?search_term=imagine%20meats'
        },
        {
            id: 'gooddot-vegicken',
            name: 'GoodDot Vegicken Curry Cut',
            brand: 'GoodDot',
            description: 'Versatile plant-based chicken alternative, ready to absorb your favorite curry flavors. High in protein.',
            image: 'assets/images/product-gooddot-curry.jpg',
            type: 'plant-based',
            price: '₹180.00',
            retailer: 'Amazon.in',
            link: 'https://www.amazon.in/s?k=gooddot'
        },
        {
            id: 'blue-tribe-nuggets',
            name: 'Blue Tribe Chicken Nuggets',
            brand: 'Blue Tribe',
            description: 'Crispy and delicious plant-based chicken nuggets. A perfect snack or addition to any meal.',
            image: 'assets/images/product-blue-tribe-nuggets.jpg',
            type: 'plant-based',
            price: '₹299.00',
            retailer: 'BigBasket',
            link: 'https://www.bigbasket.com/ps/v2/bb-search/?search_term=blue%20tribe'
        },
        {
            id: 'cultured-chicken',
            name: 'Cultured Chicken (Sample)',
            brand: 'Future Foods',
            description: 'Future Foods is pioneering real chicken grown directly from cells. Expected to be available soon!',
            image: 'assets/images/product-cultured-chicken.jpg',
            type: 'cultured-meat',
            price: 'TBD',
            retailer: 'Coming Soon',
            link: '#'
        },
        {
            id: 'beyond-sausage',
            name: 'Beyond Sausage Brat',
            brand: 'Beyond Meat',
            description: 'Grill-ready plant-based sausages with a savory, juicy flavor. Great for breakfast or dinner.',
            image: 'assets/images/product-beyond-sausage.jpg',
            type: 'plant-based',
            price: '₹449.00',
            retailer: 'Amazon.in',
            link: 'https://www.amazon.in/s?k=beyond+meat'
        }
    ];
    const productGrid = document.getElementById('product-grid');
    const filterButtons = document.querySelectorAll('.filter-button');
    function createProductCard(product) {
        const card = document.createElement('div');
        card.classList.add('innovator-card', 'product-card'); // Reusing innovator-card styling
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
        productGrid.innerHTML = ''; // Clear current products
        const filteredProducts = products.filter(product => {
            return filter === 'all' || product.type === filter;
        });
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
    // Initial display of all products
    displayProducts('all');
    // Script for scroll animations - moved from HTML
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => {
        observer.observe(section);
    });
});
