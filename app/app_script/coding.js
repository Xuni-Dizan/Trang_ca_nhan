// Khởi tạo editor cho HTML, CSS và JavaScript với autocomplete
let htmlEditor = CodeMirror(document.getElementById('editor-html'), {
    mode: 'htmlmixed',
    theme: 'material-darker',
    lineNumbers: true,
    matchBrackets: true,
    indentUnit: 4,
    extraKeys: {
        "Ctrl-Space": "autocomplete", // Phím tắt Ctrl + Space để kích hoạt autocomplete
        "Ctrl-Q": function(cm) { cm.foldCode(cm.getCursor()); } // Tính năng gập mã
    },
    hintOptions: {
        completeSingle: false, // Không tự động hoàn thành khi chỉ có một gợi ý
        hint: function(cm) {
            var cur = cm.getCursor();
            return CodeMirror.hint.html(cm, {
                /* Gợi ý về các thẻ HTML và thuộc tính */
            });
        },
        alignWithWord: true, // Căn chỉnh với từ đang được gõ
        // Gợi ý thêm các thuộc tính HTML dựa trên vị trí con trỏ
    }
});

let cssEditor = CodeMirror(document.getElementById('editor-css'), {
    mode: 'css',
    theme: 'material-darker',
    lineNumbers: true,
    matchBrackets: true,
    indentUnit: 4,
    extraKeys: {
        "Ctrl-Space": "autocomplete", // Phím tắt Ctrl + Space để kích hoạt autocomplete
        "Ctrl-Q": function(cm) { cm.foldCode(cm.getCursor()); }
    },
    hintOptions: {
        completeSingle: false,
        hint: function(cm) {
            var cur = cm.getCursor();
            return CodeMirror.hint.css(cm, {
                /* Gợi ý về các thuộc tính CSS */
            });
        },
        alignWithWord: true, // Căn chỉnh với từ đang được gõ
        // Gợi ý các thuộc tính CSS khi con trỏ đang ở trong giá trị của thuộc tính CSS
    }
});

let jsEditor = CodeMirror(document.getElementById('editor-js'), {
    mode: 'javascript',
    theme: 'material-darker',
    lineNumbers: true,
    matchBrackets: true,
    indentUnit: 4,
    extraKeys: {
        "Ctrl-Space": "autocomplete", // Phím tắt Ctrl + Space để kích hoạt autocomplete
        "Ctrl-Q": function(cm) { cm.foldCode(cm.getCursor()); }
    },
    hintOptions: {
        completeSingle: false,
        hint: function(cm) {
            var cur = cm.getCursor();
            return CodeMirror.hint.javascript(cm, {
                /* Gợi ý về các hàm và đối tượng JavaScript */
            });
        },
        alignWithWord: true, // Căn chỉnh với từ đang được gõ
        // Gợi ý các hàm hoặc biến JavaScript khi con trỏ đang trong một hàm hoặc đối tượng JavaScript
    }
});


function runCode() {
    const htmlCode = htmlEditor.getValue();
    const cssCode = cssEditor.getValue();
    const jsCode = jsEditor.getValue();
    const iframe = document.getElementById('result-frame');
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    const completeCode = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>${cssCode}</style>
            </head>
            <body>
                ${htmlCode}
                <script>${jsCode}<\/script>
            </body>
        </html>
    `;
    iframeDocument.open();
    iframeDocument.write(completeCode);
    iframeDocument.close();
}

function showEditor(editor) {
    document.getElementById('editor-html').style.display = (editor === 'html') ? 'block' : 'none';
    document.getElementById('editor-css').style.display = (editor === 'css') ? 'block' : 'none';
    document.getElementById('editor-js').style.display = (editor === 'js') ? 'block' : 'none';
}

function toggleAI() {
    const aiSection = document.getElementById('ai');
    if (aiSection.style.display === 'none' || aiSection.style.display === '') {
        aiSection.style.display = 'block';
    } else {
        aiSection.style.display = 'none';
    }
}

// Lưu mã vào localStorage khi thay đổi
function saveCode() {
    localStorage.setItem('html', htmlEditor.getValue());
    localStorage.setItem('css', cssEditor.getValue());
    localStorage.setItem('js', jsEditor.getValue());
}

// Lắng nghe sự kiện thay đổi trên các editor để lưu mã
htmlEditor.on('change', saveCode);
cssEditor.on('change', saveCode);
jsEditor.on('change', saveCode);

// Khi tải lại trang, nạp mã từ localStorage (nếu có)
window.onload = function () {
    const savedHtml = localStorage.getItem('html');
    const savedCss = localStorage.getItem('css');
    const savedJs = localStorage.getItem('js');

    if (savedHtml) htmlEditor.setValue(savedHtml);
    if (savedCss) cssEditor.setValue(savedCss);
    if (savedJs) jsEditor.setValue(savedJs);
};

// Hàm để chuyển đổi giữa các editor
function showEditor(editor) {
    document.getElementById('editor-html').style.display = (editor === 'html') ? 'block' : 'none';
    document.getElementById('editor-css').style.display = (editor === 'css') ? 'block' : 'none';
    document.getElementById('editor-js').style.display = (editor === 'js') ? 'block' : 'none';
}

// Toggle AI Section
function toggleAI() {
    const aiSection = document.getElementById('ai');
    if (aiSection.style.display === 'none' || aiSection.style.display === '') {
        aiSection.style.display = 'block';
    } else {
        aiSection.style.display = 'none';
    }
}

// Lưu mã vào localStorage khi tải lại trang
// window.onload = function () {
//     const savedHtml = localStorage.getItem('html');
//     const savedCss = localStorage.getItem('css');
//     const savedJs = localStorage.getItem('js');

//     if (savedHtml) htmlEditor.setValue(savedHtml);
//     if (savedCss) cssEditor.setValue(savedCss);
//     if (savedJs) jsEditor.setValue(savedJs);
// };

// // Hàm lưu mã vào localStorage
// function saveCode() {
//     localStorage.setItem('html', htmlEditor.getValue());
//     localStorage.setItem('css', cssEditor.getValue());
//     localStorage.setItem('js', jsEditor.getValue());
// }