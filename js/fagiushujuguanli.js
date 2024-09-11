
            let editingRow = null; // 跟踪正在修改的行
            let isShowingAll = false; // 记录当前是否显示全部行

            // 模态框控制
            var modal = document.getElementById("addModal");
            document.getElementById("addElementBtn").onclick = function () {
                document.getElementById("modalTitle").innerText = "新增模板";
                editingRow = null;  // 清空编辑状态
                clearModalInputs(); // 清空输入框
                modal.style.display = "block";
            }
            function closeModal() {
                modal.style.display = "none";
            }

            // 清空模态框输入
            function clearModalInputs() {
                document.getElementById("elementName").value = "";
                document.getElementById("fieldName").value = "";
                document.getElementById("dataExample").value = "";
                document.getElementById("defaultValue").value = "";
            }

            // 提交新增或修改要素
            function submitElement() {
                let elementName = document.getElementById("elementName").value;
                let fieldName = document.getElementById("fieldName").value;
                let dataExample = document.getElementById("dataExample").value;
                let defaultValue = document.getElementById("defaultValue").value;

                if (editingRow === null) {
                    // 新增要素
                    let table = document.getElementById("elementList");
                    let row = table.insertRow();
                    row.innerHTML = `
                    <td>${elementName}</td>
                    <td>${fieldName}</td>
                    <td>${dataExample}</td>
                    <td>${defaultValue}</td>
                    <td>
                        <button onclick="editElement(this)">修改</button>
                        <button onclick="deleteElement(this)">删除</button>
                    </td>
                `;
                } else {
                    // 修改现有行
                    editingRow.cells[0].innerText = elementName;
                    editingRow.cells[1].innerText = fieldName;
                    editingRow.cells[2].innerText = dataExample;
                    editingRow.cells[3].innerText = defaultValue;
                    editingRow = null;  // 清空编辑状态
                }
                closeModal();
                displayRows(); // 刷新表格显示行数
            }

            // 修改要素，弹出模态框
            function editElement(button) {
                editingRow = button.parentNode.parentNode;  // 设置当前修改的行
                document.getElementById("modalTitle").innerText = "修改要素模板";
                document.getElementById("elementName").value = editingRow.cells[0].innerText;
                document.getElementById("fieldName").value = editingRow.cells[1].innerText;
                document.getElementById("dataExample").value = editingRow.cells[2].innerText;
                document.getElementById("defaultValue").value = editingRow.cells[3].innerText;
                modal.style.display = "block";
            }

            // 删除要素
            function deleteElement(button) {
                let row = button.parentNode.parentNode;
                document.getElementById("elementTable").deleteRow(row.rowIndex);
                displayRows(); // 刷新表格显示行数
            }

            // 查找要素
            function searchElement() {
                let input = document.getElementById("searchInput").value.toLowerCase();
                let table = document.getElementById("elementTable");
                let tr = table.getElementsByTagName("tr");

                for (let i = 1; i < tr.length; i++) {
                    tr[i].style.display = "none";  // 隐藏所有行
                    let td = tr[i].getElementsByTagName("td");
                    for (let j = 0; j < td.length; j++) {
                        if (td[j].innerText.toLowerCase().indexOf(input) > -1) {
                            tr[i].style.display = "";  // 显示符合条件的行
                            break;
                        }
                    }
                }
            }

            // 重置查找框
            function resetSearch() {
                document.getElementById("searchInput").value = "";  // 清空查找输入框
                let table = document.getElementById("elementTable");
                let tr = table.getElementsByTagName("tr");

                // 显示所有行
                for (let i = 1; i < tr.length; i++) {
                    tr[i].style.display = "";
                }
            }

            // 默认显示前五行，显示/隐藏所有数据
            function toggleRows() {
                isShowingAll = !isShowingAll;
                displayRows();
            }

            function displayRows() {
                let table = document.getElementById("elementTable");
                let rows = table.getElementsByTagName("tr");

                for (let i = 1; i < rows.length; i++) {
                    if (i > 5 && !isShowingAll) {
                        rows[i].style.display = "none"; // 隐藏超过五行的部分
                    } else {
                        rows[i].style.display = ""; // 显示所有行
                    }
                }

                // 更新按钮文本
                let button = document.querySelector(".show-more-btn");
                button.innerText = isShowingAll ? "显示五行" : "显示更多";
            }

            // 初始化时显示五行
            window.onload = function () {
                displayRows();
            }
   