// Caching các phần tử DOM
const modalDialog = document.querySelector(".copy-link-dialog");
const closeBtn = document.querySelector(".close-btn");
const copyBtn = document.querySelector(".copy-btn");
const copyInput = document.getElementById("copy-link-input");
const copyText = document.getElementById("copy-text");
const iframeSection = document.getElementById("iframe-section");
const iframeDisplay = document.getElementById("iframe-display");
const downloadBtn = document.getElementById("download-btn");
const githubBtn = document.getElementById("github-btn");
const reloadBtn = document.getElementById("reload-btn");
const portfolioContainer = document.querySelector('.portfolio-container');
const prevButton = document.getElementById('action-button--previous');
const nextButton = document.getElementById('action-button--next');

let currentGroup = 0;
const groupSize = 6;
let totalItems = 0;
let totalGroups = 0;

// Hàm mở modal và cài đặt vị trí
function openModal(e) {
    const link = e.target.closest('.share-btn').getAttribute('data-link');
    copyInput.value = link;

    const rect = e.target.closest('.share-btn').getBoundingClientRect();
    modalDialog.style.top = `${rect.top + window.scrollY + 40}px`;
    modalDialog.style.left = `${rect.left + window.scrollX}px`;

    modalDialog.showModal();
}

// Đóng modal khi nhấn nút đóng
closeBtn.addEventListener("click", () => {
    modalDialog.close();
    modalDialog.classList.remove("copy-link-dialog--fadeout");
});

// Hàm sao chép liên kết
function copyLink() {
    copyInput.select();
    copyInput.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyInput.value)
        .then(() => {
            showCopyFeedback("Copied!", "#28a745");
        })
        .catch((err) => {
            console.error("Error copying text: ", err);
            showCopyFeedback("Failed to Copy!", "#dc3545");
        });
}

// Hiển thị phản hồi sau khi sao chép
function showCopyFeedback(message, color) {
    copyText.textContent = message;
    copyText.style.color = color;

    setTimeout(() => {
        copyText.textContent = "Copy Link";
        copyText.style.color = "";
    }, 2000);
}

// Sự kiện sao chép liên kết
copyBtn.addEventListener("click", copyLink);

// Hàm mở iframe
function openIframe(e) {
    e.preventDefault();
    const btn = e.target.closest('.open-iframe-btn');
    if (!btn) return;

    const iframeLink = btn.getAttribute("data-link");
    const githubLink = btn.getAttribute("data-github");

    iframeDisplay.src = iframeLink;
    githubBtn.onclick = () => window.open(githubLink, '_blank');

    const downloadLink = "https://downgit.github.io/#/home?url=" + encodeURIComponent(githubLink);
    downloadBtn.onclick = () => {
        window.open(downloadLink, '_blank');
    };

    iframeSection.style.display = "block";
}

// Đóng iframe khi click ngoài
window.addEventListener("click", (e) => {
    if (e.target === iframeSection) {
        iframeSection.style.display = "none";
    }
});

// Tải lại iframe
reloadBtn.addEventListener("click", () => {
    iframeDisplay.src = iframeDisplay.src;
});

// Hàm quay về trang chính
function goBack() {
    iframeSection.style.display = "none";
}

// Quản lý hiển thị portfolio với nút Previous và Next
document.addEventListener("DOMContentLoaded", function () {
    // Sử dụng sự kiện ủy quyền cho các nút
    portfolioContainer.addEventListener('click', function(e) {
        if (e.target.closest('.share-btn')) {
            openModal(e);
        }
        if (e.target.closest('.open-iframe-btn')) {
            openIframe(e);
        }
    });

    // Hàm cập nhật trạng thái nút
    function updateButtonState() {
        prevButton.disabled = currentGroup === 0;
        nextButton.disabled = currentGroup >= totalGroups - 1;
    }

    // Hàm hiển thị nhóm hiện tại với 6 portfolio-box
    function showCurrentGroup() {
        const items = Array.from(portfolioContainer.children);
        const start = currentGroup * groupSize;
        const end = start + groupSize;
        items.forEach((item, index) => {
            item.style.display = (index >= start && index < end) ? 'block' : 'none';
        });
        updateButtonState();

        // Lazy load iframes cho nhóm hiện tại
        const currentItems = items.slice(start, end);
        currentItems.forEach(item => {
            const iframe = item.querySelector('iframe');
            if (iframe && !iframe.src) {
                iframe.src = iframe.dataset.src;
            }
        });
    }

    // Sự kiện nút tiếp theo
    nextButton.addEventListener('click', () => {
        if (currentGroup < totalGroups - 1) {
            currentGroup++;
            showCurrentGroup();
        }
    });

    // Sự kiện nút trước
    prevButton.addEventListener('click', () => {
        if (currentGroup > 0) {
            currentGroup--;
            showCurrentGroup();
        }
    });

    // Tải dữ liệu portfolio
    fetchPortfolioData();

    // Hàm tải dữ liệu portfolio
    function fetchPortfolioData() {
        fetch('Json/portfolio_data.json')
            .then(response => response.json())
            .then(data => {
                const fragment = document.createDocumentFragment();
                data.portfolio.forEach(item => {
                    const portfolioBox = createPortfolioBox(item);
                    fragment.appendChild(portfolioBox);
                });
                portfolioContainer.appendChild(fragment);
                totalItems = data.portfolio.length;
                totalGroups = Math.ceil(totalItems / groupSize);
                showCurrentGroup();
            })
            .catch(error => console.error('Error loading portfolio data:', error));
    }

    // Hàm tạo portfolio box
    function createPortfolioBox(item) {
        const box = document.createElement('div');
        box.id = item.id;
        box.className = 'portfolio-box';
        box.style.display = 'none';

        const iframe = document.createElement('iframe');
        iframe.dataset.src = item.iframeSrc;
        iframe.loading = 'lazy';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.overflow = 'hidden';
        iframe.scrolling = 'yes';
        iframe.frameBorder = '0';
        box.appendChild(iframe);

        const layer = document.createElement('div');
        layer.className = 'portfolio-layer';

        const title = document.createElement('h4');
        title.innerHTML = `<b>${item.title}</b>`;
        layer.appendChild(title);

        const description = document.createElement('p');
        description.textContent = item.description;
        layer.appendChild(description);

        const timestamp = document.createElement('p');
        timestamp.innerHTML = `<b>Đăng tải:</b> <span class="timestamp">${item.timestamp}</span>`;
        layer.appendChild(timestamp);

        const linksDiv = document.createElement('div');
        linksDiv.className = 'links-1';

        const externalLink = document.createElement('a');
        externalLink.className = 'open-iframe-btn';
        externalLink.setAttribute('data-box-id', item.id);
        externalLink.setAttribute('data-link', item.link);
        externalLink.setAttribute('data-github', item.github);
        externalLink.innerHTML = `<i class='bx bx-link-external'></i>`;
        linksDiv.appendChild(externalLink);

        const shareButton = document.createElement('button');
        shareButton.type = 'button';
        shareButton.className = 'share-btn';
        shareButton.setAttribute('data-box-id', item.id);
        shareButton.setAttribute('data-link', item.link);
        shareButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-share" width="24" height="24"
                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M8.7 10.7l6.6 -3.4" />
                <path d="M8.7 13.3l6.6 3.4" />
            </svg>
        `;
        linksDiv.appendChild(shareButton);

        layer.appendChild(linksDiv);
        box.appendChild(layer);

        return box;
    }
});
