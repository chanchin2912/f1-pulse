// 1. Configuración de la fecha de carrera
const raceDate = new Date("March 14, 2026 15:00:00").getTime();

// 2. Datos de Neumáticos
const tyreData = {
    'hard': {
        title: 'Compuesto Duro (C1-C2)',
        desc: 'Diseñado para ofrecer la máxima durabilidad. Es el neumático más lento en ritmo pero permite tandas muy largas.',
        use: 'Circuitos abrasivos o estrategias de una sola parada.'
    },
    'medium': {
        title: 'Compuesto Medio (C3)',
        desc: 'El equilibrio perfecto entre velocidad y resistencia. Es el neumático más versátil de la gama Pirelli.',
        use: 'Casi todas las condiciones de carrera.'
    },
    'soft': {
        title: 'Compuesto Blando (C4-C5)',
        desc: 'Máximo agarre y velocidad instantánea. Se degrada rápidamente debido al calor generado por su alta fricción.',
        use: 'Clasificación (Qualy) y ataques finales en carrera.'
    }
};

// 3. Datos del Calendario
const calendarData = [
    { round: 1, name: "GP de Australia", date: "2026-03-15", circuit: "Albert Park", utcHour: 5, type: "Normal", flag: "🇦🇺" },
    { round: 2, name: "GP de China", date: "2026-03-22", circuit: "Shanghai Int.", utcHour: 7, type: "Sprint", flag: "🇨🇳" },
    { round: 3, name: "GP de Japón", date: "2026-04-05", circuit: "Suzuka", utcHour: 5, type: "Normal", flag: "🇯🇵" },
    { round: 4, name: "GP de Baréin", date: "2026-04-19", circuit: "Sakhir", utcHour: 15, type: "Normal", flag: "🇧🇭" },
    { round: 5, name: "GP de Miami", date: "2026-05-03", circuit: "Miami Intl", utcHour: 19, type: "Normal", flag: "🇺🇸" },
    { round: 6, name: "GP de Emilia-Romaña", date: "2026-05-17", circuit: "Imola", utcHour: 13, type: "Normal", flag: "🇮🇹" },
    { round: 7, name: "GP de Mónaco", date: "2026-05-24", circuit: "Monte Carlo", utcHour: 13, type: "Normal", flag: "🇲🇨" },
    { round: 8, name: "GP de España", date: "2026-06-07", circuit: "Montmeló", utcHour: 13, type: "Normal", flag: "🇪🇸" },
    { round: 9, name: "GP de Canadá", date: "2026-06-21", circuit: "Gilles Villeneuve", utcHour: 18, type: "Normal", flag: "🇨🇦" },
    { round: 10, name: "GP de Austria", date: "2026-07-05", circuit: "Red Bull Ring", utcHour: 13, type: "Sprint", flag: "🇦🇹" },
    { round: 11, name: "GP de Gran Bretaña", date: "2026-07-12", circuit: "Silverstone", utcHour: 14, type: "Normal", flag: "🇬🇧" },
    { round: 12, name: "GP de Hungría", date: "2026-07-26", circuit: "Hungaroring", utcHour: 13, type: "Normal", flag: "🇭🇺" },
    { round: 13, name: "GP de Bélgica", date: "2026-08-02", circuit: "Spa-Francorchamps", utcHour: 13, type: "Normal", flag: "🇧🇪" },
    { round: 14, name: "GP de Países Bajos", date: "2026-08-30", circuit: "Zandvoort", utcHour: 13, type: "Normal", flag: "🇳🇱" },
    { round: 15, name: "GP de Italia", date: "2026-09-06", circuit: "Monza", utcHour: 13, type: "Normal", flag: "🇮🇹" },
    { round: 16, name: "GP de Azerbaiyán", date: "2026-09-20", circuit: "Baku City", utcHour: 11, type: "Normal", flag: "🇦🇿" },
    { round: 17, name: "GP de Singapur", date: "2026-10-04", circuit: "Marina Bay", utcHour: 12, type: "Normal", flag: "🇸🇬" },
    { round: 18, name: "GP de EE.UU.", date: "2026-10-25", circuit: "COTA", utcHour: 19, type: "Sprint", flag: "🇺🇸" },
    { round: 19, name: "GP de México", date: "2026-11-01", circuit: "Hermanos Rodríguez", utcHour: 20, type: "Normal", flag: "🇲🇽" },
    { round: 20, name: "GP de Brasil", date: "2026-11-15", circuit: "Interlagos", utcHour: 17, type: "Sprint", flag: "🇧🇷" },
    { round: 21, name: "GP de Las Vegas", date: "2026-11-22", circuit: "Las Vegas Strip", utcHour: 6, type: "Normal", flag: "🇺🇸" },
    { round: 22, name: "GP de Qatar", date: "2026-12-06", circuit: "Lusail", utcHour: 17, type: "Sprint", flag: "🇶🇦" },
    { round: 23, name: "GP de Abu Dhabi", date: "2026-12-13", circuit: "Yas Marina", utcHour: 13, type: "Normal", flag: "🇦🇪" }
];

