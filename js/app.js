// This file contains the main JavaScript functionality for the memo application.
// It includes features for adding, deleting, and displaying memos.

document.addEventListener('DOMContentLoaded', () => {
    const memoInput = document.getElementById('memoInput');
    const addMemoButton = document.getElementById('addMemoButton');
    const memoList = document.getElementById('memoList');
    const clearAllButton = document.getElementById('clearAllButton');

    // メモは { text, time } の配列で管理
    let memos = JSON.parse(localStorage.getItem('memos')) || [];

    function formatDate(date) {
        return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }

    function renderMemos() {
        memoList.innerHTML = '';
        memos.forEach((memo, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${memo.text}</span>
                <span style="font-size:0.8em;color:#888;margin-left:8px;">(${memo.time})</span>
                <button class="deleteBtn" data-index="${index}">削除</button>
            `;
            memoList.appendChild(li);
        });

        // 削除ボタンにイベント
        document.querySelectorAll('.deleteBtn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                memos.splice(idx, 1);
                localStorage.setItem('memos', JSON.stringify(memos));
                renderMemos();
            });
        });
    }

    addMemoButton.addEventListener('click', () => {
        const memoText = memoInput.value.trim();
        if (memoText) {
            const now = new Date();
            memos.push({
                text: memoText,
                time: formatDate(now)
            });
            localStorage.setItem('memos', JSON.stringify(memos));
            renderMemos();
            memoInput.value = '';
        }
    });

    clearAllButton.addEventListener('click', () => {
        if (confirm('すべてのメモを削除しますか？')) {
            memos = [];
            localStorage.removeItem('memos');
            renderMemos();
        }
    });

    renderMemos();
});