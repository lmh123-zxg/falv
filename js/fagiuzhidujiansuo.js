
        document.addEventListener("DOMContentLoaded", function () {
            const searchForm = document.getElementById("searchForm");
            const searchInput = document.getElementById("searchInput");

            // 获取 LLM 流式问答框
            const llmResponseBox = document.getElementById("llmResponseBox");

            // 获取链接元素
            const sparseSearchLink = document.getElementById("sparseSearchLink");
            const denseSearchLink = document.getElementById("denseSearchLink");
            const fullTextSearchLink = document.getElementById("fullTextSearchLink");

            // 获取用于显示检索结果的 DOM 元素
            const resultBox = document.getElementById("resultBox");
            const resultList = document.getElementById("resultList");
            const resultTitle = document.getElementById("resultTitle");

            // 提交搜索表单时，生成 LLM 流式问答并显示隐藏的 LLM 框
            searchForm.addEventListener("submit", function (event) {
                event.preventDefault();

                const query = searchInput.value.trim();

                // 显示 LLM 流式回答框
                llmResponseBox.style.display = 'block';

                // 清空之前的 LLM 流式回答
                document.getElementById("llmOutput").innerHTML = "正在处理...";

                // 模拟 LLM 流式回答
                setTimeout(() => {
                    document.getElementById("llmOutput").innerHTML = `LLM 回答：对于 "${query}" 的智能回答内容...`;
                }, 1000);
            });

            // 函数：显示检索结果
            function displayResults(title, results) {
                resultTitle.innerText = title;
                resultList.innerHTML = results;
                resultBox.style.display = 'block'; // 显示结果框
            }

            // 稀疏检索结果点击事件
            sparseSearchLink.addEventListener("click", function (event) {
                event.preventDefault();
                displayResults("稀疏检索结果", `
                    <li>稀疏检索结果 1: 相关条目 A</li>
                    <li>稀疏检索结果 2: 相关条目 B</li>
                `);
            });

            // 稠密检索结果点击事件
            denseSearchLink.addEventListener("click", function (event) {
                event.preventDefault();
                displayResults("稠密检索结果", `
                    <li>稠密检索结果 1: 相关条目 C</li>
                    <li>稠密检索结果 2: 相关条目 D</li>
                `);
            });

            // 全文检索结果点击事件
            fullTextSearchLink.addEventListener("click", function (event) {
                event.preventDefault();
                displayResults("全文检索结果", `
                    <li>全文检索结果 1: 完整条目 E</li>
                    <li>全文检索结果 2: 完整条目 F</li>
                `);
            });
        });