// --- FUNCIONES ---

function iniciarCuentaRegresiva() {
    setInterval(() => {
        const now = new Date().getTime();
        const distance = raceDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        if(document.getElementById("days")) {
            document.getElementById("days").innerText = days;
            document.getElementById("hours").innerText = hours;
            document.getElementById("minutes").innerText = minutes;
        }

        if (distance < 0 && document.querySelector(".hero h1")) {
            document.querySelector(".hero h1").innerText = "¡ES SEMANA DE CARRERA!";
        }
    }, 1000);
}

async function actualizarTablaF1() {
    const tableBody = document.getElementById('api-data');
    if(!tableBody) return;
    try {
        const response = await fetch('https://api.jolpi.ca/ergast/f1/2026/driverStandings.json');
        const data = await response.json();
        const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        tableBody.innerHTML = '';
        standings.forEach(item => {
            const row = `
                <tr>
                    <td><strong>${item.position}</strong></td>
                    <td>${item.Driver.givenName} ${item.Driver.familyName}</td>
                    <td>${item.Constructors[0].name}</td>
                    <td class="pts">${item.points}</td>
                </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        tableBody.innerHTML = '<tr><td colspan="4">Error al conectar con el Paddock.</td></tr>';
    }
}

function cargarCalendario() {
    const raceList = document.getElementById('race-list');
    if(!raceList) return;
    raceList.innerHTML = '';
    calendarData.forEach(race => {
        const card = document.createElement('div');
        card.className = 'race-card';
        card.innerHTML = `
            <div class="card-header">
                <span class="round">R${race.round}</span>
                <span class="flag-icon">${race.flag}</span>
            </div>
            <h3>${race.name}</h3>
            <p>${race.date}</p>
            ${race.type === 'Sprint' ? '<span class="badge-sprint">SPRINT</span>' : ''}`;
        card.onclick = () => mostrarDetalleCircuito(race);
        raceList.appendChild(card);
    });
}

function mostrarDetalleCircuito(race) {
    const info = document.getElementById('circuit-info');
    const hEsp = (race.utcHour + 1) % 24; 
    const hArg = (race.utcHour - 3 + 24) % 24;
    const hMex = (race.utcHour - 6 + 24) % 24;

    const formatH = (h, offset = 0) => {
        let finalH = (h + offset + 24) % 24;
        return `${finalH < 10 ? '0'+finalH : finalH}:00`;
    };

    let eventosHTML = race.type === 'Sprint' ? `
        <div class="event-row"><span>Viernes</span> <strong>Clasif. Sprint:</strong> ${formatH(hArg, -1)} ARG | ${formatH(hEsp, -1)} ESP</div>
        <div class="event-row"><span>Sábado</span> <strong>Carrera Sprint:</strong> ${formatH(hArg, -2)} ARG | ${formatH(hEsp, -2)} ESP</div>
        <div class="event-row"><span>Sábado</span> <strong>Clasificación:</strong> ${formatH(hArg)} ARG | ${formatH(hEsp)} ESP</div>
    ` : `
        <div class="event-row"><span>Viernes</span> <strong>Prácticas 1 y 2:</strong> Mañana/Tarde</div>
        <div class="event-row"><span>Sábado</span> <strong>Prácticas 3:</strong> ${formatH(hArg, -3)} ARG | ${formatH(hEsp, -3)} ESP</div>
        <div class="event-row"><span>Sábado</span> <strong>Clasificación:</strong> ${formatH(hArg)} ARG | ${formatH(hEsp)} ESP</div>
    `;

    info.innerHTML = `
        <div class="detail-header">
            <span class="detail-flag">${race.flag}</span>
            <h2>${race.name}</h2>
        </div>
        <p class="circuit-name">🏟️ ${race.circuit}</p>
        <div class="schedule-section">
            <h3>CRONOGRAMA</h3>
            <div class="events-container">
                ${eventosHTML}
                <div class="event-row main-race">
                    <span>Domingo</span> <strong>GRAN PREMIO:</strong> 
                    <div class="gp-times">
                        <span class="time-tag">🇦🇷 ${formatH(hArg)}</span>
                        <span class="time-tag">🇪🇸 ${formatH(hEsp)}</span>
                        <span class="time-tag">🇲🇽 ${formatH(hMex)}</span>
                    </div>
                </div>
            </div>
        </div>`;
    document.getElementById('circuit-detail-modal').style.display = "block";
}

async function cargarTarjetasPilotos() {
    const grid = document.getElementById('drivers-grid');
    if(!grid) return;
    try {
        const response = await fetch('https://api.jolpi.ca/ergast/f1/2026/drivers.json');
        const data = await response.json();
        const drivers = data.MRData.DriverTable.Drivers;
        grid.innerHTML = '';
        drivers.forEach(driver => {
            const card = document.createElement('div');
            card.className = 'driver-card';
            card.innerHTML = `
                <div class="driver-number">${driver.permanentNumber || '??'}</div>
                <div class="driver-info">
                    <h3>${driver.givenName} ${driver.familyName}</h3>
                    <p>${driver.nationality}</p>
                </div>`;
            card.onclick = () => abrirPerfilPiloto(driver);
            grid.appendChild(card);
        });
    } catch (e) { console.error(e); }
}

function abrirPerfilPiloto(driver) {
    const details = document.getElementById('driver-details');
    details.innerHTML = `
        <div class="profile-header">
            <span class="big-number">${driver.permanentNumber || '00'}</span>
            <h1>${driver.givenName.toUpperCase()} <br> <span>${driver.familyName.toUpperCase()}</span></h1>
        </div>
        <div class="profile-body">
            <p><strong>Nacionalidad:</strong> ${driver.nationality}</p>
            <p><strong>Fecha de Nacimiento:</strong> ${driver.dateOfBirth}</p>
            <a href="${driver.url}" target="_blank" class="wiki-btn">Biografía Completa</a>
        </div>`;
    document.getElementById('driver-modal').style.display = "block";
}

// --- INICIALIZACIÓN ---

document.addEventListener('DOMContentLoaded', () => {
    iniciarCuentaRegresiva();
    actualizarTablaF1();
    cargarTarjetasPilotos(); // Cargamos los pilotos al iniciar

    // Eventos Neumáticos
    const tyres = document.querySelectorAll('.tyre');
    tyres.forEach(tyre => {
        tyre.onclick = () => {
            const type = Array.from(tyre.classList).find(c => tyreData[c]);
            if(tyreData[type]) {
                document.getElementById("modal-title").innerText = tyreData[type].title;
                document.getElementById("modal-desc").innerText = tyreData[type].desc;
                document.getElementById("modal-use").innerText = tyreData[type].use;
                document.getElementById("tyre-modal").style.display = "block";
            }
        };
    });

    // Botones de cierre
    document.querySelector(".close-button").onclick = () => document.getElementById("tyre-modal").style.display = "none";
    document.querySelector('.close-calendar').onclick = () => document.getElementById('calendar-modal').style.display = "none";
    document.querySelector('.close-detail').onclick = () => document.getElementById('circuit-detail-modal').style.display = "none";
    document.querySelector('.close-driver').onclick = () => document.getElementById('driver-modal').style.display = "none";

    // Navegación
    document.getElementById('btn-calendario').onclick = (e) => {
        e.preventDefault();
        cargarCalendario();
        document.getElementById('calendar-modal').style.display = "block";
    };

    // Botón Pilotos (Scroll suave a la sección)
    const btnPilotos = document.querySelector('nav ul li:nth-child(3) a');
    if(btnPilotos) {
        btnPilotos.onclick = (e) => {
            e.preventDefault();
            document.querySelector('.drivers-grid-section').scrollIntoView({ behavior: 'smooth' });
        };
    }

    // Cerrar al hacer clic fuera
    window.onclick = (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none";
        }
    };
});