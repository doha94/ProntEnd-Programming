// 메뉴와 장바구니 요소를 가져옵니다.
const menu = document.getElementById('menu');
const cart = document.getElementById('cart');

// 드래그 시작 이벤트 핸들러
menu.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('menu-item')) {
        // 드래그 중인 항목의 데이터를 전송합니다.
        e.dataTransfer.setData('text/plain', JSON.stringify({
            name: e.target.dataset.name,
            price: e.target.dataset.price
        }));
    }
});

// 드래그된 항목이 장바구니 위로 올려졌을 때의 이벤트
cart.addEventListener('dragover', (e) => {
    e.preventDefault(); // 기본 동작 방지 (드롭 허용)
    cart.classList.add('drag-over'); // 드래그 오버 스타일 추가
});

// 드래그된 항목이 장바구니를 떠났을 때의 이벤트
cart.addEventListener('dragleave', () => {
    cart.classList.remove('drag-over'); // 드래그 오버 스타일 제거
});

// 드롭 이벤트 핸들러
cart.addEventListener('drop', (e) => {
    e.preventDefault(); // 기본 동작 방지
    cart.classList.remove('drag-over'); // 드래그 오버 스타일 제거

    // 전송된 데이터 가져오기
    const itemData = JSON.parse(e.dataTransfer.getData('text/plain'));

    // 장바구니에 새로운 항목 추가
    const cartItem = document.createElement('div');
    cartItem.textContent = `${itemData.name} - $${itemData.price}`;
    cartItem.classList.add('menu-item');

    cart.appendChild(cartItem); // 장바구니 영역에 추가
});