/* =====================================================
   CARRUSEL PRINCIPAL (5 PLATOS)
   ===================================================== */
const platos = [
    { src: "src/Bebidas.png" },
    { src: "src/Hamburguesa.png" },
    { src: "src/Carnita.png" },
    { src: "src/Plato4.png" },
    { src: "src/Plato5.png" }
];

let indexActual = 0;
let intervaloCarrusel;
const imagenDOM = document.getElementById('plato-img');
const dots = document.querySelectorAll('.dot');

function cambiarPlato(nuevoIndex) {
    if (!imagenDOM) return;
    imagenDOM.style.transform = 'translateX(100vw)';
    imagenDOM.style.opacity = '0';

    setTimeout(() => {
        indexActual = nuevoIndex;
        imagenDOM.src = platos[indexActual].src;
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[indexActual]) dots[indexActual].classList.add('active');
        setTimeout(() => {
            imagenDOM.style.transform = 'translateX(0) scale(1)';
            imagenDOM.style.opacity = '1';
        }, 100);
    }, 600);
}

function iniciarCarrusel() {
    intervaloCarrusel = setInterval(() => {
        let next = (indexActual + 1) % platos.length;
        cambiarPlato(next);
    }, 5000);
}

window.cambiarPlatoManual = function(index) {
    clearInterval(intervaloCarrusel);
    cambiarPlato(index);
    iniciarCarrusel();
};

/* =====================================================
   LÓGICA RESPONSIVE Y SELECTORES VISUALES
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
    iniciarCarrusel();

    // 1. MODAL IMÁGENES (BOTÓN 2)
    const btnBoton2 = document.getElementById('boton-2-menu');
    btnBoton2.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = document.createElement('div');
        modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:9999; display:flex; justify-content:center; align-items:center; padding:20px;";
        modal.innerHTML = `
            <div style="background:#111; padding:2rem; border:2px solid #dc2626; border-radius:15px; text-align:center; width:90%; max-width:450px;">
                <h2 style="color:#eab308; margin-bottom:1.5rem; font-size:1.2rem;">PITLANE: SELECCIÓN</h2>
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap:15px; margin-bottom:1.5rem;">
                    ${platos.map(p => `<img src="${p.src}" class="sel-img" style="width:100%; cursor:pointer; border:1px solid #333; border-radius:8px; transition:0.3s;">`).join('')}
                </div>
                <button class="btn-secondary" id="cerrar-m1" style="width:100%;">Cerrar</button>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelectorAll('.sel-img').forEach(img => {
            img.onclick = (ev) => { imagenDOM.src = ev.target.src; modal.remove(); };
        });
        document.getElementById('cerrar-m1').onclick = () => modal.remove();
    });

    // 2. MODAL FORMULARIO (COL1)
    const btnCol1 = document.getElementById('btn-col1');
    btnCol1.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:9999; display:flex; justify-content:center; align-items:center; padding:20px;";
        modal.innerHTML = `
            <div style="background:#111; padding:2rem; border:2px solid #dc2626; border-radius:15px; width:90%; max-width:400px;">
                <h2 style="color:#eab308; text-align:center; margin-bottom:1rem;">EDITAR INFORMACIÓN</h2>
                <form id="f-col1">
                    <input type="text" id="it1" class="form-input" placeholder="Título 1" style="width:100%; margin-bottom:10px;" required>
                    <input type="text" id="it2" class="form-input" placeholder="Título 2" style="width:100%; margin-bottom:10px;" required>
                    <input type="text" id="isub" class="form-input" placeholder="Subtítulo" style="width:100%; margin-bottom:10px;" required>
                    <textarea id="idesc" class="form-input" placeholder="Descripción" style="width:100%; margin-bottom:10px; height:80px;" required></textarea>
                    <input type="text" id="iprice" class="form-input" placeholder="Precio" style="width:100%; margin-bottom:15px;" required>
                    <button type="submit" class="btn-primary" style="width:100%; margin-bottom:10px;">Guardar</button>
                    <button type="button" id="cerrar-m2" class="btn-secondary" style="width:100%;">Cancelar</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('f-col1').onsubmit = (e) => {
            e.preventDefault();
            document.querySelector('.title-1').innerText = document.getElementById('it1').value;
            document.querySelector('.title-2').innerText = document.getElementById('it2').value;
            document.querySelector('.subtitle-1').innerText = document.getElementById('isub').value;
            document.querySelector('.description-text').innerText = document.getElementById('idesc').value;
            document.querySelector('.price-tag').innerText = document.getElementById('iprice').value;
            modal.remove();
        };
        document.getElementById('cerrar-m2').onclick = () => modal.remove();
    });

    // 3. SELECTOR DE COLORES VISUAL (COLOR-BOX)
    const btnColor = document.getElementById('btn-color');
    btnColor.addEventListener('click', () => {
        const modalColor = document.createElement('div');
        modalColor.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:9999; display:flex; justify-content:center; align-items:center; padding:20px;";
        modalColor.innerHTML = `
            <div style="background:#111; padding:2rem; border:2px solid #dc2626; border-radius:15px; text-align:center; width:90%; max-width:350px;">
                <h2 style="color:#eab308; margin-bottom:1.5rem;">PINTURA PERSONALIZADA</h2>
                <div style="display:flex; justify-content:space-around; margin-bottom:2rem;">
                    <div>
                        <p style="color:white; font-size:0.8rem; margin-bottom:10px;">Color Inicial</p>
                        <input type="color" id="c1" value="#dc2626" style="width:80px; height:80px; border:none; cursor:pointer; background:none;">
                    </div>
                    <div>
                        <p style="color:white; font-size:0.8rem; margin-bottom:10px;">Color Final</p>
                        <input type="color" id="c2" value="#0a0a0a" style="width:80px; height:80px; border:none; cursor:pointer; background:none;">
                    </div>
                </div>
                <button class="btn-primary" id="aplicar-grad" style="width:100%; margin-bottom:10px;">Aplicar Degradado</button>
                <button class="btn-secondary" id="cerrar-m3" style="width:100%;">Cancelar</button>
            </div>
        `;
        document.body.appendChild(modalColor);

        document.getElementById('aplicar-grad').onclick = () => {
            const color1 = document.getElementById('c1').value;
            const color2 = document.getElementById('c2').value;
            document.getElementById('caja-color').style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
            modalColor.remove();
        };
        document.getElementById('cerrar-m3').onclick = () => modalColor.remove();
    });

    // MENÚ MÓVIL
    document.getElementById('mobile-menu').onclick = () => {
        document.getElementById('nav-links').classList.toggle('active');
    };
});
