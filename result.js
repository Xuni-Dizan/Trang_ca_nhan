const weeks = document.querySelectorAll('.week');
const modal = document.getElementById('achievementModal');
const closeModal = document.getElementById('closeModal');
const weekNumber = document.getElementById('weekNumber');
const achievementDetails = document.getElementById('achievementDetails');

const achievements = {
    1: "Thành tích tuần 1: Hoàn thành 5 bài tập lập trình.",
    2: "Thành tích tuần 2: Đọc xong 3 chương sách kỹ năng.",
    3: "Thành tích tuần 3: Viết một bài blog.",
    4: "Thành tích tuần 4: Tham gia khóa học trực tuyến về JavaScript.",
    5: "Thành tích tuần 5: Xây dựng ứng dụng Todo List đơn giản.",
    6: "Thành tích tuần 6: Học cách sử dụng Git và GitHub.",
    7: "Thành tích tuần 7: Tạo trang web cá nhân.",
    8: "Thành tích tuần 8: Tham gia dự án mã nguồn mở.",
    9: "Thành tích tuần 9: Học về Responsive Design.",
    10: "Thành tích tuần 10: Tối ưu hóa website cho SEO."
};

weeks.forEach((week) => {
    week.addEventListener('click', () => {
        const weekData = week.getAttribute('data-week');
        weekNumber.textContent = weekData;
        achievementDetails.textContent = achievements[weekData] || "Chưa có thành tích!";
        modal.classList.remove('hidden');
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Đóng modal khi nhấn ngoài nội dung modal
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});
