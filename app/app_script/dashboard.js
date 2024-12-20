function openLab(evt, labName) {
    const tabContents = document.querySelectorAll(".tab-content");
    const tabLinks = document.querySelectorAll(".tab-link");

    // Ẩn tất cả các nội dung tab
    tabContents.forEach(content => {
        content.style.display = "none";
        content.classList.remove("active");
    });

    // Loại bỏ class 'active' khỏi tất cả các tab
    tabLinks.forEach(link => {
        link.classList.remove("active");
    });

    // Hiển thị nội dung tab được chọn và thêm class 'active'
    const selectedTab = document.getElementById(labName);
    if (selectedTab) {
        selectedTab.style.display = "block";
        selectedTab.classList.add("active");
    }

    // Thêm class 'active' vào tab được nhấn
    if (evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    }
}

// Hàm quay lại trang chủ
function goBack(sectionId) {
    const sections = ['section-hci', 'section-ds', 'section-p', 'home'];
    
    sections.forEach(section => {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
            sectionElement.style.display = (section === sectionId) ? 'block' : 'none';
        }
    });
}

// Hàm khởi tạo sự kiện khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', () => {
    // Gán sự kiện cho các nút chi tiết
    document.getElementById('btn-hci')?.addEventListener('click', () => {
        toggleSection('home', 'section-hci');
    });

    document.getElementById('btn-ds')?.addEventListener('click', () => {
        toggleSection('home', 'section-ds');
    });

    document.getElementById('btn-p')?.addEventListener('click', () => {
        toggleSection('home', 'section-p');
    });

    // Gán sự kiện cho các nút quay lại
    const backIcons = document.querySelectorAll('.back-icon');
    backIcons.forEach(icon => {
        icon.addEventListener('click', () => goBack('home'));
    });

    // Hiển thị lab đầu tiên mặc định khi mở HCI
    const sectionHci = document.getElementById('section-hci');
    if (sectionHci) {
        const firstLab = sectionHci.querySelector('.tab-link');
        if (firstLab) {
            firstLab.click();
        }
    }
});

// Hàm chuyển đổi giữa các section
function toggleSection(hideSectionId, showSectionId) {
    const hideSection = document.getElementById(hideSectionId);
    const showSection = document.getElementById(showSectionId);

    if (hideSection && showSection) {
        hideSection.style.display = 'none';
        showSection.style.display = 'block';
        showSection.classList.add('transition-fade');
    }
}