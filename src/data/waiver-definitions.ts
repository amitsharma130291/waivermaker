/**
 * waiver-definitions.ts
 * Single source of truth for waiver sections used by both PDF generation and browser preview.
 * No state-specific legal assertions — all language is general-purpose.
 */

export type WaiverData = {
  businessName?: string;
  state?: string;
  ownerName?: string;
  businessAddress?: string;
  activityType?: string;
  activityDescription?: string;
  specificRisks?: string;
  minimumAge?: string;
  emergencyContact?: boolean;
  photoConsent?: boolean;
  climbingTypes?: string[];
};

export type WaiverSection = {
  id: string;
  title: string;
  body: (data: WaiverData) => string;
  tooltip?: string;
};

// ---------------------------------------------------------------------------
// Core sections (present in all waiver types)
// ---------------------------------------------------------------------------

function coreSection_AssumptionOfRisk(data: WaiverData): WaiverSection {
  return {
    id: 'assumption-of-risk',
    title: 'ASSUMPTION OF RISK & RELEASE OF LIABILITY',
    body: (d) => {
      const bn = d.businessName || '[Business Name]';
      const at = d.activityType || 'the selected activity';
      const risks = d.specificRisks
        ? d.specificRisks
        : 'risks of injury, illness, property damage, and other foreseeable or unforeseeable hazards';
      return `I understand that ${at} activities offered by ${bn} involve inherent and other risks, including ${risks}. I voluntarily choose to participate and release ${bn} and its owners, staff, agents, and contractors from claims arising from those inherent risks, to the extent permitted by applicable law.`;
    },
  };
}

function coreSection_Indemnification(data: WaiverData): WaiverSection {
  return {
    id: 'indemnification',
    title: 'INDEMNIFICATION',
    tooltip: 'The participant agrees to compensate the business for any losses caused by their own actions.',
    body: (d) => {
      const bn = d.businessName || '[Business Name]';
      return `I agree to indemnify and hold harmless ${bn} and its representatives from losses, liability, damage, or costs resulting from my own acts or omissions while participating in these activities.`;
    },
  };
}

function coreSection_EmergencyMedical(data: WaiverData): WaiverSection {
  return {
    id: 'emergency-medical',
    title: 'EMERGENCY MEDICAL AUTHORIZATION',
    body: (d) => {
      const bn = d.businessName || '[Business Name]';
      return `If I am incapacitated in an emergency, I authorise ${bn} to seek emergency medical treatment for me. I understand that I remain responsible for related medical costs.`;
    },
  };
}

function coreSection_GoverningLaw(data: WaiverData): WaiverSection {
  return {
    id: 'governing-law',
    title: 'GOVERNING LAW',
    tooltip: 'Identifies which state\'s law applies to this document. Selecting a state does not guarantee the waiver satisfies all requirements of that state\'s law.',
    body: (d) => {
      const st = d.state || '[State]';
      return `This document is governed by the laws of the State of ${st}. Selecting a state identifies the governing-law section only; it does not establish that this document satisfies every legal requirement in that state.`;
    },
  };
}

function coreSection_Signature(data: WaiverData): WaiverSection {
  return {
    id: 'signature',
    title: 'SIGNATURE',
    body: (_d) =>
      'Participant Signature: __________________________________   Date: __________________\nPrinted Name: __________________________________\n\nParent / Guardian Signature (if applicable): ______________________________   Date: __________________',
  };
}

function coreSection_EmergencyContact(data: WaiverData): WaiverSection {
  return {
    id: 'emergency-contact',
    title: 'EMERGENCY CONTACT',
    body: (_d) =>
      'Name: __________________________________  Relationship: __________________\nPhone: __________________________________',
  };
}

// ---------------------------------------------------------------------------
// Tattoo sections
// ---------------------------------------------------------------------------

