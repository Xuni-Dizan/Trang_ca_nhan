// Xử lý chuyển đổi các section khi click vào thanh điều hướng
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (event) => {
        // Ngăn chặn hành vi mặc định
        event.preventDefault();

        // Xóa class active từ tất cả các nav-item
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        // Thêm class active cho nav-item được chọn
        item.classList.add('active');

        // Ẩn tất cả các section
        document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));

        // Hiển thị section tương ứng
        const target = item.getAttribute('data-target');
        const targetSection = document.getElementById(target);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });

    // Thêm khả năng kích hoạt bằng bàn phím
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
        }
    });
});

// Xử lý gửi biểu mẫu liên hệ
const form = document.getElementById('lien-he-form');
const loading = document.getElementById('loading');
const thongBao = document.getElementById('thong-bao');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Kiểm tra tính hợp lệ của form
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    loading.classList.remove('hidden');
    thongBao.classList.add('hidden', 'success', 'error');

    // Lấy dữ liệu từ form
    const hoTen = form.hoTen.value.trim();
    const email = form.email.value.trim();
    const soDienThoai = form.soDienThoai.value.trim();
    const noiDung = form.noiDung.value.trim();

    // Sử dụng EmailJS để gửi email
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        hoTen: hoTen,
        email: email,
        soDienThoai: soDienThoai,
        noiDung: noiDung
    })
    .then(function(response) {
        loading.classList.add('hidden');
        thongBao.textContent = 'Gửi thành công! Chúng tôi sẽ liên hệ với bạn sớm.';
        thongBao.classList.remove('hidden', 'error');
        thongBao.classList.add('success');
        form.reset();
        form.classList.remove('was-validated');
    }, function(error) {
        loading.classList.add('hidden');
        thongBao.textContent = 'Có lỗi xảy ra khi gửi. Vui lòng thử lại sau.';
        thongBao.classList.remove('hidden', 'success');
        thongBao.classList.add('error');
        console.error('EmailJS Error:', error);
    });
});

// Xử lý tìm kiếm trong forum
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const forumList = document.getElementById('forum-list');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();
    const forumCards = forumList.querySelectorAll('.thong-bao-card, .forum-card');

    forumCards.forEach(card => {
        const title = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
        const content = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';
        if (title.includes(query) || content.includes(query)) {
            card.classList.remove('d-none');
        } else {
            card.classList.add('d-none');
        }
    });
});

// Xử lý nút "Trả Lời" trong forum
forumList.addEventListener('click', (e) => {
    if (e.target.classList.contains('tra-loi-btn')) {
        const card = e.target.closest('.forum-card');
        const answerForm = card.querySelector('.answer-form');
        if (answerForm.classList.contains('active')) {
            answerForm.classList.remove('active');
        } else {
            // Đóng tất cả các form trả lời khác
            document.querySelectorAll('.answer-form').forEach(form => form.classList.remove('active'));
            // Mở form trả lời cho card hiện tại
            answerForm.classList.add('active');
        }
    }

    // Xử lý gửi trả lời
    if (e.target.classList.contains('submit-answer')) {
        const card = e.target.closest('.forum-card');
        const answerInput = card.querySelector('textarea[name="answer"]');
        const answerText = answerInput.value.trim();

        if (answerText === '') {
            alert('Vui lòng nhập nội dung trả lời.');
            return;
        }

        const existingAnswer = card.querySelector('.answer');
        if (existingAnswer) {
            alert('Bạn đã trả lời cho chủ đề này.');
            return;
        }

        // Tạo phần tử trả lời mới
        const answerElem = document.createElement('p');
        answerElem.textContent = `Trả lời: ${answerText}`;
        answerElem.classList.add('answer', 'text-success');

        // Thêm vào card
        card.appendChild(answerElem);

        // Ẩn form trả lời và reset nội dung
        card.querySelector('.answer-form').classList.remove('active');
        answerInput.value = '';
    }

    // Xử lý hủy trả lời
    if (e.target.classList.contains('cancel-answer')) {
        const card = e.target.closest('.forum-card');
        card.querySelector('.answer-form').classList.remove('active');
    }
});

// Xử lý nút "Xem Thêm" trong forum
const xemThemBtn = document.getElementById('xem-them');
let page = 1;
const totalPages = 3; // Giả sử có 3 trang

xemThemBtn.addEventListener('click', () => {
    if (page < totalPages) {
        // Giả sử thêm các forum-card mới
        for (let i = 1; i <= 2; i++) {
            const newCard = document.createElement('div');
            newCard.classList.add('forum-card');
            newCard.innerHTML = `
                <h3>Chủ đề mới ${page * 2 + i}</h3>
                <p>Người dùng C hỏi: Đây là nội dung của chủ đề mới.</p>
                <span class="thoi-gian">${new Date().toLocaleDateString()}</span>
                <button class="tra-loi-btn">Trả Lời</button>

                <!-- Form Trả Lời -->
                <div class="answer-form">
                    <h4>Trả lời</h4>
                    <div class="form-group">
                        <label for="answer">Nội dung trả lời:</label>
                        <textarea id="answer" name="answer" placeholder="Nhập câu trả lời của bạn..." required></textarea>
                    </div>
                    <div class="form-actions">
                        <button class="submit-answer">Gửi trả lời</button>
                        <button class="cancel-answer">Hủy</button>
                    </div>
                </div>
            `;
            forumList.appendChild(newCard);
        }
        page++;
        if (page === totalPages) {
            xemThemBtn.disabled = true;
            xemThemBtn.textContent = 'Không còn chủ đề nào';
        }
    }
});
