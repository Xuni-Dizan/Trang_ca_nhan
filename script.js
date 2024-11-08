// let labCount = 2; // Khởi tạo từ 2 vì đã có 2 lab cố định

// document.getElementById('addLabButton').addEventListener('click', function() {
//     labCount++;
//     const labName = `Lab ${labCount}`;
//     const labDiv = document.createElement('div');
//     labDiv.classList.add('lab');
//     labDiv.innerHTML = `<p>${labName}</p>`;
//     labDiv.onclick = function() {
//         // Bạn có thể cập nhật logic để mở đường dẫn tương ứng nếu cần
//         alert(`Lab ${labCount} được thêm vào!`);
//     };
//     document.getElementById('labsContainer').appendChild(labDiv);
// });
// labs
// const $panels = document.querySelectorAll('.panel');
// $panels.forEach($panel => {
//   $panel.addEventListener('click', () => {
//     removeActiveClasses();
//     $panel.classList.add('active');
//         },
//     );
// });
// function removeActiveClasses() {
//     $panels.forEach(($panel) => {
//       $panel.classList.remove('active');
// });
// }

// Lấy tất cả các panel
const panels = document.querySelectorAll('.panel');

// Hàm đóng tất cả các panel
function closeAllPanels() {
    panels.forEach(panel => {
        const card = panel.querySelector('.card');
        const labLabel = panel.querySelector('.lab-label');
        const cardContent = panel.querySelector('.card-content');
        
        // Thu gọn panel, hiển thị lại nhãn "Lab", ẩn card và card-content
        panel.classList.remove('active');
        card.style.display = 'none';
        labLabel.style.display = 'block';
        cardContent.style.transform = 'translateY(100%)';
        cardContent.style.opacity = 0;
    });
}

// Thêm sự kiện click cho mỗi panel
panels.forEach(panel => {
    panel.addEventListener('click', () => {
        // Nếu panel đang mở (active), thu gọn lại
        if (panel.classList.contains('active')) {
            closeAllPanels();
        } else {
            // Đóng tất cả panel đang mở
            closeAllPanels();
            
            // Mở panel hiện tại
            const card = panel.querySelector('.card');
            const labLabel = panel.querySelector('.lab-label');
            const cardContent = panel.querySelector('.card-content');
            
            
            // Mở rộng panel, ẩn nhãn "Lab", hiển thị card và card-content
            panel.classList.add('active');
            card.style.display = 'block';
            labLabel.style.display = 'none';
            
            setTimeout(() => {
                cardContent.style.transform = 'translateY(0)';
                cardContent.style.opacity = 1;
            }, 200);
        }
    });

    // Khi con trỏ vào panel, hiển thị card-content nếu panel đang mở
    panel.addEventListener('mouseenter', () => {
        if (panel.classList.contains('active')) {
            const cardContent = panel.querySelector('.card-content');
            cardContent.style.transform = 'translateY(0)';
            cardContent.style.opacity = 1;
        }
    });

    // Khi con trỏ rời khỏi panel, ẩn card-content nếu panel đang mở
    panel.addEventListener('mouseleave', () => {
        if (panel.classList.contains('active')) {
            const cardContent = panel.querySelector('.card-content');
            cardContent.style.transform = 'translateY(100%)';
            cardContent.style.opacity = 0;
        }
    });

    // Thêm sự kiện click cho "Read more" trong card-content
    const readMoreLink = panel.querySelector('.read-more');
    if (readMoreLink) {
        readMoreLink.addEventListener('click', (event) => {
            // Mở liên kết trong tab mới
            window.open(readMoreLink.href, '_blank');
            // Ngừng hành động mặc định của liên kết (tránh mở trong cùng tab)
            event.preventDefault();
        });
    }
});

// function for images of panel and card
panel.addEventListener('mouseenter', () => {
    if (panel.classList.contains('active')) {
        const cardContent = panel.querySelector('.card-content');
        const cardImage = panel.querySelector('.card-image');
        
        // Hiệu ứng làm sáng hình ảnh khi hover
        cardImage.style.transform = 'scale(1.05)';
        cardContent.style.transform = 'translateY(0)';
        cardContent.style.opacity = 1;
    }
});

panel.addEventListener('mouseleave', () => {
    if (panel.classList.contains('active')) {
        const cardContent = panel.querySelector('.card-content');
        const cardImage = panel.querySelector('.card-image');
        
        // Hiệu ứng làm mờ hình ảnh khi hover ra ngoài
        cardImage.style.transform = 'scale(1)';
        cardContent.style.transform = 'translateY(100%)';
        cardContent.style.opacity = 0;
    }
});

