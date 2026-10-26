// Initialize Lucide icons
lucide.createIcons();

// Global State
let isAdFree = localStorage.getItem('mbt_pro_pass') === 'true';
let auditEntries = ["[System Ready] Zero files currently held in browser session memory."];

// Tool Registry Metadata
const TOOL_META = {
  'sales-report': {
    title: 'Sales Report Generator (MY Edition)',
    desc: 'Generate visual PDF sales summaries via manual entry or Excel/CSV upload with automatic MYR & 6%/8% SST calculations.'
  },
  'sst-calculator': {
    title: 'Quick SST & Profit Margin Calculator',
    desc: 'Calculate 6% or 8% Malaysian Sales & Service Tax (inclusive/exclusive), profit markups, and 5-sen cash rounding.'
  },
  'merge-pdf': {
    title: 'Merge PDF Files',
    desc: 'Combine multiple PDF documents into a single file directly in your browser.'
  },
  'split-pdf': {
    title: 'Split & Extract PDF',
    desc: 'Extract specific page ranges or split a large PDF into individual files.'
  },
  'word-to-pdf': {
    title: 'Convert Word to PDF',
    desc: 'Convert Microsoft Word (.docx) documents into clean, printable PDF files.'
  },
  'pdf-to-word': {
    title: 'Convert PDF to Word',
    desc: 'Extract text and tables from PDF documents into editable Microsoft Word (.docx) files.'
  }
};

// Apply saved Ad-Free status on startup
updateAdUI();

function openToolWorkspace(toolKey) {
  const tool = TOOL_META[toolKey];
  if (!tool) return;
  document.getElementById('dashboardView').classList.add('hidden');
  document.getElementById('toolWorkspaceView').classList.remove('hidden');
  document.getElementById('activeToolTitle').textContent = tool.title;
  document.getElementById('activeToolDesc').textContent = tool.desc;
}

function showDashboard() {
  document.getElementById('toolWorkspaceView').classList.add('hidden');
  document.getElementById('dashboardView').classList.remove('hidden');
}

function filterTools() {
  const q = document.getElementById('toolSearch').value.toLowerCase();
  document.querySelectorAll('.tool-card').forEach(card => {
    const match = card.getAttribute('data-name').includes(q) || card.innerText.toLowerCase().includes(q);
    card.style.display = match ? '' : 'none';
  });
}

function toggleAdFreeSimulation() {
  isAdFree = !isAdFree;
  localStorage.setItem('mbt_pro_pass', isAdFree);
  updateAdUI();
}

function activateAdFreeMode() {
  isAdFree = true;
  localStorage.setItem('mbt_pro_pass', 'true');
  updateAdUI();
  closeModal('stripeModal');
}

function updateAdUI() {
  document.querySelectorAll('.ad-container').forEach(el => {
    el.style.display = isAdFree ? 'none' : '';
  });
  const badge = document.getElementById('planBadge');
  const simBtn = document.getElementById('simToggleBtn');
  const removeBtn = document.getElementById('removeAdsBtn');

  if (isAdFree) {
    badge.textContent = 'Pro Pass (Ad-Free)';
    badge.className = 'text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200';
    simBtn.textContent = '🛠️ Dev: Ads OFF';
    removeBtn.classList.add('hidden');
  } else {
    badge.textContent = 'Free Tier';
    badge.className = 'text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200';
    simBtn.textContent = '🛠️ Dev: Ads ON';
    removeBtn.classList.remove('hidden');
  }
}

function openModal(id) {
  const m = document.getElementById(id);
  m.classList.remove('hidden');
  m.classList.add('flex');
}

function closeModal(id) {
  const m = document.getElementById(id);
  m.classList.add('hidden');
  m.classList.remove('flex');
}

function voteTool(toolName) {
  const fb = document.getElementById('voteFeedback');
  fb.textContent = `✓ Vote recorded for "${toolName}"!`;
  fb.className = 'text-xs text-emerald-600 font-medium';
}

function logAuditEvent(msg) {
  const now = new Date().toLocaleTimeString();
  auditEntries.push(`[${now}] ${msg}`);
  const logEl = document.getElementById('sessionAuditLog');
  if (logEl) logEl.textContent = auditEntries.join('\n');
}

function simulateFileAction() {
  logAuditEvent('File loaded into local browser RAM (0 bytes sent to external server).');
  logAuditEvent('30-minute session retention active for parameter adjustments.');
  alert('Simulated! Tap "FAQ & Privacy" to see the quiet compliance log.');
}

function purgeSessionMemory() {
  sessionStorage.clear();
  logAuditEvent('USER ACTION: Local browser session memory manually purged (0 bytes remaining).');
}

function downloadPurgeCertificate() {
  const now = new Date().toISOString();
  const content = [
    'MYBIZTOOLS.MY - LOCAL DATA PURGE CERTIFICATE',
    `Timestamp: ${now}`,
    'Architecture: 100% Client-Side Browser RAM Processing',
    'External Server Storage: 0 Bytes',
    '',
    'Session Audit Log:',
    ...auditEntries
  ].join('\n');
  const blob = new Blob([content], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `MyBizTools_Purge_Proof_${Date.now()}.txt`;
  a.click();
}
