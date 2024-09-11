// 数据模拟，法规数据
let knowledgeData = [
    {
        id: 1,
        name: '某某法规',
        entryTime: '2023-08-08 20:08:00',
        attachmentUrl: 'attachment1.docx',
        status: '未导入知识库',
        properties: [
            { attr: '属性A', field: '字段A', value: '值A' },
            { attr: '属性B', field: '字段B', value: '值B' }
        ],
        fragments: ['知识片段1', '知识片段2', '知识片段3']
    },
    // 更多法规数据...
];

// 页面元素
const knowledgeTableBody = document.getElementById('knowledgeTableBody');
const detailsPage = document.getElementById('detailsPage');
const lawInfoTableBody = document.querySelector('#lawInfoTable tbody');
const propertyTableBody = document.querySelector('#propertyTable tbody');
const knowledgeFragmentTableBody = document.querySelector('#knowledgeFragmentTable tbody');
const splitButton = document.getElementById('splitButton');
const deleteButton = document.getElementById('deleteButton');
const backButton = document.getElementById('backButton');
const mainContainer = document.getElementById('mainContainer');

// 分割页面元素
const splitPage = document.getElementById('splitPage');
const splitLawInfoTableBody = document.getElementById('splitLawInfoTableBody');
const splitPropertyTableBody = document.getElementById('splitPropertyTableBody');
const importButton = document.getElementById('importButton');
const backToDetailsButton = document.getElementById('backToDetailsButton');

// 导入知识库页面元素
const importKnowledgePage = document.getElementById('importKnowledgePage');
const splitMethodSelect = document.getElementById('splitMethod');
const importKnowledgeFragmentTableBody = document.querySelector('#importKnowledgeFragmentTable tbody');
const splitContentButton = document.getElementById('splitContentButton');
const importDataButton = document.getElementById('importDataButton');
const backToSplitPageButton = document.getElementById('backToSplitPageButton');

let currentKnowledgeId = null;
let currentFragments = [];

// 初始化法规列表
function initTable() {
    knowledgeTableBody.innerHTML = '';
    knowledgeData.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.entryTime}</td>
            <td><a href="${item.attachmentUrl}" target="_blank">查看附件</a></td>
            <td>${item.status}</td>
            <td><button onclick="viewDetails(${item.id})">查看详情</button></td>
        `;
        knowledgeTableBody.appendChild(row);
    });
}

// 查看详情
function viewDetails(id) {
    const knowledge = knowledgeData.find(item => item.id === id);
    if (knowledge) {
        currentKnowledgeId = id;
        lawInfoTableBody.innerHTML = `
            <tr>
                <td>${knowledge.name}</td>
                <td>${knowledge.entryTime}</td>
                <td><a href="${knowledge.attachmentUrl}" target="_blank">查看附件</a></td>
            </tr>
        `;
        propertyTableBody.innerHTML = '';
        knowledge.properties.forEach(prop => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${prop.attr}</td><td>${prop.field}</td><td>${prop.value}</td>`;
            propertyTableBody.appendChild(row);
        });
        knowledgeFragmentTableBody.innerHTML = '';
        knowledge.fragments.forEach((fragment, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${index + 1}</td><td>${fragment}</td>`;
            knowledgeFragmentTableBody.appendChild(row);
        });

        detailsPage.classList.remove('hidden');
        mainContainer.classList.add('hidden');
    }
}

// 删除法规
deleteButton.addEventListener('click', () => {
    if (currentKnowledgeId !== null) {
        knowledgeData.splice(knowledgeData.findIndex(item => item.id === currentKnowledgeId), 1);
        detailsPage.classList.add('hidden');
        mainContainer.classList.remove('hidden');
        initTable();
    }
});

// 返回按钮
backButton.addEventListener('click', () => {
    detailsPage.classList.add('hidden');
    mainContainer.classList.remove('hidden');
});

// 点击重新分割按钮，跳转到分割页面
splitButton.addEventListener('click', () => {
    const knowledge = knowledgeData.find(item => item.id === currentKnowledgeId);
    if (knowledge) {
        splitLawInfoTableBody.innerHTML = `
            <tr>
                <td>${knowledge.name}</td>
                <td>${knowledge.entryTime}</td>
                <td><a href="${knowledge.attachmentUrl}" target="_blank">查看附件</a></td>
            </tr>
        `;
        splitPropertyTableBody.innerHTML = '';
        knowledge.properties.forEach(prop => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${prop.attr}</td><td>${prop.field}</td><td>${prop.value}</td>`;
            splitPropertyTableBody.appendChild(row);
        });

        detailsPage.classList.add('hidden');
        splitPage.classList.remove('hidden');
    }
});

// 返回到详情页面按钮
backToDetailsButton.addEventListener('click', () => {
    splitPage.classList.add('hidden');
    detailsPage.classList.remove('hidden');
});

// 点击导入按钮时，跳转到导入知识库页面
importButton.addEventListener('click', () => {
    splitPage.classList.add('hidden');
    importKnowledgePage.classList.remove('hidden');
    const knowledge = knowledgeData.find(item => item.id === currentKnowledgeId);
    if (knowledge) {
        currentFragments = knowledge.fragments.slice();
        renderKnowledgeFragments();
    }
});

// 渲染知识片段列表
function renderKnowledgeFragments() {
    importKnowledgeFragmentTableBody.innerHTML = '';
    currentFragments.forEach((fragment, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${index + 1}</td><td>${fragment}</td>`;
        importKnowledgeFragmentTableBody.appendChild(row);
    });
}

// 点击分割按钮，根据选择的分割方式重新生成知识片段
splitContentButton.addEventListener('click', () => {
    const splitMethod = splitMethodSelect.value;

    if (splitMethod === 'md') {
        currentFragments = currentFragments.map(fragment => fragment + ' (MD分割)');
    } else if (splitMethod === 'text') {
        currentFragments = currentFragments.map(fragment => fragment + ' (文本分割)');
    }

    renderKnowledgeFragments();
});

// 点击导入按钮，将知识片段导入并更新状态
importDataButton.addEventListener('click', () => {
    const knowledge = knowledgeData.find(item => item.id === currentKnowledgeId);
    if (knowledge) {
        knowledge.fragments = currentFragments.slice();
        knowledge.status = '已导入知识库';
        initTable();
        importKnowledgePage.classList.add('hidden');
        detailsPage.classList.remove('hidden');
        renderKnowledgeFragmentsInDetails();
    }

    console.log('数据已同步到后端:', {
        id: currentKnowledgeId,
        fragments: currentFragments,
        status: 'imported'
    });
});

// 在详情页面渲染更新后的知识片段
function renderKnowledgeFragmentsInDetails() {
    const knowledge = knowledgeData.find(item => item.id === currentKnowledgeId);
    if (knowledge) {
        knowledgeFragmentTableBody.innerHTML = '';
        knowledge.fragments.forEach((fragment, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${index + 1}</td><td>${fragment}</td>`;
            knowledgeFragmentTableBody.appendChild(row);
        });
    }
}

// 返回到分割页面
backToSplitPageButton.addEventListener('click', () => {
    importKnowledgePage.classList.add('hidden');
    splitPage.classList.remove('hidden');
});

// 初始化页面
initTable();