function tattooSections(data: WaiverData): WaiverSection[] {
  const sections: WaiverSection[] = [
    {
      id: 'tattoo-procedure-consent',
      title: 'TATTOO PROCEDURE CONSENT',
      body: (d) => {
        const desc = d.activityDescription || 'the selected tattoo service';
        return `I consent to the tattoo procedure described as ${desc} and confirm that I have had an opportunity to ask questions before the procedure.`;
      },
    },
    {
      id: 'health-disclosure',
      title: 'HEALTH DISCLOSURE',
      body: (_d) =>
        'I have disclosed relevant allergies, skin conditions, blood disorders, medications, and other health information that could affect the procedure or healing process.',
    },
    {
      id: 'ink-allergy',
      title: 'INK ALLERGY & SKIN REACTION ACKNOWLEDGEMENT',
      body: (_d) =>
        'I understand that skin irritation, allergic reaction, infection, scarring, colour variation, and other reactions can occur despite reasonable care.',
    },
    {
      id: 'bloodborne-pathogen',
      title: 'BLOODBORNE PATHOGEN & STERILISATION ACKNOWLEDGEMENT',
      body: (_d) =>
        "I acknowledge the studio's stated sterilisation and single-use practices and understand that tattooing involves skin penetration and related risks.",
    },
    {
      id: 'aftercare-responsibility',
      title: 'AFTERCARE RESPONSIBILITY',
      body: (_d) =>
        'I accept responsibility for following aftercare instructions and for seeking appropriate medical advice if I have concerns about healing.',
    },
    {
      id: 'result-appearance',
      title: 'RESULT / APPEARANCE ACKNOWLEDGEMENT',
      body: (_d) =>
        'I understand that healed results, colour retention, and appearance can vary with skin type, placement, aftercare, and individual healing.',
    },
  ];

  if (data.photoConsent) {
    sections.push({
      id: 'photo-consent',
      title: 'PHOTO / PORTFOLIO CONSENT',
      body: (d) => {
        const bn = d.businessName || '[Business Name]';
        return `I consent to ${bn} using photographs of the work for portfolio and promotional purposes.`;
      },
    });
  }

  return sections;
}

// ---------------------------------------------------------------------------
// Rock Climbing sections
// ---------------------------------------------------------------------------

function rockClimbingSections(data: WaiverData): WaiverSection[] {
  return [
    {
      id: 'climbing-risks',
      title: 'CLIMBING RISKS ACKNOWLEDGEMENT',
      body: (_d) =>
        'I understand climbing risks include falls, wall or rock failure, falling objects, equipment failure, landing hazards, and the actions of other participants.',
    },
    {
      id: 'equipment-inspection',
      title: 'EQUIPMENT INSPECTION RESPONSIBILITY',
      body: (_d) =>
        'I am responsible for inspecting equipment I use and for reporting any concern to staff before participating.',
    },
    {
      id: 'belayer-competency',
      title: 'BELAYER COMPETENCY',
      body: (_d) =>
        "For top-rope or lead climbing, I confirm that I will belay only when competent and will follow the facility's safety requirements.",
    },
    {
      id: 'climbing-type',
      title: 'TYPE OF CLIMBING ACKNOWLEDGEMENT',
      body: (d) => {
        const types =
          d.climbingTypes && d.climbingTypes.length
            ? d.climbingTypes.join(' / ')
            : 'Bouldering / Top-rope / Lead / Outdoor';
        return `I acknowledge the climbing types that may be involved: ${types}.`;
      },
    },
    {
      id: 'rescue-evacuation',
      title: 'RESCUE & EVACUATION ACKNOWLEDGEMENT',
      body: (_d) =>
        'I understand that rescue or evacuation may be delayed or difficult and that emergency response conditions can vary.',
    },
  ];
}

// ---------------------------------------------------------------------------
// Volunteer sections
// ---------------------------------------------------------------------------

