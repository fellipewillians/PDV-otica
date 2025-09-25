// Dados dos produtos
const products = {
    grau: [
        {
            id: 1,
            name: "Óculos Ray-Ban Classic",
            description: "Armação clássica em acetato",
            price: 299.90,
            image: "fas fa-glasses"
        },
        {
            id: 2,
            name: "Óculos Oakley Sport",
            description: "Armação esportiva resistente",
            price: 459.90,
            image: "fas fa-glasses"
        },
        {
            id: 3,
            name: "Óculos Vintage Redondo",
            description: "Estilo vintage moderno",
            price: 189.90,
            image: "fas fa-glasses"
        },
        {
            id: 4,
            name: "Óculos Executivo",
            description: "Elegante para uso profissional",
            price: 349.90,
            image: "fas fa-glasses"
        },
        {
            id: 5,
            name: "Óculos Feminino Delicado",
            description: "Design delicado e elegante",
            price: 279.90,
            image: "fas fa-glasses"
        }
    ],
    sol: [
        {
            id: 6,
            name: "Ray-Ban Aviador",
            description: "Clássico aviador dourado",
            price: 399.90,
            image: "fas fa-sun"
        },
        {
            id: 7,
            name: "Oakley Holbrook",
            description: "Estilo urbano moderno",
            price: 529.90,
            image: "fas fa-sun"
        },
        {
            id: 8,
            name: "Wayfarer Classic",
            description: "Icônico design atemporal",
            price: 329.90,
            image: "fas fa-sun"
        },
        {
            id: 9,
            name: "Óculos Esportivo",
            description: "Proteção UV total",
            price: 249.90,
            image: "fas fa-sun"
        }
    ],
    lentes: [
        {
            id: 10,
            name: "Lente Antirreflexo",
            description: "Reduz reflexos e clarões",
            price: 149.90,
            image: "fas fa-eye"
        },
        {
            id: 11,
            name: "Lente Transitions",
            description: "Escurece automaticamente",
            price: 299.90,
            image: "fas fa-eye"
        },
        {
            id: 12,
            name: "Lente Blue Light",
            description: "Proteção contra luz azul",
            price: 199.90,
            image: "fas fa-eye"
        },
        {
            id: 13,
            name: "Lente Multifocal",
            description: "Para longe e perto",
            price: 399.90,
            image: "fas fa-eye"
        }
    ],
    servicos: [
        {
            id: 14,
            name: "Ajuste de Armação",
            description: "Ajuste profissional",
            price: 25.00,
            image: "fas fa-tools"
        },
        {
            id: 15,
            name: "Troca de Lentes",
            description: "Substituição completa",
            price: 89.90,
            image: "fas fa-tools"
        },
        {
            id: 16,
            name: "Limpeza Profissional",
            description: "Limpeza ultrassônica",
            price: 15.00,
            image: "fas fa-tools"
        },
        {
            id: 17,
            name: "Conserto de Armação",
            description: "Reparo de quebras",
            price: 45.00,
            image: "fas fa-tools"
        }
    ]
};

// Estado da aplicação
let currentCategory = 'grau';
let cart = [];
let cartTotal = 0;
let currentSale = null;

// Elementos DOM
const categoryButtons = document.querySelectorAll('.category-btn');
const productsGrid = document.getElementById('productsGrid');
const cartItems = document.getElementById('cartItems');
const cartCount = document.querySelector('.cart-count');
const subtotalEl = document.getElementById('subtotal');
const discountEl = document.getElementById('discount');
const totalEl = document.getElementById('total');
const searchInput = document.getElementById('searchInput');

// Modais
const customerModal = document.getElementById('customerModal');
const successModal = document.getElementById('successModal');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Sistema PDV Ótica carregado!');
    
    loadProducts(currentCategory);
    updateCartDisplay();
    loadSalesHistory();
    
    // Categorias
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            switchCategory(category);
        });
    });
    
    // Busca
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterProducts(searchTerm);
    });
    
    // Carrinho
    document.getElementById('clearCart').addEventListener('click', clearCart);
    document.getElementById('checkout').addEventListener('click', openCheckout);
    
    // Modal cliente
    document.getElementById('cancelCheckout').addEventListener('click', closeCustomerModal);
    document.getElementById('confirmSale').addEventListener('click', confirmSale);
    document.querySelector('.close-modal').addEventListener('click', closeCustomerModal);
    
    // Modal sucesso
    document.getElementById('printReceipt').addEventListener('click', printReceipt);
    document.getElementById('newSale').addEventListener('click', newSale);
    
    // Fechar modal clicando fora
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
});

// Funções principais
function switchCategory(category) {
    currentCategory = category;
    
    // Atualizar botões
    categoryButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    // Carregar produtos
    loadProducts(category);
}

