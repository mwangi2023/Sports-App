export let teamForm
const teamForm = document.getElementById('teamForm');
const teamInputs = document.getElementById('teamInputs');
const teamList = document.getElementById('teamList');

// Generate 20 input fields
for (let i = 1; i <= 20; i++) {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = `Team ${i} Name`;
  input.name = `team${i}`;
  teamInputs.appendChild(input);
}

// Handle form submission
teamForm.addEventListener('submit', function(e) {
  e.preventDefault();
  teamList.innerHTML = ''; // Clear previous list

  const inputs = teamForm.querySelectorAll('input');
  inputs.forEach(input => {
    const name = input.value.trim();
    if (name) {
      const li = document.createElement('li');
      li.textContent = name;
      teamList.appendChild(li);
    }
  });
});