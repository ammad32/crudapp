document.addEventListener('DOMContentLoaded', () => {
        const studentForm = document.getElementById('studentForm');
        const studentTable = document.getElementById('studentTable');
        const studentTableBody = studentTable.getElementsByTagName('tbody')[0];
        const editModal = new bootstrap.Modal(document.getElementById('editModal'));
        const editForm = document.getElementById('editForm');
        const editIndexInput = document.getElementById('editIndex');

        let students = [];
        let editingIndex = null;

        studentForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const age = document.getElementById('age').value;
            const course = document.getElementById('course').value;

            if (name && email && age && course) {
                students.push({ name, email, age, course });
                renderTable();
                studentForm.reset();
            }
        });

        function renderTable() {
            studentTableBody.innerHTML = '';
            if (students.length > 0) {
                studentTable.style.display = 'table';
            } else {
                studentTable.style.display = 'none';
            }

            students.forEach((student, index) => {
                const row = studentTableBody.insertRow();
                row.insertCell(0).textContent = student.name;
                row.insertCell(1).textContent = student.email;
                row.insertCell(2).textContent = student.age;
                row.insertCell(3).textContent = student.course;
                const actionsCell = row.insertCell(4);
                actionsCell.innerHTML = `
                    <button class="button2 btn btn-sm" onclick="editStudent(${index})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteStudent(${index})">Delete</button>
                `;
            });
        }

        window.editStudent = function(index) {
            editingIndex = index;
            const student = students[index];
            document.getElementById('editName').value = student.name;
            document.getElementById('editEmail').value = student.email;
            document.getElementById('editAge').value = student.age;
            document.getElementById('editCourse').value = student.course;
            editIndexInput.value = index;
            editModal.show();
        }
 window.deleteStudent = function(index) {
            students.splice(index, 1);
            renderTable();
        }

        editForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('editName').value;
            const age = document.getElementById('editAge').value;
            const course = document.getElementById('editCourse').value;

            if (name && age && course) {
                students[editingIndex] = {
                    ...students[editingIndex],
                    name,
                    age,
                    course
                };
                renderTable();
                editModal.hide();
            }
        });
    });