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

// script.js

document.addEventListener("DOMContentLoaded", function() {
    const profileImage = document.querySelector(".profile-image");
    const mainImage = profileImage.querySelector(".main-img");
    const additionalImages = profileImage.querySelector(".additional-images");
    const images = Array.from(additionalImages.querySelectorAll("img"));
    
    let imageIndex = 0; // Để theo dõi ảnh phụ đang được hiển thị
    let interval; // Biến để lưu interval (để dừng khi hover ra ngoài)

    // Hàm để hiển thị ảnh phụ thay thế lần lượt
    function startImageCycle() {
        // Ẩn ảnh phụ cũ
        images.forEach(img => img.style.opacity = "0");

        // Hiển thị ảnh phụ hiện tại
        images[imageIndex].style.opacity = "1";
        images[imageIndex].style.transform = "scale(1.1)";
        
        // Tăng chỉ số ảnh phụ (quay vòng)
        imageIndex = (imageIndex + 1) % images.length;
    }

    // Khi hover vào profile-image
    profileImage.addEventListener("mouseenter", function() {
        // Phóng to ảnh chính
        mainImage.style.transform = "scale(1.3)";

        // Hiển thị các ảnh phụ
        additionalImages.style.opacity = "1";

        // Bắt đầu chu trình thay đổi ảnh phụ
        interval = setInterval(startImageCycle, 2000); // Mỗi 2 giây thay đổi ảnh phụ
    });

    // Khi di chuột ra ngoài profile-image
    profileImage.addEventListener("mouseleave", function() {
        // Trở lại ảnh chính ban đầu
        mainImage.style.transform = "scale(1)";

        // Ẩn ảnh phụ
        additionalImages.style.opacity = "0";

        // Dừng chu trình thay đổi ảnh phụ
        clearInterval(interval);
        
        // Đặt lại ảnh phụ về trạng thái ẩn
        images.forEach(img => img.style.opacity = "0");
    });

    // Bắt đầu chu trình ảnh phụ ngay khi trang load (nhưng ẩn ảnh ngay khi không hover)
    startImageCycle();
});

// // function index-text
//   function adjustTitle() {
//     const index_text = document.getElementById("index-text");
//     if (window.innerWidth <= 768) {  // Kích thước màn hình điện thoại (<=768px)
//       index_text.textContent = "Welcome";
//     } else {
//       index_text.textContent = "Welcome my website";  // Giao diện desktop
//     }
//   }

//   // Gọi hàm khi tải trang và khi thay đổi kích thước cửa sổ
//   window.addEventListener('load', adjustTitle);
//   window.addEventListener('resize', adjustTitle);

//   // function about-text
//   function adjustTitle() {
//     const about_text = document.getElementById("about-text");
//     if (window.innerWidth <= 768) {  // Kích thước màn hình điện thoại (<=768px)
//       about_text.textContent = "Infor";
//     } else {
//       about_text.textContent = "Information";  // Giao diện desktop
//     }
//   }

//   // Gọi hàm khi tải trang và khi thay đổi kích thước cửa sổ
//   window.addEventListener('load', adjustTitle);
//   window.addEventListener('resize', adjustTitle);

// Hàm để lấy địa chỉ IP của người dùng
function getVisitorIP() {
    return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(error => {
            console.error('Không thể lấy địa chỉ IP:', error);
            return null; // Trả về null nếu có lỗi
        });
}

// Hàm để cập nhật lượt truy cập
async function updateVisitorCount(pageKey) {
    const ip = await getVisitorIP();  // Lấy địa chỉ IP của người dùng
    if (!ip) {
        console.log('Không thể lấy địa chỉ IP');
        return;  // Nếu không thể lấy địa chỉ IP, không làm gì thêm
    }

    // Kiểm tra xem IP đã được lưu trong localStorage chưa
    let visitedIPs = JSON.parse(localStorage.getItem(`visitedIPs_${pageKey}`)) || [];

    // Nếu IP chưa được lưu, tính là lượt truy cập mới
    if (!visitedIPs.includes(ip)) {
        visitedIPs.push(ip); // Thêm IP vào danh sách đã truy cập
        localStorage.setItem(`visitedIPs_${pageKey}`, JSON.stringify(visitedIPs)); // Lưu lại danh sách IP

        // Cập nhật số lượt truy cập
        let visitCount = parseInt(localStorage.getItem(`visitCount_${pageKey}`)) || 0;
        visitCount++;
        localStorage.setItem(`visitCount_${pageKey}`, visitCount); // Lưu lại số lượt truy cập
    }

    // Cập nhật hiển thị số lượt truy cập
    const visitorText = document.getElementById("visitor-text");
    if (visitorText) {
        const visitCount = localStorage.getItem(`visitCount_${pageKey}`) || 0;
        visitorText.textContent = `Views: ${visitCount}`;
    }
}

// Gọi hàm updateVisitorCount khi tải trang
document.addEventListener("DOMContentLoaded", function () {
    // Lấy tên trang từ URL, ví dụ: 'index.html' sẽ là 'index'
    const path = window.location.pathname;
    const page = path.split("/").pop().split(".")[0];
    
    // Gọi hàm với tham số pageKey
    updateVisitorCount(page);
});