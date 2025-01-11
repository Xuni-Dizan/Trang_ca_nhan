document.addEventListener('DOMContentLoaded', () => {
    // Chuyển đổi chế độ sáng/tối với hiệu ứng GSAP
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            gsap.to(document.body, { backgroundColor: "#1e1e2f", color: "#e0e0e0", duration: 0.5 });
            document.body.classList.add('dark-mode');
        } else {
            gsap.to(document.body, { backgroundColor: "#f0f2f5", color: "#333", duration: 0.5 });
            document.body.classList.remove('dark-mode');
        }
    });

    // Chọn màu chủ đề với hiệu ứng chuyển màu mượt mà
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedColor = option.getAttribute('data-color');
            gsap.to(document.documentElement, { '--accent-color': selectedColor, duration: 0.5 });
            document.documentElement.style.setProperty('--accent-color', selectedColor);
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    // Điều chỉnh kích thước chữ với hiển thị giá trị
    const fontSizeSlider = document.getElementById('font-size-slider');
    const fontSizeValue = document.getElementById('font-size-value');
    const root = document.documentElement;
    fontSizeSlider.addEventListener('input', () => {
        const fontSize = `${fontSizeSlider.value}px`;
        fontSizeValue.textContent = fontSize;
        gsap.to(root, { fontSize: fontSize, duration: 0.3 });
    });

    // Accordion cho câu hỏi thường gặp với GSAP 
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isOpen = header.classList.contains('active');

            if (isOpen) {
                gsap.to(content, { 
                    height: 0,
                    opacity: 0, 
                    duration: 0.3, 
                    onComplete: () => {
                        content.classList.add('hidden');
                        content.classList.remove('active');
                        header.classList.remove('active');
                    }
                });
            } else {
                // Đóng tất cả các accordion khác
                accordionHeaders.forEach(otherHeader => {
                    if (otherHeader !== header && otherHeader.classList.contains('active')) {
                        const otherContent = otherHeader.nextElementSibling;
                        gsap.to(otherContent, { 
                            height: 0,
                            opacity: 0, 
                            duration: 0.3, 
                            onComplete: () => {
                                otherContent.classList.add('hidden');
                                otherContent.classList.remove('active');
                                otherHeader.classList.remove('active');
                            }
                        });
                    }
                });

                content.classList.remove('hidden');
                content.classList.add('active');
                header.classList.add('active');

                const contentHeight = content.scrollHeight;
                gsap.fromTo(content, 
                    { height: 0, opacity: 0 }, 
                    { height: contentHeight, opacity: 1, duration: 0.3 }
                );
            }

            // Xoay biểu tượng
            const icon = header.querySelector('i');
            if (icon) {
                gsap.to(icon, { rotation: isOpen ? 0 : 180, duration: 0.3 });
            }
        });
    });

    // Thay đổi ảnh đại diện với hiệu ứng
    const changeAvatarBtn = document.getElementById('change-avatar');
    const avatarImg = document.getElementById('avatar');

    changeAvatarBtn.addEventListener('click', () => {
        // Logic để thay đổi ảnh đại diện
        const newAvatarUrl = prompt('Nhập URL ảnh đại diện mới:');
        if (newAvatarUrl) {
            gsap.fromTo(avatarImg, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5, duration: 0.3, onComplete: () => {
                avatarImg.src = newAvatarUrl;
                gsap.fromTo(avatarImg, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3 });
            }});
        }
    });

    // Đổi mật khẩu
    const changePasswordBtn = document.getElementById('change-password');
    changePasswordBtn.addEventListener('click', () => {
        // Logic để đổi mật khẩu
        alert('Chức năng đổi mật khẩu đang được phát triển.');
    });

    // Gửi yêu cầu hỗ trợ
    const supportRequestBtn = document.getElementById('support-request');
    supportRequestBtn.addEventListener('click', () => {
        // Logic để gửi yêu cầu hỗ trợ
        alert('Chức năng gửi yêu cầu hỗ trợ đang được phát triển.');
    });

    // Gửi góp ý
    const submitFeedbackBtn = document.getElementById('submit-feedback');
    submitFeedbackBtn.addEventListener('click', () => {
        // Logic để gửi góp ý
        alert('Chức năng gửi góp ý đang được phát triển.');
    });

    // Sao lưu dữ liệu
    const backupDataBtn = document.getElementById('backup-data');
    backupDataBtn.addEventListener('click', () => {
        // Logic để sao lưu dữ liệu
        alert('Chức năng sao lưu dữ liệu đang được phát triển.');
    });

    // Khôi phục dữ liệu
    const restoreDataBtn = document.getElementById('restore-data');
    restoreDataBtn.addEventListener('click', () => {
        // Logic để khôi phục dữ liệu
        alert('Chức năng khôi phục dữ liệu đang được phát triển.');
    });

    // Kết nối mạng xã hội với thông báo tiện ích
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Logic để kết nối mạng xã hội
            alert(`Chức năng ${button.textContent.trim()} đang được phát triển.`);
        });
    });

    // Thêm khả năng lưu trữ cài đặt người dùng vào LocalStorage
    // Lưu chế độ sáng/tối
    themeToggle.addEventListener('change', () => {
        localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
    });

    // Lưu màu chủ đề
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedColor = option.getAttribute('data-color');
            localStorage.setItem('themeColor', selectedColor);
        });
    });

    // Lưu kích thước chữ
    fontSizeSlider.addEventListener('input', () => {
        localStorage.setItem('fontSize', fontSizeSlider.value);
    });

    // Áp dụng cài đặt từ LocalStorage khi tải trang
    const applySettings = () => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            themeToggle.checked = true;
            document.body.classList.add('dark-mode');
            gsap.to(document.body, { backgroundColor: "#1e1e2f", color: "#e0e0e0", duration: 0.5 });
        }

        const themeColor = localStorage.getItem('themeColor');
        if (themeColor) {
            document.documentElement.style.setProperty('--accent-color', themeColor);
            colorOptions.forEach(opt => {
                if (opt.getAttribute('data-color') === themeColor) {
                    opt.classList.add('selected');
                } else {
                    opt.classList.remove('selected');
                }
            });
        }

        const fontSize = localStorage.getItem('fontSize');
        if (fontSize) {
            fontSizeSlider.value = fontSize;
            fontSizeValue.textContent = `${fontSize}px`;
            document.documentElement.style.fontSize = `${fontSize}px`;
        }
    };

    applySettings();

    // Hàm xử lý ẩn/hiện các phần nội dung
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSectionId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetSectionId);

            // Ẩn tất cả các phần
            sections.forEach(section => {
                section.classList.add('hidden-section');
                section.classList.remove('active-section');
            });

            // Hiển thị phần được chọn
            targetSection.classList.remove('hidden-section');
            targetSection.classList.add('active-section');

            // Cập nhật trạng thái active cho các link
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            // Cuộn tới phần nội dung
            gsap.to(window, { duration: 1, scrollTo: { y: targetSection, offsetY: 20 }, ease: 'power2.inOut' });
        });
    });
});
