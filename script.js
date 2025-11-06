document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Function to create a new task list item
    function createTaskElement(taskText) {
        const listItem = document.createElement('li');
        
        // 1. Task Text Span
        const textSpan = document.createElement('span');
        textSpan.classList.add('task-text');
        textSpan.textContent = taskText;
        // Make the text span initially NOT editable
        textSpan.setAttribute('contenteditable', 'false');

        // 2. Button Container
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');

        // 3. Edit Button
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.textContent = 'Edit';

        // 4. Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';


        // --- Event Listeners for the New Task ---

        // Toggle completion status on click (click on the text)
        textSpan.addEventListener('click', () => {
            // Only allow toggling completion if NOT currently editing
            if (textSpan.getAttribute('contenteditable') === 'false') {
                listItem.classList.toggle('completed');
            }
        });

        // Edit/Save functionality
        editBtn.addEventListener('click', () => {
            if (editBtn.textContent === 'Edit') {
                // Change to EDIT mode
                textSpan.setAttribute('contenteditable', 'true');
                textSpan.focus();
                editBtn.textContent = 'Save';
                editBtn.style.backgroundColor = '#28a745'; // Green for Save
                listItem.classList.remove('completed'); // Unmark as completed when editing
            } else {
                // Change to SAVE mode
                const newText = textSpan.textContent.trim();
                if (newText === "") {
                    alert("Task cannot be empty. Deleting task.");
                    taskList.removeChild(listItem);
                    return;
                }
                textSpan.textContent = newText; // Clean up whitespace
                textSpan.setAttribute('contenteditable', 'false');
                editBtn.textContent = 'Edit';
                editBtn.style.backgroundColor = '#00BFFF'; // Blue for Edit (matching CSS)
            }
        });

        // Delete task on button click
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(listItem);
        });
        
        // Append elements
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);
        
        listItem.appendChild(textSpan);
        listItem.appendChild(actionsDiv); // Actions (Edit/Delete) go next
        
        taskList.appendChild(listItem);
    }

    // Function to handle adding a new task
    function addTask() {
        const text = taskInput.value.trim();

        if (text !== "") {
            createTaskElement(text);
            taskInput.value = ""; // Clear the input field
            taskInput.focus(); // Keep focus on the input
        } else {
            alert("Please enter a task!");
        }
    }

    // Event listener for the "Add Task" button
    addTaskBtn.addEventListener('click', addTask);

    // Event listener for the Enter key press on the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // --- Optional: Add a few initial tasks to show the styling ---
    createTaskElement("Click the text to mark as done.");
    createTaskElement("Click 'Edit' to change the task name.");
    createTaskElement("Test the delete button.");
});