function loadProducts(category) {
    const categoryProducts = products[category] || [];
    
    productsGrid.innerHTML = '';
    
    if (categoryProducts.length === 0) {
        productsGrid.innerHTML = '<p class="empty-products">Nenhum produto encontrado nesta categoria.</p>';
        return;
    }
    
    categoryProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Animação
    productsGrid.classList.add('fade-in');
    setTimeout(() => {
        productsGrid.classList.remove('fade-in');
    }, 300);
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">
            <i class="${product.image}"></i>
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-plus"></i> Adicionar
            </button>
        </div>
    `;
    
    return card;
}

function addToCart(productId) {
    // Encontrar produto
    let product = null;
    for (const category in products) {
        product = products[category].find(p => p.id === productId);
        if (product) break;
    }
    
    if (!product) return;
    
    // Verificar se já existe no carrinho
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    
    // Feedback visual
    const button = event.target.closest('.add-to-cart');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
    button.classList.add('success-feedback');
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('success-feedback');
    }, 1500);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
        }
    }
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Carrinho vazio</p>';
        cartCount.textContent = '0 itens';
        subtotalEl.textContent = 'R$ 0,00';
        totalEl.textContent = 'R$ 0,00';
        cartTotal = 0;
        return;
    }
    
    // Atualizar itens
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    let totalItems = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        totalItems += item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>R$ ${item.price.toFixed(2).replace('.', ',')}</p>
            </div>
            <div class="item-controls">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="item-qty">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">
                    <i class="fas fa-plus"></i>
                </button>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Atualizar totais
    cartCount.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'itens'}`;
    subtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    totalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    cartTotal = subtotal;
}

function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('Deseja limpar o carrinho?')) {
        cart = [];
        updateCartDisplay();
    }
}

function filterProducts(searchTerm) {
    if (!searchTerm) {
        loadProducts(currentCategory);
        return;
    }
    
    const categoryProducts = products[currentCategory] || [];
    const filteredProducts = categoryProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p class="empty-products">Nenhum produto encontrado para esta busca.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function openCheckout() {
    if (cart.length === 0) {
        alert('Carrinho vazio!');
        return;
    }
    
    customerModal.classList.add('active');
    document.getElementById('customerName').focus();
}

function closeCustomerModal() {
    customerModal.classList.remove('active');
    document.getElementById('customerForm').reset();
}

async function confirmSale() {
    const form = document.getElementById('customerForm');
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const payment = document.getElementById('paymentMethod').value;
    
    // Validar campos obrigatórios
    if (!name || !phone || !payment) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }
    
    // Validar telefone (formato básico)
    if (phone.length < 10) {
        alert('Telefone deve ter pelo menos 10 dígitos!');
        return;
    }
    
    const confirmBtn = document.getElementById('confirmSale');
    const originalText = confirmBtn.innerHTML;
    confirmBtn.innerHTML = '<div class="loading"></div> Processando...';
    confirmBtn.disabled = true;
    
    try {
        // Simular processamento da venda
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Criar dados da venda
        currentSale = {
            id: generateReceiptNumber(),
            customer: { name, phone, email },
            items: [...cart],
            subtotal: cartTotal,
            discount: 0,
            total: cartTotal,
            paymentMethod: payment,
            timestamp: new Date(),
            seller: 'João Silva'
        };
        
        // Salvar venda
        saveSale(currentSale);
        
        // Fechar modal cliente
        closeCustomerModal();
        
        // Mostrar modal sucesso
        document.getElementById('saleTotal').textContent = formatCurrency(cartTotal);
        successModal.classList.add('active');
        
        // Imprimir automaticamente após 1 segundo
        setTimeout(() => {
            printReceipt();
        }, 1000);
        
    } catch (error) {
        alert('Erro ao processar venda: ' + error.message);
    } finally {
        confirmBtn.innerHTML = originalText;
        confirmBtn.disabled = false;
    }
}

function printReceipt() {
    if (!currentSale) {
        alert('Nenhuma venda para imprimir!');
        return;
    }
    
    try {
        // Preencher dados do cupom
        fillReceiptData(currentSale);
        
        // Mostrar template para impressão
        const receiptTemplate = document.getElementById('receiptTemplate');
        receiptTemplate.style.display = 'block';
        receiptTemplate.style.position = 'static';
        receiptTemplate.style.left = 'auto';
        receiptTemplate.style.top = 'auto';
        
        // Aguardar um momento para renderizar
        setTimeout(() => {
            // Imprimir
            window.print();
            
            // Esconder template novamente
            receiptTemplate.style.display = 'none';
            receiptTemplate.style.position = 'absolute';
            receiptTemplate.style.left = '-9999px';
            receiptTemplate.style.top = '-9999px';
        }, 100);
        
    } catch (error) {
        console.error('Erro na impressão:', error);
        alert('Erro ao imprimir cupom. Tente novamente.');
    }
}

