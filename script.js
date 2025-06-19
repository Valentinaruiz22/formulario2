const formulario = document.getElementById('formularioAvanzado');
const campos = ['nombre', 'correo', 'password', 'pais', 'terminos'];
const estado = {
    nombre: false,
    correo: false,
    password: false,
    pais: false,
    terminos: false
};

function validarCampo(nombre) {
    let valido = false;
    let valor = '';
    let error = '';
    switch (nombre) {
        case 'nombre':
            valor = formulario.nombre.value.trim();
            valido = valor.length >= 3;
            error = valido ? '' : 'Mínimo 3 caracteres.';
            break;
        case 'correo':
            valor = formulario.correo.value.trim();
            valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
            error = valido ? '' : 'Correo inválido.';
            break;
        case 'password':
            valor = formulario.password.value;
            valido = valor.length >= 8;
            error = valido ? '' : 'Mínimo 8 caracteres.';
            break;
        case 'pais':
            valor = formulario.pais.value;
            valido = valor !== '';
            error = valido ? '' : 'Selecciona un país.';
            break;
        case 'terminos':
            valido = formulario.terminos.checked;
            error = valido ? '' : 'Debes aceptar los términos.';
            break;
    }
    estado[nombre] = valido;
    const errorSpan = document.getElementById('error-' + nombre);
    if (errorSpan) {
        errorSpan.textContent = error;
        errorSpan.style.display = error ? 'block' : 'none';
    }
    actualizarProgreso();
}

function actualizarProgreso() {
    const total = campos.length;
    const validos = Object.values(estado).filter(Boolean).length;
    const porcentaje = Math.round((validos / total) * 100);
    document.getElementById('barraProgreso').style.width = porcentaje + '%';
    document.getElementById('porcentajeProgreso').textContent = 'Progreso: ' + porcentaje + '%';
    document.getElementById('btnEnviar').disabled = validos !== total;
}

campos.forEach(nombre => {
    const campo = formulario[nombre];
    if (campo.type === 'checkbox') {
        campo.addEventListener('change', () => validarCampo(nombre));
    } else {
        campo.addEventListener('input', () => validarCampo(nombre));
        campo.addEventListener('blur', () => validarCampo(nombre));
    }
});

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('mensaje-exito').style.display = 'block';
    formulario.reset();
    Object.keys(estado).forEach(k => estado[k] = false);
    actualizarProgreso();
    setTimeout(() => {
        document.getElementById('mensaje-exito').style.display = 'none';
    }, 3000);
});

formulario.addEventListener('reset', function() {
    setTimeout(() => {
        Object.keys(estado).forEach(k => estado[k] = false);
        actualizarProgreso();
        campos.forEach(nombre => {
            const errorSpan = document.getElementById('error-' + nombre);
            if (errorSpan) errorSpan.style.display = 'none';
        });
    }, 50);
});

// Inicializa progreso
actualizarProgreso();