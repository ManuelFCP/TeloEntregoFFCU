let menuVisible = false;
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}
function seleccionar(){
    document.getElementById("nav").classList = "";
    menuVisible = false;
}
let arrayPersonasRegistradas = new Array("Juan Carlos","Juan David","Rafael");
let bandera = false;

function Registra(){
    nombre = document.getElementById("userName1").value;
    miClave = document.getElementById("userName1").value;
    //alert(nombre + miClave);
    arrayPersonasRegistradas.push(nombre);
    alert("Se registro correctamente " + nombre);
}
function IniciaSesion(){
    nombre = document.getElementById("nameLogin").value;
    miClave = document.getElementById("passLogin").value;
    for (var i = 0; i < arrayPersonasRegistradas.length; i++){
        if(nombre==arrayPersonasRegistradas[i]){
            bandera=true;
        }
    }
    if(bandera==true){
        alert(nombre + miClave);
    }
    else{
        alert("El usuario no se encuentra registrado");
    }
}
/*
function buttons(){
    number = document.getElementById("num").value;
    
}*/
let btn = document.querySelector(".btn");
let div1 = document.querySelector(".contador");
let sumar = 1;

document.querySelector(".contador").innerText = 0;

btn.addEventListener("click", function () {
	div1.innerText = parseInt(div1.innerText) + sumar;
});

let currentLoginType = '';

function openRoleModal() {
    const modal = new bootstrap.Modal(document.getElementById('roleModal'));
    modal.show();
}

function selectRole(type) {
    currentLoginType = type;
    const roleModal = bootstrap.Modal.getInstance(document.getElementById('roleModal'));
    roleModal.hide();
    document.getElementById('loginModalLabel').textContent = type === 'usuario' ? 'Iniciar Sesión - Usuario' : 'Iniciar Sesión - Administrador';
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
}

function openLoginModal(type) {
    currentLoginType = type;
    document.getElementById('loginModalLabel').textContent = type === 'usuario' ? 'Iniciar Sesión - Usuario' : 'Iniciar Sesión - Administrador';
    const modal = new bootstrap.Modal(document.getElementById('loginModal'));
    modal.show();
}

document.getElementById('loginBtn').addEventListener('click', function() {
    const nombre = document.getElementById('loginNombre').value;
    const password = document.getElementById('loginPassword').value;

    if (currentLoginType === 'usuario') {
        // Para usuario, cualquier nombre y pass válido
        if (nombre && password) {
            window.location.href = 'pages/usuarios.html';
        } else {
            alert('Por favor, ingrese nombre y contraseña.');
        }
    } else if (currentLoginType === 'admin') {
        // Para admin, credenciales fijas
        if (nombre === 'admin' && password === 'admin') {
            window.location.href = 'pages/admin.html';
        } else {
            alert('Credenciales incorrectas para administrador.');
        }
    }
});

// Función para enviar pedido
document.getElementById('enviarPedido')?.addEventListener('click', function() {
    const producto = document.getElementById('pedidoProducto').value;
    const cantidad = document.getElementById('pedidoCantidad').value;
    const nombre = document.getElementById('pedidoNombre').value;
    const email = document.getElementById('pedidoEmail').value;
    const telefono = document.getElementById('pedidoTelefono').value;
    const direccion = document.getElementById('pedidoDireccion').value;
    const comentarios = document.getElementById('pedidoComentarios').value;

    if (!producto || !cantidad || !nombre || !email || !telefono || !direccion) {
        alert('Por favor, complete todos los campos obligatorios.');
        return;
    }

    const pedido = {
        producto,
        cantidad,
        nombre,
        email,
        telefono,
        direccion,
        comentarios,
        estado: 'Pendiente',
        fecha: new Date().toISOString()
    };

    // Guardar en localStorage
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    alert('Pedido enviado correctamente.');
    document.getElementById('pedidoForm').reset();
});
