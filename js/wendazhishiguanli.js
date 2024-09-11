 // 模拟问答数据
           let qaData = [
             { name: "常见问题1", inputTime: "2024-09-07 12:00", content: "问题的答案1", status: "已导入数据库" },
             { name: "常见问题2", inputTime: "2024-09-07 12:05", content: "问题的答案2", status: "未导入数据库" }
           ];
       
           // 页面切换功能
           function showSection(sectionId) {
             const sections = ['qa-management', 'qa-entry', 'qa-details', 'qa-split'];
             sections.forEach(section => {
               document.getElementById(section).classList.add('hidden');
             });
             document.getElementById(sectionId).classList.remove('hidden');
           }
       
           // 加载问答列表
           function loadQAList() {
			   /* fetch('/api/questions')  // 后端接口：获取所有问答
    .then(response => response.json())
    .then(data => {
      qaData = data;  // 使用后端返回的问答数据*/
             const qaList = document.getElementById('qa-list');
             qaList.innerHTML = '';
             qaData.forEach((qa, index) => {
               qaList.innerHTML += `
                 <tr>
                   <td>${qa.name}</td>
                   <td>${qa.inputTime}</td>
                   <td>${qa.content}</td>
                   <td>${qa.status}</td>
                   <td>
                     <a href="javascript:void(0)" onclick="viewDetails(${index})">查看详情</a>
                     <a href="javascript:void(0)" onclick="deleteQA(${index})">删除</a>
                   </td>
                 </tr>
               `;
             });
           }
       // .catch(error => console.error('Error:', error));注释错误
           // 查看详情
           function viewDetails(index) {
             localStorage.setItem('selectedQA', JSON.stringify(qaData[index]));
             showSection('qa-details');
             loadDetails();
           }
       /*获取问答详情接口 function viewDetails(index) {
  const selectedQA = qaData[index];

  从后端获取详细信息
  fetch(`/api/questions/${selectedQA.id}`)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('selectedQA', JSON.stringify(data));  // 存储详细信息
      showSection('qa-details');
      loadDetails();
    })
    .catch(error => console.error('Error:', error));
}
GET /api/questions/:id：后端返回指定问答的详细信息，包括知识片段。*/
           // 加载详情页面的知识片段
           function loadDetails() {
             const selectedQA = JSON.parse(localStorage.getItem('selectedQA'));
             const fragmentList = document.getElementById('fragment-list');
             fragmentList.innerHTML = `
               <tr>
                 <td>1</td>
                 <td>${selectedQA.content} 片段1</td>
               </tr>
               <tr>
                 <td>2</td>
                 <td>${selectedQA.content} 片段2</td>
               </tr>
             `;
           }
       
           // 删除问答条目
           function deleteQA(index) {
             if (confirm("确定要删除吗？")) {
               qaData.splice(index, 1);
               loadQAList();
               showSection('qa-management');
             }
           }
		   /*删除问答接口 function deleteQA(index) {
  const selectedQA = qaData[index];
  
  if (confirm("确定要删除吗？")) {
    fetch(`/api/questions/${selectedQA.id}`, {  // 使用问答的唯一 id
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
      qaData.splice(index, 1);
      loadQAList();  // 重新加载问答列表
    })
    .catch(error => console.error('Error:', error));
  }
}*/
       
           // 删除当前详情条目
           function deleteEntry() {
             const selectedQA = JSON.parse(localStorage.getItem('selectedQA'));
             const index = qaData.findIndex(qa => qa.name === selectedQA.name);
             deleteQA(index);
             showSection('qa-management');
           }
       
           // 问答录入提交
           document.getElementById('qa-form').addEventListener('submit', function(event) {
             event.preventDefault();
             const title = document.getElementById('title').value;
             const content = document.getElementById('content').value;
			 /* 问答录入接口发送新问答数据到后端
  fetch('/api/questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  })
  .then(response => response.json())
  .then(data => {
    alert('问答已保存');*/
             qaData.push({ name: title, inputTime: new Date().toLocaleString(), content: content, status: "未导入数据库" });
             loadQAList();
             showSection('qa-management');
			 // .catch(error => console.error('Error:', error));
           });
       
           // 分割功能
           function performSplit() {
             const method = document.getElementById('split-method').value;
             const results = [
               "分割结果片段1 (方式: " + method + ")",
               "分割结果片段2 (方式: " + method + ")"
             ];
             const resultBody = document.getElementById('split-results');
             resultBody.innerHTML = '';
             results.forEach((result, index) => {
               resultBody.innerHTML += `
                 <tr>
                   <td>${index + 1}</td>
                   <td>${result}</td>
                 </tr>
               `;
             });
           }
       /* 
	   分割问答接口 分割功能
	   function performSplit() {
	     const method = document.getElementById('split-method').value;
	     const selectedQA = JSON.parse(localStorage.getItem('selectedQA'));
	   
	     发送分割请求到后端
	     fetch(`/api/questions/${selectedQA.id}/split`, {
	       method: 'POST',
	       headers: { 'Content-Type': 'application/json' },
	       body: JSON.stringify({ method })
	     })
	     .then(response => response.json())
	     .then(results => {
	       const resultBody = document.getElementById('split-results');
	       resultBody.innerHTML = '';
	       results.forEach((result, index) => {
	         resultBody.innerHTML += `
	           <tr>
	             <td>${index + 1}</td>
	             <td>${result}</td>
	           </tr>
	         `;
	       });
	     })
	     .catch(error => console.error('Error:', error));
	   }*/
          // 导入到数据库功能
          function importToDB() {
            // 模拟导入数据库操作
            alert("知识片段已导入数据库");
            
            // 获取当前选择的问答数据
            const selectedQA = JSON.parse(localStorage.getItem('selectedQA'));
            
            // 在 qaData 中查找对应问答，并修改状态
            const index = qaData.findIndex(qa => qa.name === selectedQA.name);
            if (index !== -1) {
              qaData[index].status = "已导入数据库";  // 更新状态为“已导入数据库”
            }
            
            // 重新加载问答列表以显示更新后的状态
            loadQAList();
            
            // 返回管理页面
            showSection('qa-management');
          }

       /* 
	   导入知识片断接口
	   导入到数据库功能
function importToDB() {
  const selectedQA = JSON.parse(localStorage.getItem('selectedQA'));
  
  // 向后端发送导入请求
  fetch(`/api/questions/${selectedQA.id}/import`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fragments: selectedQA.fragments })
  })
  .then(response => response.json())
  .then(() => {
    alert("知识片段已导入数据库");
    showSection('qa-management');  // 返回管理页面
  })
  .catch(error => console.error('Error:', error));
}*/
           // 页面加载时显示问答列表
           window.onload = function() {
             loadQAList();
           }
		   /* 
		  1. GET /api/questions：获取所有问答数据。
		   2.POST /api/questions：提交新的问答。
		   3.DELETE /api/questions/:id：删除特定问答。
		   4.GET /api/questions/:id：获取特定问答的详细信息。
		   5.POST /api/questions/:id/split：执行知识片段的分割。
		   6.POST /api/questions/:id/import：将分割后的知识片段导入数据库*/