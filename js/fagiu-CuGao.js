
    // 获取元素
    const inputText = document.getElementById('inputText');
    const frameworkOutput = document.getElementById('frameworkOutput');
    const draftOutput = document.getElementById('draftOutput');
    const generateFrameworkBtn = document.getElementById('generateFrameworkBtn');
    const generateDraftBtn = document.getElementById('generateDraftBtn');
    const exportBtn = document.getElementById('exportBtn');

    // 生成法规框架的函数
    generateFrameworkBtn.onclick = function() {
        const text = inputText.value;
        if (text) {
            frameworkOutput.textContent = `法规框架：\n${text}制定\n\n第一章 总则\n\n第二章 XXXX`;
        } else {
            alert('请输入提示词');
        }
    };

    // 生成法规初稿的函数
    generateDraftBtn.onclick = function() {
        const text = inputText.value;
        if (text) {
            draftOutput.textContent = `法规初稿：\n${text}制定\n\n第一条 总则\n\n第二条 XXXXX`;
        } else {
            alert('请输入提示词');
        }
    };

    // 导出功能
    exportBtn.onclick = function() {
        const frameworkContent = frameworkOutput.textContent;
        const draftContent = draftOutput.textContent;
        
        // 拼接框架和初稿内容
        const combinedContent = `${frameworkContent}\n\n${draftContent}`;
        
        // 创建Blob对象
        const blob = new Blob([combinedContent], { type: 'text/plain' });

        // 创建隐藏的下载链接
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = '法规框架和初稿.txt';

        // 触发下载
        document.body.appendChild(link);  // 必须把链接添加到body中
        link.click();

        // 释放URL对象和删除临时下载链接
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
    };
