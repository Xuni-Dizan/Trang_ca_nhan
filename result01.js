/*--------------------
Vars
--------------------*/
let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)
}

/*--------------------
Show Week - Định nghĩa ở phạm vi toàn cục
--------------------*/
// function showWeek(weekNumber, progress) {
//     // Ẩn tất cả các section tuần
//     const weekSections = document.querySelectorAll("[class^='week-']");
//     weekSections.forEach(section => {
//         section.style.display = "none";
//     });

//     // Hiển thị tuần đã chọn
//     const selectedWeek = document.querySelector(`.week-${weekNumber}`);
//     if (selectedWeek) {
//         selectedWeek.style.display = "block";
//     }

//     // Cập nhật tiêu đề và tiến độ
//     const headerTitle = document.querySelector(".text-5xl.font-extrabold");
//     const progressSpan = document.querySelector(".ml-6.text-lg.font-medium");
//     headerTitle.textContent = `Week ${weekNumber}`;
//     progressSpan.textContent = `${progress}% Completed`;

//     // Hiển thị section-overview
//     const sectionOverview = document.getElementById('section-overview');
//     if (sectionOverview) {
//         sectionOverview.style.display = 'flex';
//         sectionOverview.classList.remove('fade-out');
//         sectionOverview.classList.add('fade-in');
//     }

//     // Ẩn Sidebar Left nếu cần thiết
//     const sidebar = document.querySelector('aside');
//     if (sidebar) {
//         sidebar.style.display = 'none';
//     }
// }

/*--------------------
Show Week Details
--------------------*/
function showWeekDetails(weekNumber, progress) {
    // Ẩn tất cả các section tuần
    const weekSections = document.querySelectorAll("[class^='week-']");
    weekSections.forEach(section => {
        section.style.display = "none";
    });

    // Hiển thị tuần đã chọn
    const selectedWeek = document.querySelector(`.week-${weekNumber}`);
    if (selectedWeek) {
        selectedWeek.style.display = "block";
    }

    // Cập nhật tiêu đề và tiến độ
    const headerTitle = document.querySelector(".text-5xl.font-extrabold");
    const progressSpan = document.querySelector(".ml-6.text-lg.font-medium");
    if (headerTitle) {
        headerTitle.textContent = `Week ${weekNumber}`;
    }
    if (progressSpan) {
        progressSpan.innerHTML = `<h4>${progress}% Completed</h4>`;
    }

    // Cập nhật độ rộng của thanh tiến độ
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }

    // Hiển thị section-overview
    const sectionOverview = document.getElementById('section-overview');
    if (sectionOverview) {
        sectionOverview.style.display = 'flex';
        sectionOverview.classList.remove('fade-out');
        sectionOverview.classList.add('fade-in');
    }

    // Ẩn Sidebar Left nếu cần thiết
    const sidebar = document.querySelector('aside');
    const flex = document.querySelector(".flex");
    if (sidebar) {
        sidebar.style.display = 'none';
        flex.style.justifyContent = "center";
    }

    // Hiển thị chi tiết của tuần đã chọn
    const weekDetail = document.querySelector(`.week-detail-${weekNumber}`);
    if (weekDetail) {
        // Ẩn tất cả chi tiết tuần khác
        const allWeekDetails = document.querySelectorAll("[class^='week-detail-']");
        allWeekDetails.forEach(detail => {
            detail.style.display = "none";
        });

        // Hiển thị chi tiết tuần đã chọn
        weekDetail.style.display = "block";

        // Cập nhật tiêu đề chi tiết nếu có
        const detailHeader = document.querySelector(".detail-header");
        if (detailHeader) {
            detailHeader.textContent = `Chi tiết của Week ${weekNumber}`;
        }
    }
}

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))
  
  $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 100 + 10
    animate()
  })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  animate()
}

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}

/*--------------------
Listners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)

/*--------------------
openWeek Function
--------------------*/
function openWeek(button) {
    // Tìm carousel-box chứa nút được nhấn
    const carouselBox = button.closest('.carousel-box');
    if (!carouselBox) return;

    // Lấy số tuần từ phần tử .num
    const numElement = carouselBox.querySelector('.num');
    const weekNumber = numElement ? parseInt(numElement.textContent.trim()) : null;

    // Lấy phần trăm tiến độ từ phần tử .progress-percentage
    const progressElement = carouselBox.querySelector('.progress-percentage');
    const progressText = progressElement ? progressElement.textContent.trim().replace('%', '') : '0';
    const progress = parseInt(progressText);

    if (weekNumber !== null) {
        // Gọi hàm showWeekDetails để hiển thị chi tiết tuần
        showWeekDetails(weekNumber, progress);
    }
}