function fillReceiptData(saleData) {
    const now = saleData.timestamp;
    
    // Data e hora
    document.getElementById('receiptDate').textContent = now.toLocaleDateString('pt-BR');
    document.getElementById('receiptTime').textContent = now.toLocaleTimeString('pt-BR');
    
    // Dados da venda
    document.getElementById('receiptSeller').textContent = saleData.seller;
    document.getElementById('receiptCustomer').textContent = saleData.customer.name;
    document.getElementById('receiptCustomerPhone').textContent = saleData.customer.phone;
    document.getElementById('receiptNumber').textContent = saleData.id;
    document.getElementById('receiptTimestamp').textContent = now.toLocaleString('pt-BR');
    
    // Forma de pagamento
    const paymentText = {
        'dinheiro': 'Dinheiro',
        'cartao': 'Cartão',
        'pix': 'PIX'
    };
    document.getElementById('receiptPayment').textContent = paymentText[saleData.paymentMethod] || saleData.paymentMethod;
    
    // Itens
    const itemsList = document.getElementById('receiptItemsList');
    itemsList.innerHTML = '';
    
    saleData.items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name}</td>
            <td>${item.quantity}</td>
            <td>R$ ${item.price.toFixed(2).replace('.', ',')}</td>
            <td>R$ ${itemTotal.toFixed(2).replace('.', ',')}</td>
        `;
        itemsList.appendChild(row);
    });
    
    // Totais
    document.getElementById('receiptSubtotal').textContent = saleData.subtotal.toFixed(2).replace('.', ',');
    document.getElementById('receiptDiscount').textContent = saleData.discount.toFixed(2).replace('.', ',');
    document.getElementById('receiptTotal').textContent = saleData.total.toFixed(2).replace('.', ',');
}

function newSale() {
    // Limpar carrinho e fechar modal
    cart = [];
    currentSale = null;
    updateCartDisplay();
    successModal.classList.remove('active');
    
    // Voltar para primeira categoria
    switchCategory('grau');
    
    // Limpar busca
    searchInput.value = '';
}

function saveSale(saleData) {
    try {
        const sales = JSON.parse(localStorage.getItem('sales') || '[]');
        sales.push({
            ...saleData,
            timestamp: saleData.timestamp.toISOString()
        });
        localStorage.setItem('sales', JSON.stringify(sales));
        console.log('Venda salva:', saleData.id);
    } catch (error) {
        console.error('Erro ao salvar venda:', error);
    }
}

function loadSalesHistory() {
    try {
        const sales = JSON.parse(localStorage.getItem('sales') || '[]');
        console.log(`Histórico carregado: ${sales.length} vendas`);
        return sales;
    } catch (error) {
        console.error('Erro ao carregar histórico:', error);
        return [];
    }
}

function generateReceiptNumber() {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const time = now.getTime().toString().slice(-6);
    return `${year}${month}${day}${time}`;
}

function formatCurrency(value) {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

// Atalhos de teclado
document.addEventListener('keydown', function(e) {
    // ESC para fechar modais
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
    
    // F1 para limpar carrinho
    if (e.key === 'F1') {
        e.preventDefault();
        clearCart();
    }
    
    // F2 para finalizar venda
    if (e.key === 'F2') {
        e.preventDefault();
        openCheckout();
    }
    
    // F3 para imprimir último cupom
    if (e.key === 'F3') {
        e.preventDefault();
        if (currentSale) {
            printReceipt();
        }
    }
    
    // Enter no campo de busca
    if (e.key === 'Enter' && e.target === searchInput) {
        e.preventDefault();
        // Busca já é feita em tempo real
    }
});

// Funções utilitárias adicionais
function getTodaySales() {
    const sales = loadSalesHistory();
    const today = new Date().toDateString();
    
    return sales.filter(sale => {
        const saleDate = new Date(sale.timestamp).toDateString();
        return saleDate === today;
    });
}

function getTotalSalesToday() {
    const todaySales = getTodaySales();
    return todaySales.reduce((total, sale) => total + sale.total, 0);
}

function getTopProducts() {
    const sales = loadSalesHistory();
    const productCount = {};
    
    sales.forEach(sale => {
        sale.items.forEach(item => {
            productCount[item.name] = (productCount[item.name] || 0) + item.quantity;
        });
    });
    
    return Object.entries(productCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);
}

// Log de inicialização
console.log('🚀 Sistema PDV Ótica carregado com sucesso!');
console.log('📊 Atalhos disponíveis:');
console.log('   ESC - Fechar modais');
console.log('   F1 - Limpar carrinho');
console.log('   F2 - Finalizar venda');
console.log('   F3 - Reimprimir último cupom');

// Verificar se há vendas do dia
setTimeout(() => {
    const todayTotal = getTotalSalesToday();
    const todayCount = getTodaySales().length;
    
    if (todayCount > 0) {
        console.log(`💰 Vendas hoje: ${todayCount} vendas - Total: ${formatCurrency(todayTotal)}`);
    }
}, 1000);