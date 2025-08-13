
        // Enhanced product data with urgency levels
        const products = [
            // Fresh Produce
            {name: "Organic Apples (1kg)", category: "Fresh Produce", price: 50, oldPrice: 80, urgent: false, stock: 15},
            {name: "Ripe Bananas (1 Dozen)", category: "Fresh Produce", price: 40, oldPrice: 60, urgent: true, stock: 8},
            {name: "Fresh Tomatoes (1kg)", category: "Fresh Produce", price: 30, oldPrice: 50, urgent: false, stock: 12},
            {name: "Coriander Bunch", category: "Fresh Produce", price: 15, oldPrice: 25, urgent: true, stock: 5},

            // Dairy
            {name: "Organic Milk (1L)", category: "Dairy", price: 35, oldPrice: 50, expiry: "2025-08-20", urgent: true, stock: 6},
            {name: "Artisan Cheddar (200g)", category: "Dairy", price: 120, oldPrice: 160, expiry: "2025-08-22", urgent: false, stock: 10},
            {name: "Greek Yogurt (100g)", category: "Dairy", price: 20, oldPrice: 30, expiry: "2025-08-18", urgent: true, stock: 4},
            {name: "Premium Butter (500g)", category: "Dairy", price: 200, oldPrice: 250, expiry: "2025-08-25", urgent: false, stock: 8},

            // Bakery
            {name: "Artisan Whole Wheat Bread", category: "Bakery", price: 25, oldPrice: 40, expiry: "2025-08-14", urgent: true, stock: 3},
            {name: "Belgian Chocolate Muffin", category: "Bakery", price: 30, oldPrice: 45, expiry: "2025-08-14", urgent: true, stock: 7},
            {name: "French Croissant", category: "Bakery", price: 35, oldPrice: 50, expiry: "2025-08-14", urgent: true, stock: 5},
            {name: "Herbed Garlic Bread", category: "Bakery", price: 40, oldPrice: 60, expiry: "2025-08-15", urgent: false, stock: 9},

            // Packaged Goods
            {name: "Premium Basmati Rice (1kg)", category: "Packaged Goods", price: 90, oldPrice: 120, expiry: "2026-02-10", urgent: false, stock: 20},
            {name: "Italian Pasta (500g)", category: "Packaged Goods", price: 50, oldPrice: 70, expiry: "2026-03-15", urgent: false, stock: 15},
            {name: "Gourmet Potato Chips", category: "Packaged Goods", price: 20, oldPrice: 30, expiry: "2025-12-05", urgent: false, stock: 25},
            {name: "Instant Ramen Noodles", category: "Packaged Goods", price: 15, oldPrice: 25, expiry: "2026-01-20", urgent: false, stock: 30},

            // Frozen Foods
            {name: "Free-Range Chicken (1kg)", category: "Frozen Foods", price: 250, oldPrice: 300, expiry: "2026-06-10", urgent: false, stock: 12},
            {name: "Artisan Ice Cream Tub", category: "Frozen Foods", price: 150, oldPrice: 200, expiry: "2026-05-01", urgent: false, stock: 8},
            {name: "Organic Frozen Peas (500g)", category: "Frozen Foods", price: 60, oldPrice: 80, expiry: "2026-04-15", urgent: false, stock: 18},
            {name: "Stone-Baked Pizza", category: "Frozen Foods", price: 120, oldPrice: 150, expiry: "2026-02-28", urgent: false, stock: 10},

            // Beverages
            {name: "Fresh Orange Juice (1L)", category: "Beverages", price: 80, oldPrice: 100, expiry: "2025-09-15", urgent: false, stock: 14},
            {name: "Craft Soft Drink (500ml)", category: "Beverages", price: 35, oldPrice: 50, expiry: "2025-12-10", urgent: false, stock: 22},
            {name: "Premium Water (1L)", category: "Beverages", price: 20, oldPrice: 25, expiry: "2026-01-01", urgent: false, stock: 50},
            {name: "Organic Green Tea", category: "Beverages", price: 120, oldPrice: 150, expiry: "2026-04-15", urgent: false, stock: 16},

            // Cleaning & Non-food
            {name: "Eco Laundry Detergent (1kg)", category: "Cleaning & Non-food", price: 150, oldPrice: 180, expiry: "2027-01-01", urgent: false, stock: 25},
            {name: "Plant-Based Dish Soap (500ml)", category: "Cleaning & Non-food", price: 50, oldPrice: 70, expiry: "2026-08-01", urgent: false, stock: 30},
            {name: "Natural Bath Soap (100g)", category: "Cleaning & Non-food", price: 25, oldPrice: 35, expiry: "2027-06-01", urgent: false, stock: 40},
            {name: "Eco Floor Cleaner (1L)", category: "Cleaning & Non-food", price: 90, oldPrice: 120, expiry: "2026-12-01", urgent: false, stock: 20}
        ];

        // State management
        let cart = [];
        let currentFilter = 'all';
        let searchTerm = '';
        let quantities = {};

        // Initialize quantities
        products.forEach((_, index) => {
            quantities[index] = 1;
        });

        // DOM elements
        const productGrid = document.getElementById('productGrid');
        const searchInput = document.getElementById('searchInput');
        const filters = document.querySelectorAll('.filter-btn');
        const cartCount = document.getElementById('cartCount');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const totalSavings = document.getElementById('totalSavings');

        // Create animated particles
        function createParticles() {
            const container = document.getElementById('particles');
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (10 + Math.random() * 10) + 's';
                container.appendChild(particle);
            }
        }

        // Calculate discount percentage
        function calculateDiscount(price, oldPrice) {
            return Math.round(((oldPrice - price) / oldPrice) * 100);
        }

        // Get urgency level for expiry dates
        function getUrgencyLevel(expiry) {
            if (!expiry) return null;
            const today = new Date();
            const expiryDate = new Date(expiry);
            const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
            
            if (daysUntilExpiry <= 1) return 'critical';
            if (daysUntilExpiry <= 3) return 'urgent';
            if (daysUntilExpiry <= 7) return 'moderate';
            return 'normal';
        }

        // Format date for display
        function formatDate(dateString) {
            const options = { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            };
            return new Date(dateString).toLocaleDateString('en-IN', options);
        }

        // Render products
        function renderProducts() {
            const filteredProducts = products.filter(product => {
                const matchesFilter = currentFilter === 'all' || product.category === currentFilter;
                const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
                return matchesFilter && matchesSearch;
            });

            productGrid.innerHTML = '';

            if (filteredProducts.length === 0) {
                productGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--gray-600);">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
                        <h3>No products found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                `;
                return;
            }

            filteredProducts.forEach((product, index) => {
                const realIndex = products.indexOf(product);
                const discount = calculateDiscount(product.price, product.oldPrice);
                const urgencyLevel = getUrgencyLevel(product.expiry);
                
                const productCard = document.createElement('div');
                productCard.className = 'product';
                productCard.innerHTML = `
                    <div class="product-header">
                        <div class="category-badge">${product.category}</div>
                        ${product.urgent ? '<div class="urgency-badge">🔥 Limited Time</div>' : ''}
                    </div>
                    
                    <h3 class="product-title">${product.name}</h3>
                    
                    <div class="price-section">
                        <span class="current-price">₹${product.price}</span>
                        <span class="original-price">₹${product.oldPrice}</span>
                        <div class="discount-badge">${discount}% OFF</div>
                    </div>
                    
                    ${product.expiry ? `
                        <div class="expiry-info">
                            <div class="expiry-label">Best Before</div>
                            <div class="expiry-date">${formatDate(product.expiry)}</div>
                        </div>
                    ` : ''}
                    
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity(${realIndex}, -1)">-</button>
                        <span class="qty-display" id="qty-${realIndex}">${quantities[realIndex]}</span>
                        <button class="qty-btn" onclick="updateQuantity(${realIndex}, 1)">+</button>
                    </div>
                    
                    <button class="add-to-cart" onclick="addToCart(${realIndex})">
                        <span>Add to Cart - ₹${product.price * quantities[realIndex]}</span>
                    </button>
                    
                    ${product.stock < 10 ? `
                        <div style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--danger); font-weight: 500;">
                            ⚠️ Only ${product.stock} left in stock!
                        </div>
                    ` : ''}
                `;
                
                productGrid.appendChild(productCard);
            });
        }

        // Update quantity
        function updateQuantity(index, change) {
            const newQuantity = quantities[index] + change;
            if (newQuantity >= 1 && newQuantity <= 10) {
                quantities[index] = newQuantity;
                const qtyDisplay = document.getElementById(`qty-${index}`);
                if (qtyDisplay) {
                    qtyDisplay.textContent = newQuantity;
                    // Update the cart button price
                    const product = products[index];
                    const addToCartBtn = qtyDisplay.parentNode.nextElementSibling;
                    addToCartBtn.querySelector('span').textContent = `Add to Cart - ₹${product.price * newQuantity}`;
                }
            }
        }

        // Add to cart
        function addToCart(index) {
            const product = products[index];
            const quantity = quantities[index];
            
            const existingItem = cart.find(item => item.name === product.name);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    ...product,
                    quantity: quantity,
                    savings: (product.oldPrice - product.price) * quantity
                });
            }
            
            updateCartDisplay();
            
            // Visual feedback
            const button = document.querySelector(`#qty-${index}`).parentNode.nextElementSibling;
            const originalText = button.querySelector('span').textContent;
            button.querySelector('span').textContent = '✓ Added!';
            button.classList.add('added');
            
            setTimeout(() => {
                button.querySelector('span').textContent = originalText;
                button.classList.remove('added');
            }, 1500);
        }

        // Update cart display
        function updateCartDisplay() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const totalSavingsAmount = cart.reduce((sum, item) => sum + item.savings, 0);
            
            cartCount.textContent = totalItems;
            cartItems.textContent = totalItems;
            cartTotal.textContent = totalPrice;
            totalSavings.textContent = totalSavingsAmount;
        }

        // Filter functionality
        function setupFilters() {
            filters.forEach(button => {
                button.addEventListener('click', () => {
                    // Update active button
                    filters.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Update current filter
                    currentFilter = button.dataset.category;
                    renderProducts();
                });
            });
        }

        // Search functionality
        function setupSearch() {
            searchInput.addEventListener('input', (e) => {
                searchTerm = e.target.value;
                renderProducts();
            });
        }

        // Initialize the app
        function init() {
            createParticles();
            setupFilters();
            setupSearch();
            renderProducts();
            
            // Animate stats on load
            setTimeout(() => {
                animateStats();
            }, 1000);
        }

        // Make functions global for onclick handlers
        window.updateQuantity = updateQuantity;
        window.addToCart = addToCart;

        // Animate statistics
        function animateStats() {
            const stats = [
                { element: document.getElementById('totalSaved'), target: 12450, prefix: '₹' },
                { element: document.getElementById('itemsSaved'), target: 2847, prefix: '' },
                { element: document.getElementById('co2Saved'), target: 156, prefix: '', suffix: 'kg' }
            ];

            stats.forEach(stat => {
                animateNumber(stat.element, 0, stat.target, 2000, stat.prefix, stat.suffix);
            });
        }

        // Number animation
        function animateNumber(element, start, end, duration, prefix = '', suffix = '') {
            const startTime = performance.now();
            
            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const current = Math.floor(start + (end - start) * progress);
                
                element.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            
            requestAnimationFrame(update);
        }

        // Start the application
        init();