const modalDialog = document.querySelector(".copy-link-dialog");
        const shareBtns = document.querySelectorAll(".share-btn");
        const closeBtn = document.querySelector(".close-btn");
        const copyBtn = document.querySelector(".copy-btn");
        const copyInput = document.getElementById("copy-link-input");
        const copyText = document.getElementById("copy-text");
        
        // Xử lý sự kiện click cho tất cả các nút share-btn
        shareBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                // Lấy link iframe từ data-link của share-btn
                const link = e.currentTarget.getAttribute('data-link');
                copyInput.value = link;
        
                // Tính toán vị trí của share-btn
                const rect = e.currentTarget.getBoundingClientRect();
                
                // Đặt vị trí của modal (dialog) sao cho nó gần với nút chia sẻ
                modalDialog.style.top = `${rect.top + window.scrollY + 40}px`;
                modalDialog.style.left = `${rect.left + window.scrollX}px`;
        
                // Hiển thị dialog
                modalDialog.showModal();
            });
        });
        
        // Đóng dialog khi click vào nút đóng (close-btn)
        closeBtn.addEventListener("click", () => {
            modalDialog.close();
            modalDialog.classList.remove("copy-link-dialog--fadeout");
        });
        
        // Thực hiện sao chép liên kết vào clipboard
        copyBtn.addEventListener("click", () => {
            // Chọn toàn bộ nội dung trong input
            copyInput.select();
            copyInput.setSelectionRange(0, 99999);
        
            // Thực hiện sao chép vào clipboard
            navigator.clipboard.writeText(copyInput.value)
                .then(() => {
                    // Hiển thị thông báo "Copied!" khi sao chép thành công
                    copyText.innerHTML = "Copied!";
                    copyText.style.color = "#28a745";  // Màu xanh để báo thành công
        
                    // Tự động ẩn thông báo sau 2 giây
                    setTimeout(() => {
                        copyText.innerHTML = "Copy Link";
                        copyText.style.color = "";  // Đặt lại màu sắc ban đầu
                    }, 2000);
                })
                .catch((err) => {
                    // Nếu xảy ra lỗi khi sao chép
                    console.error("Error copying text: ", err);
                    copyText.innerHTML = "Failed to Copy!";
                    copyText.style.color = "#dc3545";  // Màu đỏ báo lỗi
        
                    setTimeout(() => {
                        copyText.innerHTML = "Copy Link";
                        copyText.style.color = "";  // Đặt lại màu sắc ban đầu
                    }, 2000);
                });
        });


         // JavaScript code to handle opening iframe section and buttons
        const openIframeBtns = document.querySelectorAll(".open-iframe-btn");
        const iframeSection = document.getElementById("iframe-section");
        const iframeDisplay = document.getElementById("iframe-display");
        const downloadBtn = document.getElementById("download-btn");
        const githubBtn = document.getElementById("github-btn");
        const reloadBtn = document.getElementById("reload-btn");

        openIframeBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();

                // Lấy link iframe và GitHub từ thuộc tính data
                const iframeLink = e.currentTarget.getAttribute("data-link");
                const githubLink = e.currentTarget.getAttribute("data-github");

                // Cập nhật iframe và GitHub link
                iframeDisplay.src = iframeLink;
                githubBtn.onclick = () => window.open(githubLink, '_blank');

                // Tạo đường dẫn download cho nút "Download" từ data-github
                const downloadLink = "https://downgit.github.io/#/home?url=" + encodeURIComponent(githubLink);
                downloadBtn.onclick = () => {
                    window.open(downloadLink, '_blank');
                };

                // Hiển thị section chứa iframe
                iframeSection.style.display = "block";
            });
        });

        // Xử lý sự kiện đóng iframe section khi click vào bất kỳ nơi nào ngoài iframe
        window.addEventListener("click", (e) => {
            if (e.target === iframeSection) {
                iframeSection.style.display = "none";
            }
        });

        // Xử lý sự kiện nhấn nút Reload
        reloadBtn.addEventListener("click", () => {
            // Lấy lại URL hiện tại của iframe
            const currentSrc = iframeDisplay.src;
            
            // Tải lại iframe bằng cách thiết lập lại src
            iframeDisplay.src = "";
            iframeDisplay.src = currentSrc;
        });

        // Hàm quay về trang chính, ẩn iframe-section
        function goBack() {
            const iframeSection = document.getElementById("iframe-section");
            iframeSection.style.display = "none";  // Ẩn iframe-section
        }

        document.addEventListener("DOMContentLoaded", function () {
    const portfolioContainer = document.querySelector('.portfolio-container');
    const prevButton = document.getElementById('action-button--previous');
    const nextButton = document.getElementById('action-button--next');
    
    let currentGroup = 0;
    const groupSize = 6; // Bạn có thể thay đổi nhóm này tùy theo số lượng box mỗi lần
    const totalItems = portfolioContainer.children.length;
    const totalGroups = Math.ceil(totalItems / groupSize);
    
    // Hàm cập nhật trạng thái của các button
    function updateButtonState() {
        prevButton.disabled = currentGroup === 0;
        nextButton.disabled = currentGroup === totalGroups - 1;
    }
    
    // Hàm hiển thị nhóm portfolio-box hiện tại
    function showCurrentGroup() {
        const items = Array.from(portfolioContainer.children);
        
        // Ẩn tất cả các portfolio-box
        items.forEach(item => item.style.display = 'none');
        
        // Tính chỉ số bắt đầu và kết thúc của nhóm hiện tại
        const start = currentGroup * groupSize;
        const end = start + groupSize;
        
        // Hiển thị các item trong nhóm hiện tại
        for (let i = start; i < end && i < totalItems; i++) {
            items[i].style.display = 'block';
        }
        
        updateButtonState();
    }
    
    // Sự kiện khi click vào nút "Next"
    nextButton.addEventListener('click', () => {
        if (currentGroup < totalGroups - 1) {
            currentGroup++;
            showCurrentGroup();
        }
    });
    
    // Sự kiện khi click vào nút "Previous"
    prevButton.addEventListener('click', () => {
        if (currentGroup > 0) {
            currentGroup--;
            showCurrentGroup();
        }
    });
    
    // Hiển thị nhóm đầu tiên khi trang web được tải
    showCurrentGroup();
});

