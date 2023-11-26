console.log("hello world");

// Retrieve existing data from local storage
var storedData = JSON.parse(localStorage.getItem('itemData')) || [];

// Function to handle the deletion of an item
function handleDelete() {
  // Get the index of the item in the array
  var index = parseInt(this.dataset.index);

  // Remove the item from the array
  storedData.splice(index, 1);

  // Save the updated data back to local storage
  localStorage.setItem('itemData', JSON.stringify(storedData));

  // Remove the item from the UI
  this.parentElement.remove();
}

// Function to handle form submission (adding items)
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get input values
  var itemName = document.getElementById('itemNameInput').value.trim();
  var itemDescription = document.getElementById('itemDescriptionInput').value.trim();

  // Check if both name and description are provided
  if (itemName !== '' && itemDescription !== '') {
    // Create user object
    var user = {
      name: itemName,
      description: itemDescription
    };

    // Add user object to the array
    storedData.push(user);

    // Save the updated data back to local storage
    localStorage.setItem('itemData', JSON.stringify(storedData));

    // Create new list item
    createListItem(user, storedData.length - 1); // Pass the index of the new item

    // Clear the input fields
    document.getElementById('itemNameInput').value = '';
    document.getElementById('itemDescriptionInput').value = '';
  }
}

// Function to create a new list item
function createListItem(user, index) {
  var newListItem = document.createElement('li');
  newListItem.classList.add('list-group-item');

  // Create delete button
  var deleteButton = document.createElement('button');
  deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'float-right', 'delete-btn');
  deleteButton.textContent = 'Delete';
  deleteButton.dataset.index = index; // Set the index as a data attribute
  deleteButton.addEventListener('click', handleDelete);

  // Create edit button (for future functionality)
  var editButton = document.createElement('button');
  editButton.classList.add('btn', 'btn-info', 'btn-sm', 'float-right', 'edit-btn');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', function () {
    // Add your edit functionality here when edit button is clicked
    console.log("Edit button clicked");
  });

  // Create item name and description elements
  var itemNameElement = document.createElement('span');
  itemNameElement.textContent = user.name;

  var itemDescriptionElement = document.createElement('p');
  itemDescriptionElement.textContent = user.description;

  // Append elements to the list item
  newListItem.appendChild(itemNameElement);
  newListItem.appendChild(deleteButton);
  newListItem.appendChild(editButton);
  newListItem.appendChild(itemDescriptionElement);

  // Append the new list item to the list
  document.getElementById('items').appendChild(newListItem);
}

// Select the add item form and add the submit event listener
document.getElementById('addItemForm').addEventListener('submit', handleFormSubmit);

// Display existing data on page load
storedData.forEach(createListItem);

// Select all delete buttons and add event listeners
var deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach(function (deleteButton) {
  deleteButton.addEventListener('click', handleDelete);
});

// Select all edit buttons (for future functionality)
var editButtons = document.querySelectorAll('.edit-btn');
editButtons.forEach(function (editButton) {
  editButton.addEventListener('click', function () {
    // Add your edit functionality here when edit button is clicked
    console.log("Edit button clicked");
  });
});
