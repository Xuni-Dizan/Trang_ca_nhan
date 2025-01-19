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

// Kiểm tra xem phần hướng dẫn đã bị ẩn trong 30 ngày chưa
function shouldShowGuidance() {
    const lastDismiss = localStorage.getItem('guidanceDismissed');
    if (!lastDismiss) return true;
    const now = new Date().getTime();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    return (now - lastDismiss) > thirtyDays;
}

// Hiển thị phần hướng dẫn nếu cần
function toggleGuidance() {
    const guidance = document.querySelector('.guidance');
    if (shouldShowGuidance()) {
        guidance.style.display = 'flex';
    } else {
        guidance.style.display = 'none';
    }
}

// Xử lý sự kiện khi sidebar được mở rộng
function handleSidebarToggle() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.addEventListener('transitionend', () => {
        if (sidebar.classList.contains('open')) {
            toggleGuidance();
        } else {
            const guidance = document.querySelector('.guidance');
            guidance.style.display = 'none';
        }
    });
}

// Xử lý sự kiện khi người dùng nhấp vào icon bx bxl-java
function handleIconClick() {
    const javaIcon = document.querySelector('.bx.bxl-java');
    const guidance = document.querySelector('.guidance');

    javaIcon.addEventListener('click', () => {
        guidance.style.display = 'none';
        localStorage.setItem('guidanceDismissed', new Date().getTime());
    });
}

// Khởi chạy các hàm khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', () => {
    handleSidebarToggle();
    handleIconClick();
});

document.addEventListener('DOMContentLoaded', function() {
    const profileImage = document.querySelector('.profile-image');

    profileImage.addEventListener('mouseenter', () => {
        profileImage.classList.add('active');
    });

    profileImage.addEventListener('mouseleave', () => {
        profileImage.classList.remove('active');
    });
});

// Hàm xử lý khi trang đã tải hoàn tất và bắt đầu animation của header
document.addEventListener("DOMContentLoaded", function() {
    // Đợi tất cả tài nguyên (hình ảnh, video, ...) được tải hoàn chỉnh
    window.addEventListener('load', () => {
        const overlay = document.querySelector('.loading-overlay');
        const header = document.querySelector('header');

        if (overlay && header) {
            // Bắt đầu ẩn overlay bằng cách thêm lớp 'fade-out'
            overlay.classList.add('fade-out');

            // Lắng nghe sự kiện khi transition opacity kết thúc
            overlay.addEventListener('transitionend', function handleTransitionEnd(event) {
                if (event.propertyName === 'opacity') {
                    // Ẩn overlay hoàn toàn sau khi transition kết thúc
                    overlay.style.display = 'none';

                    // Thêm lớp 'start-animation' để bắt đầu animation của header
                    header.classList.add('start-animation');

                    // Loại bỏ listener để tránh gọi lại nhiều lần
                    overlay.removeEventListener('transitionend', handleTransitionEnd);
                }
            });
        }
    });
});

// Thêm Animation khi cuộn trang
document.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.cv-section');
    const triggerPoint = window.innerHeight / 5 * 4;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if(sectionTop < triggerPoint) {
            section.classList.add('show');
        }
    });
});

// Khởi tạo AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1200,
    });
});

// Thêm chức năng tải CV khi người dùng nhấp vào nút
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.querySelector('.download-cv-btn');
    
    downloadBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn hành động mặc định của thẻ <a>
        
        const pdfUrl = downloadBtn.getAttribute('href');
        
        // Tạo một thẻ <a> ẩn để tải file
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'CV_NguyenXuanDai.pdf';
        
        // Thêm thẻ <a> vào body
        document.body.appendChild(link);
        
        // Kích hoạt click để tải xuống
        link.click();
        
        // Loại bỏ thẻ <a> khỏi DOM
        document.body.removeChild(link);
        
        // Hiển thị thông báo tải xuống thành công bằng SweetAlert
        Swal.fire({
            title: 'Đang tải...',
            text: 'CV của bạn đang được tải xuống.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        });
    });
});

// Thêm Smooth Scroll cho các liên kết trong navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Thêm lớp 'scrolled' cho header khi cuộn
// window.addEventListener('scroll', () => {
//     const header = document.querySelector('header');
//     if (window.scrollY > 50) {
//         header.classList.add('scrolled');
//     } else {
//         header.classList.remove('scrolled');
//     }
// });

// Lắng nghe sự kiện cuộn trang
// document.addEventListener('scroll', function() {
//     // Lấy h1 và nav
//     const h1 = document.querySelector('h1');
//     const nav = document.querySelector('nav');

//     // Nếu người dùng đã cuộn trang, ẩn h1 và thêm transition cho nav
//     if (window.scrollY > 0) {
//         h1.style.display = 'none';
//         nav.style.transition = 'all 0.5s ease';
//         nav.style.transform = 'translateX(50%)';
//     } else {
//         // Nếu người dùng cuộn lên đầu trang, hiển thị h1 và xóa transition cho nav
//         h1.style.display = 'block';
//         nav.style.transition = 'none';
//         nav.style.transform = 'none';
//     }
// });