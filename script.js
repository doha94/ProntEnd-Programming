// 메뉴 데이터: 메뉴 이름, 가격, 설명, 이미지 경로
const menuData = [
    { category: "drink", name: "아메리카노", price: 4000, description: "진한 에스프레소와 물의 조화", image: "americano.jpg" },
    { category: "drink", name: "카페라떼", price: 4500, description: "부드러운 우유와 에스프레소", image: "latte.jpg" },
    { category: "food", name: "샌드위치", price: 5500, description: "신선한 야채와 고기의 조합", image: "sandwich.jpg" },
    { category: "food", name: "베이글", price: 3000, description: "촉촉한 베이글과 크림치즈", image: "bagel.jpg" }
];

// HTML 요소 가져오기
const menuArea = document.getElementById("menu-area");
const descriptionArea = document.getElementById("description");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const adminBtn = document.getElementById("admin-btn");
const loginModal = document.getElementById("login-modal");
const loginButton = document.getElementById("login-button");
const passwordInput = document.getElementById("password-input");

// 장바구니 데이터 저장
const cart = {};

// 메뉴 렌더링 함수
function renderMenu(category) {
    menuArea.innerHTML = ""; // 기존 메뉴 초기화
    const filteredMenu = category === "all" ? menuData : menuData.filter(item => item.category === category);

    // 각 메뉴 아이템 생성
    filteredMenu.forEach((item, index) => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.setAttribute("draggable", "true");
        menuItem.dataset.index = index;
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>₩${item.price}</p>
        `;
        menuItem.addEventListener("click", () => {
            descriptionArea.textContent = item.description;
        });
        menuItem.addEventListener("dragstart", drag);
        menuArea.appendChild(menuItem);
    });
}

// 드래그 시작
function drag(event) {
    event.dataTransfer.setData("text", event.target.dataset.index);
}

// 드래그 허용
function allowDrop(event) {
    event.preventDefault();
}

// 드래그 후 장바구니에 추가
function drop(event) {
    event.preventDefault();
    const index = event.dataTransfer.getData("text");
    const menuItem = menuData[index];
    addToCart(menuItem);
}

// 장바구니 추가 함수
function addToCart(menuItem) {
    if (cart[menuItem.name]) {
        cart[menuItem.name].quantity++;
    } else {
        cart[menuItem.name] = { ...menuItem, quantity: 1 };
    }
    renderCart();
}

// 장바구니 렌더링
function renderCart() {
    cartItems.innerHTML = ""; // 기존 장바구니 초기화
    let total = 0;
    for (const key in cart) {
        const item = cart[key];
        const cartItem = document.createElement("div");
        cartItem.textContent = `${item.name} x${item.quantity} - ₩${item.price * item.quantity}`;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    }
    totalPrice.textContent = total;
}

// 초기 메뉴 렌더링
renderMenu("all");

// 카테고리 버튼 클릭 이벤트
document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => renderMenu(btn.dataset.category));
});

// 관리자 버튼 클릭 이벤트
adminBtn.addEventListener("click", () => {
    loginModal.classList.remove("hidden");
});

// 로그인 버튼 클릭 이벤트
loginButton.addEventListener("click", () => {
    const password = passwordInput.value;
    if (password === "admin") {
        alert("로그인 성공!");
        loginModal.classList.add("hidden");
        window.location.href = "admin.html"; // 관리자 페이지로 이동
    } else {
        alert("비밀번호가 틀렸습니다.");
    }
});


// 장바구니 추가 함수 (업데이트: 수량 조절 버튼 포함)
function addToCart(menuItem) {
    if (cart[menuItem.name]) {
        cart[menuItem.name].quantity++;
    } else {
        cart[menuItem.name] = { ...menuItem, quantity: 1 };
    }
    renderCart();
}

// 장바구니 렌더링 함수 (업데이트: +, - 버튼 추가)
function renderCart() {
    cartItems.innerHTML = ""; // 기존 장바구니 초기화
    let total = 0;

    for (const key in cart) {
        const item = cart[key];
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <span>${item.name} - ₩${item.price * item.quantity}</span>
            <div class="quantity-controls">
                <button class="quantity-btn" data-name="${item.name}" data-action="decrease">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" data-name="${item.name}" data-action="increase">+</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    }

    totalPrice.textContent = total;

    // +, - 버튼에 이벤트 리스너 추가
    document.querySelectorAll(".quantity-btn").forEach(btn => {
        btn.addEventListener("click", handleQuantityChange);
    });
}

// 수량 변경 함수
function handleQuantityChange(event) {
    const itemName = event.target.dataset.name;
    const action = event.target.dataset.action;

    if (cart[itemName]) {
        if (action === "increase") {
            cart[itemName].quantity++;
        } else if (action === "decrease") {
            cart[itemName].quantity--;
            if (cart[itemName].quantity === 0) {
                delete cart[itemName]; // 수량이 0이면 장바구니에서 제거
            }
        }
        renderCart(); // 장바구니 갱신
    }
}

// 관리자 로그인 성공 시 페이지 이동
function login(event) {
    event.preventDefault();
    const inputPassword = passwordInput.value;
    if (inputPassword === ADMIN_PASSWORD) {
        alert("관리자 인증 성공!");
        // 새로운 관리자 페이지로 이동
        window.location.href = "admin.html";
    } else {
        alert("비밀번호가 틀렸습니다.");
    }
}
