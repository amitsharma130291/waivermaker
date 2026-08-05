#!/usr/bin/env node
/**
 * verify-waiver-definitions.mjs
 * Lightweight consistency check for the shared waiver definitions module.
 *
 * Checks:
 *   1. Tattoo, Rock Climbing, and Volunteer definitions each contain their
 *      required vertical section IDs.
 *   2. The PDF endpoint imports getWaiverDefinition from waiver-definitions.ts.
 *   3. The WaiverForm component embeds/uses the serialised shared definitions
 *      and does NOT retain old generic generatePreview section strings.
 *
 * Exit 0 on all pass, exit 1 on any failure.
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const srcData = resolve(root, 'src/data');
const srcPages = resolve(root, 'src/pages');
const srcComponents = resolve(root, 'src/components');

let passed = 0;
let failed = 0;

function pass(msg) {
  console.log(`  ✓ ${msg}`);
  passed++;
}

function fail(msg) {
  console.error(`  ✗ FAIL: ${msg}`);
  failed++;
}

function read(path) {
  try {
    return readFileSync(path, 'utf8');
  } catch (e) {
    fail(`Cannot read file: ${path} — ${e.message}`);
    return '';
  }
}

// ---------------------------------------------------------------------------
console.log('\n[1] Checking waiver-definitions.ts contains required section IDs\n');

const defsPath = resolve(srcData, 'waiver-definitions.ts');
const defs = read(defsPath);

// Tattoo required sections
const tattooRequired = [
  'tattoo-procedure-consent',
  'health-disclosure',
  'ink-allergy',
  'bloodborne-pathogen',
  'aftercare-responsibility',
  'result-appearance',
];
for (const id of tattooRequired) {
  if (defs.includes(`'${id}'`) || defs.includes(`"${id}"`)) {
    pass(`Tattoo section present: ${id}`);
  } else {
    fail(`Tattoo section missing: ${id}`);
  }
}

// Rock climbing required sections
const climbingRequired = [
  'climbing-risks',
  'equipment-inspection',
  'belayer-competency',
  'climbing-type',
  'rescue-evacuation',
];
for (const id of climbingRequired) {
  if (defs.includes(`'${id}'`) || defs.includes(`"${id}"`)) {
    pass(`Rock climbing section present: ${id}`);
  } else {
    fail(`Rock climbing section missing: ${id}`);
  }
}

// Volunteer required sections
const volunteerRequired = [
  'volunteer-participation',
  'scope-of-activities',
  'known-risks',
  'safety-instructions',
  'volunteer-status',
];
for (const id of volunteerRequired) {
  if (defs.includes(`'${id}'`) || defs.includes(`"${id}"`)) {
    pass(`Volunteer section present: ${id}`);
  } else {
    fail(`Volunteer section missing: ${id}`);
  }
}

// Core sections required in all types
const coreRequired = [
  'assumption-of-risk',
  'indemnification',
  'emergency-medical',
  'governing-law',
  'signature',
];
for (const id of coreRequired) {
  if (defs.includes(`'${id}'`) || defs.includes(`"${id}"`)) {
    pass(`Core section present: ${id}`);
  } else {
    fail(`Core section missing: ${id}`);
  }
}

// Exports required
const requiredExports = [
  'getWaiverDefinition',
  'getWaiverChecklist',
  'getWaiverTemplateVersion',
  'serializeWaiverDefinition',
  'serializeAllChecklists',
];
for (const fn of requiredExports) {
  if (defs.includes(`export function ${fn}`) || defs.includes(`export const ${fn}`)) {
    pass(`Exported: ${fn}`);
  } else {
    fail(`Not exported: ${fn}`);
  }
}

// ---------------------------------------------------------------------------
console.log('\n[2] Checking generate-pdf.ts imports from waiver-definitions\n');

const pdfPath = resolve(srcPages, 'api/generate-pdf.ts');
const pdf = read(pdfPath);

if (pdf.includes('waiver-definitions')) {
  pass('generate-pdf.ts imports from waiver-definitions');
} else {
  fail('generate-pdf.ts does NOT import from waiver-definitions');
}

if (pdf.includes('getWaiverDefinition')) {
  pass('generate-pdf.ts calls getWaiverDefinition');
} else {
  fail('generate-pdf.ts does NOT call getWaiverDefinition');
}

if (pdf.includes('getWaiverTemplateVersion')) {
  pass('generate-pdf.ts calls getWaiverTemplateVersion');
} else {
  fail('generate-pdf.ts does NOT call getWaiverTemplateVersion');
}

// Confirm no duplicate inline activity clause strings remain
const oldDuplicateMarkers = [
  'TATTOO PROCEDURE CONSENT',
  'BLOODBORNE PATHOGEN',
  'BELAYER COMPETENCY',
  'VOLUNTEER PARTICIPATION ACKNOWLEDGEMENT',
];
for (const marker of oldDuplicateMarkers) {
  if (pdf.includes(marker)) {
    fail(`generate-pdf.ts still contains duplicate inline clause string: "${marker}" — should be in waiver-definitions.ts only`);
  } else {
    pass(`No duplicate inline clause in generate-pdf.ts: "${marker}"`);
  }
}

// ---------------------------------------------------------------------------
console.log('\n[3] Checking WaiverForm.astro uses shared definitions\n');

const formPath = resolve(srcComponents, 'WaiverForm.astro');
const form = read(formPath);

if (form.includes('waiver-definitions')) {
  pass('WaiverForm.astro imports from waiver-definitions');
} else {
  fail('WaiverForm.astro does NOT import from waiver-definitions');
}

if (form.includes('serializeAllChecklists')) {
  pass('WaiverForm.astro calls serializeAllChecklists');
} else {
  fail('WaiverForm.astro does NOT call serializeAllChecklists');
}

if (form.includes('wm-checklists')) {
  pass('WaiverForm.astro embeds wm-checklists JSON for client');
} else {
  fail('WaiverForm.astro does NOT embed wm-checklists JSON for client');
}

if (form.includes('/api/waiver-sections')) {
  pass('WaiverForm.astro fetches /api/waiver-sections for live preview');
} else {
  fail('WaiverForm.astro does NOT fetch /api/waiver-sections for live preview');
}

// Confirm old hand-maintained generic preview text is gone
const oldGenericMarkers = [
  // The old hardcoded generic preview function used these literal strings
  'RELEASE OF LIABILITY:',
  'SEVERABILITY:',
];
// These should NOT appear in the client <script> block anymore
// We check that the script block doesn't contain these old hand-coded strings
const scriptBlock = form.split('<script>')[1] || '';
for (const marker of oldGenericMarkers) {
  if (scriptBlock.includes(marker)) {
    fail(`WaiverForm.astro client script still contains old generic preview string: "${marker}"`);
  } else {
    pass(`WaiverForm.astro client script does not hand-maintain: "${marker}"`);
  }
}

// Check waiver-sections API endpoint exists
console.log('\n[4] Checking /api/waiver-sections endpoint exists\n');
const sectionsPath = resolve(srcPages, 'api/waiver-sections.ts');
const sections = read(sectionsPath);
if (sections.includes('serializeWaiverDefinition')) {
  pass('waiver-sections.ts uses serializeWaiverDefinition');
} else {
  fail('waiver-sections.ts does NOT use serializeWaiverDefinition');
}
if (sections.includes('Content-Type') && sections.includes('application/json')) {
  pass('waiver-sections.ts returns JSON response');
} else {
  fail('waiver-sections.ts does NOT return a JSON response');
}

// ---------------------------------------------------------------------------
console.log(`\n${'─'.repeat(50)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  console.error(`\n❌ ${failed} check(s) failed — see above.\n`);
  process.exit(1);
} else {
  console.log(`\n✅ All ${passed} checks passed.\n`);
  process.exit(0);
}
