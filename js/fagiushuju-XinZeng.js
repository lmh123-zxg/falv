
        // Get the modals
        var modal = document.getElementById("myModal");
        var newPropertyModal = document.getElementById("newPropertyModal");
        var newRelationModal = document.getElementById("newRelationModal");
        var modifyPropertiesModal = document.getElementById("modifyPropertiesModal");
        var modifyRelationsModal = document.getElementById("modifyRelationsModal");

        // Get the buttons that open the modals
        var extractParamsBtn = document.getElementById("extract-params-btn");
        var newPropertyBtn = document.getElementById("new-property-btn");
        var newRelationBtn = document.getElementById("new-relation-btn");

        // Get the <span> elements that close the modals
        var spanCloseButtons = document.getElementsByClassName("close");

        // Get extract button
        var extractBtn = document.getElementById("extractBtn");

        // Get submit buttons
        var submitBtn = document.getElementById("submitBtn");
        var extractSubmitBtn = document.getElementById("extractSubmitBtn");
        var newPropertySubmitBtn = document.getElementById("newPropertySubmitBtn");
        var newRelationSubmitBtn = document.getElementById("newRelationSubmitBtn");
        var confirmModifyPropertiesBtn = document.getElementById("confirmModifyPropertiesBtn");
        var confirmModifyRelationsBtn = document.getElementById("confirmModifyRelationsBtn");

        // Get return and cancel buttons
        var returnCancelBtns = document.querySelectorAll('.return-btn,.cancel');

        // Get tables
        var propertiesTable = document.getElementById('propertiesTable');
        var newPropertiesTable = document.getElementById('newPropertiesTable');
        var relationsTable = document.getElementById('relationsTable');

        // Function to open a modal
        function openModal(modal) {
            modal.style.display = "block";
        }

        // Function to close a modal
        function closeModal(modal) {
            modal.style.display = "none";
        }

        // Open the "属性参数抽取" modal
        extractParamsBtn.onclick = function () {
            openModal(modal);
        };

        // Open the "新增属性" modal
        newPropertyBtn.onclick = function () {
            openModal(newPropertyModal);
        };

        // Open the "新增关联法规" modal
        newRelationBtn.onclick = function () {
            openModal(newRelationModal);
        };

        // Close the modals when clicking the close button
        for (var i = 0; i < spanCloseButtons.length; i++) {
            spanCloseButtons[i].onclick = function () {
                closeModal(this.closest(".modal"));
            };
        }

        // Close the modal if the user clicks outside of it
        window.onclick = function (event) {
            if (event.target == modal) {
                closeModal(modal);
            } else if (event.target == newPropertyModal) {
                closeModal(newPropertyModal);
            } else if (event.target == newRelationModal) {
                closeModal(newRelationModal);
            } else if (event.target == modifyPropertiesModal) {
                closeModal(modifyPropertiesModal);
            } else if (event.target == modifyRelationsModal) {
                closeModal(modifyRelationsModal);
            }
        };

        // Add click event listener to extract button
        extractBtn.addEventListener('click', function () {
            // Simulate extracting title and text
            var title = "模拟标题";
            var text = "模拟文本内容";
            document.getElementById("title").value = title;
            document.getElementById("editor").value = text;
        });

        // Add click event listener for properties table modification links
        newPropertiesTable.addEventListener('click', function (event) {
            if (event.target.classList.contains('modify-link')) {
                event.preventDefault();
                openModal(modifyPropertiesModal);
                var row = event.target.parentNode.parentNode.rowIndex;
                var propertyName = newPropertiesTable.rows[row].cells[0].innerText;
                var propertyValue = newPropertiesTable.rows[row].cells[1].innerText;
                document.getElementById('modify-property-name').value = propertyName;
                document.getElementById('modify-property-value').value = propertyValue;
                document.querySelector('#modifyPropertiesModal').dataset.row = row;
            } else if (event.target.classList.contains('delete-link')) {
                event.preventDefault();
                var row = event.target.parentNode.parentNode.rowIndex;
                newPropertiesTable.deleteRow(row);
            }
        });

        // Add click event listener for relations table modification links
        relationsTable.addEventListener('click', function (event) {
            if (event.target.classList.contains('modify-link')) {
                event.preventDefault();
                openModal(modifyRelationsModal);
                var row = event.target.parentNode.parentNode.rowIndex;
                var relatedLaw = relationsTable.rows[row].cells[0].innerText;
                var relationType = relationsTable.rows[row].cells[1].innerText;
                document.getElementById('modify-related-law').value = relatedLaw;
                document.getElementById('modify-relation-type').value = relationType;
                document.querySelector('#modifyRelationsModal').dataset.row = row;
            } else if (event.target.classList.contains('delete-link')) {
                event.preventDefault();
                var row = event.target.parentNode.parentNode.rowIndex;
                relationsTable.deleteRow(row);
            }
        });

        // Add click event listener to new property submit button
        newPropertySubmitBtn.addEventListener('click', function () {
            // Simulate submitting new property
            var propertyName = document.getElementById('property-name').value;
            var propertyValue = document.getElementById('property-value').value;
            var newRow = newPropertiesTable.insertRow(-1);
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            cell1.textContent = propertyName;
            cell2.textContent = propertyValue;
            cell3.innerHTML = '<a href="#" class="modify-link" data-row="' + (newPropertiesTable.rows.length - 1) + '" data-column="0">修改</a><a href="#" class="delete-link">删除</a>';
            closeModal(newPropertyModal);
        });

        // Add click event listener to new relation submit button
        newRelationSubmitBtn.addEventListener('click', function () {
            // Simulate submitting new relation
            var relatedLaw = document.getElementById('related-law').value;
            var relationType = document.getElementById('relation-type').value;
            var newRow = relationsTable.insertRow(-1);
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            cell1.textContent = relatedLaw;
            cell2.textContent = relationType;
            cell3.innerHTML = '<a href="#" class="modify-link" data-row="' + (relationsTable.rows.length - 1) + '" data-column="0">修改</a><a href="#" class="delete-link">删除</a>';
            closeModal(newRelationModal);
        });

        // Add click event listener to confirm modify properties button
        confirmModifyPropertiesBtn.addEventListener('click', function () {
            var newPropertyName = document.getElementById('modify-property-name').value;
            var newPropertyValue = document.getElementById('modify-property-value').value;
            var row = parseInt(document.querySelector('#modifyPropertiesModal').dataset.row);
            newPropertiesTable.rows[row].cells[0].innerText = newPropertyName;
            newPropertiesTable.rows[row].cells[1].innerText = newPropertyValue;
            closeModal(modifyPropertiesModal);
        });

        // Add click event listener to confirm modify relations button
        confirmModifyRelationsBtn.addEventListener('click', function () {
            var newRelatedLaw = document.getElementById('modify-related-law').value;
            var newRelationType = document.getElementById('modify-relation-type').value;
            var row = parseInt(document.querySelector('#modifyRelationsModal').dataset.row);
            relationsTable.rows[row].cells[0].innerText = newRelatedLaw;
            relationsTable.rows[row].cells[1].innerText = newRelationType;
            closeModal(modifyRelationsModal);
        });

        // Add click event listener to attribute extraction submit button
        extractSubmitBtn.addEventListener('click', function () {
            // Simulate submitting attribute extraction
            // Here you can call the backend interface for attribute extraction
            console.log('Submitted attribute extraction.');
            closeModal(modal);
        });

        // Add click event listener to main form submit button
        submitBtn.addEventListener('click', function () {
            // Simulate submitting main form
            // Here you can call the backend interface for main form submission
            console.log('Submitted main form.');
        });

        // Add click event listeners to return and cancel buttons
        returnCancelBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var modal = this.closest('.modal');
                if (modal) {
                    closeModal(modal);
                }
            });
        });
        function submitForm() {
            alert("完成提交");
        }
