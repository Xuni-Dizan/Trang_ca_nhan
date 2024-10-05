let labCount = 2; // Khởi tạo từ 2 vì đã có 2 lab cố định

document.getElementById('addLabButton').addEventListener('click', function() {
    labCount++;
    const labName = `Lab ${labCount}`;
    const labDiv = document.createElement('div');
    labDiv.classList.add('lab');
    labDiv.innerHTML = `<p>${labName}</p>`;
    labDiv.onclick = function() {
        // Bạn có thể cập nhật logic để mở đường dẫn tương ứng nếu cần
        alert(`Lab ${labCount} được thêm vào!`);
    };
    document.getElementById('labsContainer').appendChild(labDiv);
});