/*--------------------
DOMContentLoaded Event
--------------------*/
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById("overlay");
    const overviewButton = document.querySelector(".overview-button");
    const sectionOverview = document.getElementById("section-overview");
    const closeButton = document.querySelector(".close-button");

    // Hàm ẩn overlay
    function hideOverlay() {
        overlay.style.transition = "opacity 0.5s ease-out";
        overlay.style.opacity = "0";

        // Đợi hiệu ứng chuyển tiếp kết thúc trước khi ẩn hoàn toàn
        overlay.addEventListener("transitionend", () => {
            overlay.style.display = "none";
        });
    }

    // Kiểm tra tất cả hình ảnh đã được tải
    function areImagesLoaded() {
        const images = Array.from(document.images);
        return images.every(img => img.complete && img.naturalHeight !== 0);
    }

    // Xử lý khi tất cả tài nguyên được tải
    window.addEventListener("load", () => {
        hideOverlay();
    });

    // Nếu tất cả hình ảnh đã được tải trước khi sự kiện load xảy ra
    if (areImagesLoaded()) {
        hideOverlay();
    }

    // Thêm sự kiện click cho nút Overview
    overviewButton.addEventListener("click", () => {
        if (sectionOverview.style.display === "none") {
            sectionOverview.style.display = "flex";
            sectionOverview.classList.remove("fade-out");
            sectionOverview.classList.add("fade-in");
        } else {
            sectionOverview.classList.remove("fade-in");
            sectionOverview.classList.add("fade-out");
            sectionOverview.addEventListener("animationend", () => {
                sectionOverview.style.display = "none";
            }, { once: true });
        }
    });

    // Thêm sự kiện click cho nút đóng
    closeButton.addEventListener("click", () => {
        sectionOverview.classList.remove("fade-in");
        sectionOverview.classList.add("fade-out");
        sectionOverview.addEventListener("animationend", () => {
            sectionOverview.style.display = "none";
        }, { once: true });
    });

    // Thêm mã cho chức năng chuyển đổi tuần
    const weekNodes = document.querySelectorAll(".node");
    const weekSections = document.querySelectorAll("[class^='week-']");
    const headerTitle = document.querySelector(".text-5xl.font-extrabold");
    const progressSpan = document.querySelector(".ml-6.text-lg.font-medium");
    const progressBar = document.getElementById("progress-bar");

    // Hàm ẩn tất cả các section tuần
    function hideAllWeeks() {
        weekSections.forEach(section => {
            section.style.display = "none";
        });
    }

    // Hàm hiển thị tuần đã chọn
    function showWeekLocal(weekNumber, progress) { // Đổi tên để tránh xung đột
        hideAllWeeks();
        const selectedWeek = document.querySelector(`.week-${weekNumber}`);
        if (selectedWeek) {
            selectedWeek.style.display = "block";
        }
        if (headerTitle) {
            headerTitle.textContent = `Week ${weekNumber}`;
        }
        if (progressSpan) {
            progressSpan.innerHTML = `<h4>${progress}% Completed</h4>`;
        }
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }

    // Thiết lập trạng thái ban đầu
    hideAllWeeks();
    showWeekLocal(1, 90); // Hiển thị tuần 1 mặc định với 90% hoàn thành

    // Thêm sự kiện click cho từng nút tuần
    weekNodes.forEach(node => {
        node.addEventListener("click", () => {
            const weekNumber = node.querySelector(".text-2xl.font-bold").textContent.trim();
            const progressText = node.querySelector(".text-sm.text-gray-400").textContent.trim();
            const progressMatch = progressText.match(/\d+/);
            const progressValue = progressMatch ? progressMatch[0] : 0; // Lấy số từ chuỗi 'Progress: X%'

            showWeekLocal(weekNumber, progressValue);
        });
    });

    /*--------------------
    Ẩn hoặc Hiển thị Sidebar
    --------------------*/

    // Hàm ẩn sidebar
    function hideSidebar() {
        const sidebar = document.querySelector('aside');
        if (sidebar) {
            sidebar.style.display = 'none';
        }
    }

    // Hàm hiển thị sidebar
    function showSidebar() {
        const sidebar = document.querySelector('aside');
        if (sidebar) {
            sidebar.style.display = 'block';
        }
    }

    // Thêm sự kiện click cho details-button
    const detailsButtons = document.querySelectorAll('.details-button');
    detailsButtons.forEach(button => {
        button.addEventListener('click', hideSidebar);
    });

    // Thêm sự kiện click cho overview-button
    if (overviewButton) {
        overviewButton.addEventListener('click', showSidebar);
    }
});