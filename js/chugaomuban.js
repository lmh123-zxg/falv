let templates = [
    { title: '模板名称1', summary: '这是一个摘要', content: '这是模板的内容' }
];

let editingIndex = null; // 用于追踪正在编辑的模板索引
let viewingMode = false; // 用于标记是否处于查看模式

// 显示表单，用于新增或编辑
function showForm() {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('manage-container').style.display = 'none';
}

// 返回模板列表
function goBack() {
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('manage-container').style.display = 'block';
    document.getElementById('form-title').textContent = '查看初稿模板'; // 重置标题
    document.getElementById('title').disabled = false; // 解除禁用
    document.getElementById('summary').disabled = false;
    document.getElementById('content').disabled = false;
    document.getElementById('save-button').style.display = 'inline'; // 显示保存按钮
    editingIndex = null; // 清除编辑状态
    viewingMode = false; // 清除查看状态
}

// 保存模板数据
function saveTemplate() {
    const title = document.getElementById('title').value;
    const summary = document.getElementById('summary').value;
    const content = document.getElementById('content').value;

    if (editingIndex !== null) {
        // 编辑模式，更新现有模板
        templates[editingIndex] = { title, summary, content };
    } else {
        // 新增模式，添加新模板
        templates.push({ title, summary, content });
    }

    updateTemplateList(); // 更新列表
    goBack(); // 返回列表视图
}

// 查看模板
function viewTemplate(index) {
    const template = templates[index];

    // 填充表单数据
    document.getElementById('title').value = template.title;
    document.getElementById('summary').value = template.summary;
    document.getElementById('content').value = template.content;

    // 禁用所有输入框
    document.getElementById('title').disabled = true;
    document.getElementById('summary').disabled = true;
    document.getElementById('content').disabled = true;

    // 隐藏保存按钮
    document.getElementById('save-button').style.display = 'none';

    // 设置表单标题为“查看模板”
    document.getElementById('form-title').textContent = '查看初稿模板';
    showForm(); // 显示表单
}

// 编辑模板
function editTemplate(index) {
    const template = templates[index];
    editingIndex = index; // 设置为当前编辑的模板索引

    // 填充表单数据
    document.getElementById('title').value = template.title;
    document.getElementById('summary').value = template.summary;
    document.getElementById('content').value = template.content;

    // 启用输入框
    document.getElementById('title').disabled = false;
    document.getElementById('summary').disabled = false;
    document.getElementById('content').disabled = false;

    // 显示保存按钮
    document.getElementById('save-button').style.display = 'inline';

    // 设置表单标题为“编辑模板”
    document.getElementById('form-title').textContent = '编辑初稿模板';
    showForm(); // 显示表单
}

// 删除模板
function deleteTemplate(index) {
    templates.splice(index, 1); // 从数组中删除模板
    updateTemplateList(); // 更新列表
}

// 更新模板列表
function updateTemplateList() {
    const tableBody = document.querySelector('#template-table tbody');
    tableBody.innerHTML = ''; // 清空表格内容

    templates.forEach((template, index) => {
        const row = `<tr>
            <td>${template.title}</td>
            <td>${new Date().toLocaleDateString()}</td>
            <td>${template.summary}</td>
            <td>
                <button class="btn" onclick="viewTemplate(${index})">查看</button>
                <button class="btn" onclick="editTemplate(${index})">编辑</button>
                <button class="btn btn-delete" onclick="deleteTemplate(${index})">删除</button>
            </td>
        </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

// 初始化时更新模板列表
updateTemplateList();
