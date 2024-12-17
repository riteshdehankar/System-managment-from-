const studentForm = document.getElementById('studentForm');
        const studentList = document.getElementById('studentList');
        const shareLink = document.getElementById('shareLink');

        let students = [];

        function renderStudentList() {
            studentList.innerHTML = '';
            students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.rollNumber}</td>
                    <td>${student.name}</td>
                    <td>${student.marks}</td>
                    <td>${student.address}</td>
                    <td><img src="${student.image}" alt="Student Image" width="50"></td>
                `;
                studentList.appendChild(row);
            });
        }

        studentForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const rollNumber = document.getElementById('rollNumber').value;
            const name = document.getElementById('name').value;
            const marks = document.getElementById('marks').value;
            const address = document.getElementById('address').value;
            const imageFile = document.getElementById('imageUpload').files[0];

            if (imageFile.size > 1048576) {
                alert('Image size exceeds 1MB!');
                return;
            }

            const reader = new FileReader();
            reader.onload = function () {
                const newStudent = {
                    rollNumber,
                    name,
                    marks,
                    address,
                    image: reader.result
                };

                students.push(newStudent);
                renderStudentList();
                studentForm.reset();
            };
            reader.readAsDataURL(imageFile);
        });

        shareLink.addEventListener('click', function (event) {
            event.preventDefault();
            const url = new URL(window.location.href);
            alert(`Share this link: ${url}`);
        });