	 		const taskForm = document.getElementById('task-form'); 		// Get the task form element
	 		const taskInput = document.getElementById('task-input'); 	// Get the task input element
	 		const taskList = document.getElementById('task-list'); 		// Get the task list element
	 		const deleteButton = document.getElementById('delete-btn'); 	// Get the delete button element

			// Retrieve tasks from Local Storage when page loads
			let tasks = JSON.parse(localStorage.getItem('tasks')) || []; 	// Get tasks from Local Storage or create an empty array
			tasks.forEach(function(task) { 					// Loop through tasks and create a list item for each one
				const li = document.createElement('li');
				const checkbox = document.createElement('input'); 	// Create a checkbox for each task
				checkbox.type = 'checkbox';
				li.appendChild(checkbox);
				const taskText = document.createElement('span'); 	// Create a span element for the task text
				taskText.innerText = task;
				li.appendChild(taskText);
				taskList.appendChild(li);
			});

			taskForm.addEventListener('submit', function(e) 		// Add event listener for form submission
			{	e.preventDefault();					// Prevent default form submission behavior
				if (taskInput.value.trim() === '') 			// Check if task input is empty
				{	alert('Please enter a task!'); 			// Show alert if input is empty
	 			}
				else
				{	const task = taskInput.value; 			// Get the task from the input
	 				const li = document.createElement('li'); 	// Create a new list item for the task
	 				const checkbox = document.createElement('input'); // Create a checkbox for the task
					checkbox.type = 'checkbox';
					li.appendChild(checkbox);
					const taskText = document.createElement('span'); // Create a span element for the task text
					taskText.innerText = task;
					li.appendChild(taskText);
					taskList.appendChild(li); 			// Add the list item to the task list
					tasks.push(task); 				// Add the task to the tasks array
					localStorage.setItem('tasks', JSON.stringify(tasks)); // Save the tasks array to Local Storage
	 				taskInput.value = ''; 				// Clear the task input
	 			}
			});

			// Delete checked tasks when delete button is clicked
			deleteButton.addEventListener('click', function(e) { 		// Add event listener for clicks on the delete button
				const checkedItems = taskList.querySelectorAll('li input[type="checkbox"]:checked'); // Get all checked checkboxes
				checkedItems.forEach(function(item) { 			// Loop through checked checkboxes and remove corresponding tasks
					const task = item.nextElementSibling.innerText;
					const index = tasks.indexOf(task);
					tasks.splice(index, 1);
					localStorage.setItem('tasks', JSON.stringify(tasks));
					item.parentElement.remove();
				});
			});

			// Mark task as completed when checkbox is clicked
			taskList.addEventListener('click', function(e) { 		// Add event listener for clicks on the task list
				if (e.target.tagName === 'INPUT') { 			// Check if checkbox was clicked
					const li = e.target.parentElement;
					li.classList.toggle('checked'); 		// Toggle the "checked" class to mark the task as completed
				}
			});