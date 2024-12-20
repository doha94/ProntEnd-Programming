// 기존 메뉴 데이터 (예시 데이터)
const menuData = [
    { name: "커피", price: 5000, image: "coffee.jpg" },
    { name: "차", price: 4000, image: "tea.jpg" },
    { name: "샌드위치", price: 7000, image: "sandwich.jpg" }
];

const menuList = document.getElementById("menu-list");

// 메뉴 렌더링
function renderMenu() {
    menuList.innerHTML = "";
    menuData.forEach((item, index) => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>가격: ₩${item.price}</p>
            <img src="${item.image}" alt="${item.name}" width="100">
            <button data-index="${index}" class="edit-btn">수정</button>
            <button data-index="${index}" class="delete-btn">삭제</button>
        `;
        menuList.appendChild(menuItem);
    });

    // 이벤트 리스너 추가
    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", editMenu);
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", deleteMenu);
    });
}

// 메뉴 추가
document.getElementById("add-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("add-name").value;
    const price = parseInt(document.getElementById("add-price").value, 10);
    const image = document.getElementById("add-image").value;

    menuData.push({ name, price, image });
    renderMenu();
    alert("새로운 메뉴가 추가되었습니다!");
    e.target.reset();
});

// 메뉴 수정
function editMenu(event) {
    const index = event.target.dataset.index;
    const newName = prompt("새로운 이름을 입력하세요", menuData[index].name);
    const newPrice = prompt("새로운 가격을 입력하세요", menuData[index].price);
    const newImage = prompt("새로운 이미지 URL을 입력하세요", menuData[index].image);

    if (newName && newPrice && newImage) {
        menuData[index] = {
            name: newName,
            price: parseInt(newPrice, 10),
            image: newImage
        };
        renderMenu();
        alert("메뉴가 수정되었습니다!");
    }
}

// 메뉴 삭제
function deleteMenu(event) {
    const index = event.target.dataset.index;
    if (confirm("정말 삭제하시겠습니까?")) {
        menuData.splice(index, 1);
        renderMenu();
        alert("메뉴가 삭제되었습니다!");
    }
}

// 초기 메뉴 렌더링
renderMenu();
