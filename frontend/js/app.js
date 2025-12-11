import { API_BASE } from './config.js';

const openAdd = document.getElementById('openAdd');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');
const saveBtn = document.getElementById('save');
const walksList = document.getElementById('walks');

openAdd.addEventListener('click', ()=> modal.classList.remove('hidden'));
closeBtn.addEventListener('click', ()=> modal.classList.add('hidden'));

async function loadWalks(){
  const res = await fetch(API_BASE + '/api/walks');
  const data = await res.json();
  renderWalks(data);
  updateStats(data);
}

function renderWalks(arr){
  walksList.innerHTML = '';
  arr.forEach(w=>{
    const li = document.createElement('li');
    li.innerHTML = `<strong>${new Date(w.date).toLocaleDateString()}</strong> - ${w.type} - ${w.time_of_day} - ${w.distance}km <button data-id="${w.id}" class="del">Delete</button><div>${w.notes||''}</div>`;
    walksList.appendChild(li);
  });
  document.querySelectorAll('.del').forEach(b=>{
    b.addEventListener('click', async (e)=>{
      const id = e.target.dataset.id;
      await fetch(API_BASE + '/api/walks/' + id, { method: 'DELETE' });
      loadWalks();
    });
  });
}

function updateStats(arr){
  const now = new Date();
  const weekAgo = new Date(Date.now() - 7*24*60*60*1000);
  const weekCount = arr.filter(w=> new Date(w.date) > weekAgo ).length;
  const monthCount = arr.filter(w=> {
    const d = new Date(w.date); return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear();
  }).length;
  const total = arr.length;
  document.getElementById('weekCount').textContent = weekCount;
  document.getElementById('monthCount').textContent = monthCount;
  document.getElementById('totalWalks').textContent = total;
  const counts = {};
  arr.forEach(w=> counts[w.time_of_day] = (counts[w.time_of_day]||0)+1);
  let fav = '—', best=0;
  for(const k in counts){ if(counts[k]>best){best=counts[k]; fav=k} }
  document.getElementById('favTime').textContent = fav;
}

saveBtn.addEventListener('click', async ()=>{
  const walk = {
    date: document.getElementById('date').value || new Date().toISOString(),
    type: document.getElementById('type').value,
    timeOfDay: document.getElementById('timeOfDay').value,
    distance: parseFloat(document.getElementById('distance').value)||0,
    startTime: document.getElementById('startTime').value,
    notes: document.getElementById('notes').value
  };
  await fetch(API_BASE + '/api/walks', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(walk)
  });
  modal.classList.add('hidden');
  loadWalks();
});

loadWalks();
