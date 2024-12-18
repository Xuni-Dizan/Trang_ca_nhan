// Tối ưu hóa việc tải video nền
document.addEventListener("DOMContentLoaded", () => {
    const backgroundVideo = document.getElementById("background-video");
    
    // Sử dụng Intersection Observer để tải video khi nó gần xuất hiện trong viewport
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    backgroundVideo.src = "videos/br1.mp4";
                    backgroundVideo.classList.add("ready");
                    observer.unobserve(backgroundVideo);
                }
            });
        }, {
            root: null,
            rootMargin: "0px",
            threshold: 0.1
        });
        observer.observe(backgroundVideo);
    } else {
        // Fallback cho trình duyệt không hỗ trợ Intersection Observer
        backgroundVideo.src = "videos/br1.mp4";
        backgroundVideo.classList.add("ready");
    }
});

// Lazy load các hình ảnh sử dụng Intersection Observer
document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll('img.lazy');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback cho trình duyệt không hỗ trợ Intersection Observer
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
});

// Tối ưu hóa việc đếm lượt truy cập bằng cách sử dụng sessionStorage thay vì localStorage
document.addEventListener("DOMContentLoaded", async function () {
    const ip = await getVisitorIP();  // Lấy địa chỉ IP của người dùng
    if (!ip) {
        console.log('Không thể lấy địa chỉ IP');
        return;
    }

    // Sử dụng sessionStorage để đếm lượt truy cập trong phiên làm việc
    let visitCount = sessionStorage.getItem("visitCount") || 0;
    visitCount++;
    sessionStorage.setItem("visitCount", visitCount);

    // Cập nhật hiển thị số lượt truy cập
    const visitorText = document.getElementById("visitor-text");
    visitorText.textContent = `Views: ${visitCount}`;
}); 