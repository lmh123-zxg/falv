// script.js

document.addEventListener("DOMContentLoaded", function() {
    const similarClauseForm = document.getElementById("similarClauseForm");
    const clauseInput = document.getElementById("clauseInput");
    const similarResultList = document.getElementById("similarResultList");

    similarClauseForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const clause = clauseInput.value.trim();

        // 清空之前的结果
        similarResultList.innerHTML = "正在检索相似条款...";

        // 模拟检索相似条款
        setTimeout(() => {
            similarResultList.innerHTML = `
                <div style="" class="result-item">
                    <p><strong>相似条款 1:</strong> 与输入条款 "${clause}" 相似的条款 A</p >
                </div>
                <div class="result-item">
                    <p><strong>相似条款 2:</strong> 与输入条款 "${clause}" 相似的条款 B</p >
                </div>
                <div class="result-item">
                    <p><strong>相似条款 3:</strong> 与输入条款 "${clause}" 相似的条款 C</p >
                </div>
            `;
        }, 1500); // 模拟检索延迟
    });
});