function volunteerSections(data: WaiverData): WaiverSection[] {
  const sections: WaiverSection[] = [
    {
      id: 'volunteer-participation',
      title: 'VOLUNTEER PARTICIPATION ACKNOWLEDGEMENT',
      body: (d) => {
        const bn = d.businessName || '[Business Name]';
        return `I voluntarily participate in activities organised by ${bn}.`;
      },
    },
    {
      id: 'scope-of-activities',
      title: 'SCOPE OF VOLUNTEER ACTIVITIES',
      body: (d) =>
        d.activityDescription
          ? `My volunteer activities may include: ${d.activityDescription}.`
          : 'My volunteer activities may include tasks assigned by the organisation.',
    },
    {
      id: 'known-risks',
      title: 'KNOWN & INHERENT RISKS',
      body: (_d) =>
        'I understand that volunteer work may involve physical, travel, environmental, and other risks depending on the activity.',
    },
    {
      id: 'safety-instructions',
      title: 'SAFETY INSTRUCTIONS ACKNOWLEDGEMENT',
      body: (_d) =>
        'I agree to follow reasonable safety instructions and to report unsafe conditions promptly.',
    },
    {
      id: 'volunteer-status',
      title: 'VOLUNTEER STATUS ACKNOWLEDGEMENT',
      body: (_d) =>
        'I understand that I am participating as a volunteer and not as an employee.',
    },
  ];

  if (data.photoConsent) {
    sections.push({
      id: 'photo-media-consent',
      title: 'PHOTO / MEDIA CONSENT',
      body: (d) => {
        const bn = d.businessName || '[Business Name]';
        return `I consent to ${bn} using photographs or media of my volunteer participation for organisational purposes.`;
      },
    });
  }

  return sections;
}

// ---------------------------------------------------------------------------
// Gym / Fitness sections
// ---------------------------------------------------------------------------

function gymFitnessSections(_data: WaiverData): WaiverSection[] {
  return [
    {
      id: 'gym-activity-risks',
      title: 'ACTIVITY-SPECIFIC RISK ACKNOWLEDGEMENT',
      body: (_d) =>
        'I understand that gym and fitness activities may involve physical exertion, equipment use, muscle strain, joint injury, overexertion, and slip-and-fall hazards.',
    },
    {
      id: 'equipment-facility',
      title: 'EQUIPMENT & FACILITY USE',
      body: (_d) =>
        'I will use equipment and facilities within my capabilities, follow reasonable instructions, and report unsafe conditions or equipment concerns.',
    },
  ];
}

// ---------------------------------------------------------------------------
// Yoga sections
// ---------------------------------------------------------------------------

function yogaSections(_data: WaiverData): WaiverSection[] {
  return [
    {
      id: 'yoga-activity-risks',
      title: 'ACTIVITY-SPECIFIC RISK ACKNOWLEDGEMENT',
      body: (_d) =>
        'I understand that yoga activities may involve physical exertion, stretching, inversions, heat exposure, dehydration, and use of props.',
    },
    {
      id: 'yoga-equipment',
      title: 'EQUIPMENT & FACILITY USE',
      body: (_d) =>
        'I will use equipment and studio facilities within my capabilities, follow instructor guidance, and report any concerns about my physical condition before class.',
    },
  ];
}

// ---------------------------------------------------------------------------
// Dog Grooming sections
// ---------------------------------------------------------------------------

function dogGroomingSections(_data: WaiverData): WaiverSection[] {
  return [
    {
      id: 'dog-grooming-risks',
      title: 'ACTIVITY-SPECIFIC RISK ACKNOWLEDGEMENT',
      body: (_d) =>
        'I understand that grooming may involve animal stress, bites, scratches, pet medical events, and grooming tools. I have disclosed my pet\'s health conditions and medications.',
    },
    {
      id: 'animal-care',
      title: 'ANIMAL CARE ACKNOWLEDGEMENT',
      body: (_d) =>
        'I understand that grooming may be stressful for an animal and that the business may pause or stop service when it considers that necessary for safety or welfare.',
    },
  ];
}

