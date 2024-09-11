
        document.addEventListener("DOMContentLoaded", function () {
            const searchForm = document.getElementById("searchForm");
            const titleInput = document.getElementById("titleInput");
            const keywordInput = document.getElementById("keywordInput");
            const effectDateInput = document.getElementById("effectDateInput");
            const issuerInput = document.getElementById("issuerInput");
            const operatorSelect = document.getElementById("operator");
            const resultTextArea = document.getElementById("resultTextArea");

            searchForm.addEventListener("submit", function (event) {
                event.preventDefault();

                const title = titleInput.value.trim();
                const keyword = keywordInput.value.trim();
                const effectDate = effectDateInput.value.trim();
                const issuer = issuerInput.value.trim();
                const operator = operatorSelect.value;

                // 构建查询字符串
                let query = "";
                if (title) query += `标题: "${title}"`;
                if (keyword) {
                    if (query) query += ` ${operator} `;
                    query += `包含文字: "${keyword}"`;
                }
                if (effectDate) {
                    if (query) query += ` ${operator} `;
                    query += `生效时间: "${effectDate}"`;
                }
                if (issuer) {
                    if (query) query += ` ${operator} `;
                    query += `发布单位: "${issuer}"`;
                }

                // 显示结果到文本框中
                if (query) {
                    resultTextArea.value = `搜索条件: ${query}`;
                } else {
                    resultTextArea.value = "未输入任何搜索条件";
                }
            });
        });
