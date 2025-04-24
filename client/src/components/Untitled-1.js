// Example for SignIn.js (replace form's onSubmit handler)
const handleSubmit = async (e) => {
  e.preventDefault();
  const fullName = e.target['full-name'].value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  const res = await fetch('http://localhost:8080/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, password })
  });
  const data = await res.json();
  alert(data.message);
};