// ---------------------------------------------------------------------------
// Horse Riding sections
// ---------------------------------------------------------------------------

function horseRidingSections(_data: WaiverData): WaiverSection[] {
  return [
    {
      id: 'equine-risks',
      title: 'EQUINE ACTIVITY RISK ACKNOWLEDGEMENT',
      body: (_d) =>
        'I understand that horse riding and related activities carry inherent risks including falls, unpredictable horse behaviour, kicks, bites, terrain hazards, and equipment issues, even when reasonable safety measures are in place.',
    },
    {
      id: 'equine-activity',
      title: 'EQUINE ACTIVITY ACKNOWLEDGEMENT',
      body: (_d) =>
        'I understand that horses are unpredictable animals and that riding and related activities carry inherent risks even when reasonable safety measures are used. I acknowledge that equine activity laws vary by state, and I have been advised to verify any state-specific notice or wording requirements with a local attorney.',
    },
  ];
}

// ---------------------------------------------------------------------------
// Personal Training sections
// ---------------------------------------------------------------------------

function personalTrainingSections(_data: WaiverData): WaiverSection[] {
  return [
    {
      id: 'pt-activity-risks',
      title: 'ACTIVITY-SPECIFIC RISK ACKNOWLEDGEMENT',
      body: (_d) =>
        'I understand that personal training activities may involve physical exertion, muscle strain, joint injury, equipment use, and health conditions that could be affected by exercise.',
    },
    {
      id: 'pt-equipment',
      title: 'EQUIPMENT & FACILITY USE',
      body: (_d) =>
        'I will use equipment and facilities within my capabilities, follow trainer instructions, and disclose any health conditions that may affect my participation.',
    },
  ];
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Returns the ordered list of waiver sections for the given activity type,
 * with data interpolated where available.
 */
export function getWaiverDefinition(activityType: string, data: WaiverData): WaiverSection[] {
  const at = activityType || 'Gym/Fitness';

  // Activity-specific sections (numbered 4+ in the document)
  let activitySections: WaiverSection[] = [];

  switch (at) {
    case 'Tattoo Studio':
      activitySections = tattooSections(data);
      break;
    case 'Rock Climbing':
      activitySections = rockClimbingSections(data);
      break;
    case 'Volunteer':
      activitySections = volunteerSections(data);
      break;
    case 'Gym/Fitness':
      activitySections = gymFitnessSections(data);
      break;
    case 'Yoga Studio':
      activitySections = yogaSections(data);
      break;
    case 'Dog Grooming':
      activitySections = dogGroomingSections(data);
      break;
    case 'Horse Riding':
      activitySections = horseRidingSections(data);
      break;
    case 'Personal Training':
      activitySections = personalTrainingSections(data);
      break;
    default:
      activitySections = [
        {
          id: 'general-activity-risks',
          title: 'ACTIVITY-SPECIFIC RISK ACKNOWLEDGEMENT',
          body: (d) => {
            const activity = d.activityType || 'the selected activity';
            const desc = d.activityDescription ? ` The activity includes: ${d.activityDescription}.` : '';
            return `I understand that ${activity} activities may involve physical exertion, equipment use, facility conditions, and related risks.${desc}`;
          },
        },
      ];
  }

  // Build full section list
  const sections: WaiverSection[] = [
    coreSection_AssumptionOfRisk(data),
    coreSection_Indemnification(data),
    coreSection_EmergencyMedical(data),
    ...activitySections,
    coreSection_GoverningLaw(data),
  ];

  if (data.emergencyContact) {
    sections.push(coreSection_EmergencyContact(data));
  }

  sections.push(coreSection_Signature(data));

  return sections;
}

/**
 * Returns the checklist of items shown in the "Your waiver includes:" card
 * for the given activity type.
 */
export function getWaiverChecklist(activityType: string): string[] {
  switch (activityType) {
    case 'Tattoo Studio':
      return [
        'Procedure consent',
        'Health disclosures',
        'Ink allergy & reaction risks',
        'Bloodborne pathogen acknowledgement',
        'Aftercare responsibility',
        'Result / appearance acknowledgement',
        'Assumption of risk & release',
        'Optional photo consent',
        'Governing-law section',
        'Signature fields',
      ];
    case 'Rock Climbing':
      return [
        'Climbing risks acknowledgement',
        'Equipment inspection responsibility',
        'Belayer competency clause',
        'Type of climbing (bouldering/top-rope/lead)',
        'Rescue & evacuation clause',
        'Assumption of risk & release',
        'Governing-law section',
        'Signature fields',
      ];
    case 'Volunteer':
      return [
        'Volunteer participation acknowledgement',
        'Scope of activities',
        'Known risks disclosure',
        'Safety instructions acknowledgement',
        'Volunteer status (not employee)',
        'Optional photo/media consent',
        'Assumption of risk & release',
        'Governing-law section',
        'Signature fields',
      ];
    case 'Gym/Fitness':
      return [
        'Activity risk acknowledgement',
        'Equipment & facility use',
        'Assumption of risk & release',
        'Indemnification',
        'Emergency medical authorization',
        'Governing-law section',
        'Signature fields',
      ];
    case 'Yoga Studio':
      return [
        'Activity risk acknowledgement (stretching, inversions, heat)',
        'Equipment & facility use',
        'Assumption of risk & release',
        'Indemnification',
        'Emergency medical authorization',
        'Governing-law section',
        'Signature fields',
      ];
    case 'Dog Grooming':
      return [
        'Pet health condition disclosure',
        'Animal stress & grooming risk acknowledgement',
        'Animal care acknowledgement',
        'Assumption of risk & release',
        'Emergency medical authorization',
        'Governing-law section',
        'Signature fields',
      ];
    case 'Horse Riding':
      return [
        'Equine activity risk acknowledgement',
        'Unpredictable horse behaviour disclosure',
        'Assumption of risk & release',
        'Indemnification',
        'Emergency medical authorization',
        'Governing-law section',
        'Signature fields',
      ];
    case 'Personal Training':
      return [
        'Activity risk acknowledgement',
        'Equipment & facility use',
        'Assumption of risk & release',
        'Indemnification',
        'Emergency medical authorization',
        'Governing-law section',
        'Signature fields',
      ];
    default:
      return [
        'Activity risk acknowledgement',
        'Assumption of risk & release',
        'Indemnification',
        'Emergency medical authorization',
        'Governing-law section',
        'Signature fields',
      ];
  }
}

/**
 * Returns a version string for the template of a given activity type.
 * Useful for footer/audit trail.
 */
export function getWaiverTemplateVersion(activityType: string): string {
  const slug = (activityType || 'general')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${slug}-waiver v1.0`;
}

/**
 * Serialise the waiver definition for a given activity + data into a plain
 * JSON-safe structure so Astro can embed it in a <script> tag for client-side
 * interpolation without re-executing the TypeScript module in the browser.
 */
export function serializeWaiverDefinition(
  activityType: string,
  data: WaiverData
): Array<{ id: string; title: string; body: string; tooltip?: string }> {
  return getWaiverDefinition(activityType, data).map((s) => ({
    id: s.id,
    title: s.title,
    body: s.body(data),
    tooltip: s.tooltip,
  }));
}

/**
 * Serialise ALL checklists as a JSON map keyed by activity type,
 * for embedding in the page.
 */
export function serializeAllChecklists(): Record<string, string[]> {
  const types = [
    'Gym/Fitness', 'Tattoo Studio', 'Yoga Studio', 'Dog Grooming',
    'Rock Climbing', 'Horse Riding', 'Volunteer', 'Personal Training',
  ];
  const result: Record<string, string[]> = {};
  for (const t of types) result[t] = getWaiverChecklist(t);
  return result;
}
