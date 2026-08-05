/**
 * waiver-definitions.ts
 * Single source of truth for waiver sections used by both PDF generation and browser preview.
 * No state-specific legal assertions — all language is general-purpose.
 * Framework: 10/10 master waiver structure (Aug 2026 revision).
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
  minorMode?: boolean;
};

export type WaiverSection = {
  id: string;
  title: string;
  body: (data: WaiverData) => string;
  tooltip?: string;
  /** When true, the PDF renderer treats body as fill-in lines, not prose. */
  isForm?: boolean;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalizeRisks(raw: string | undefined, fallback: string): string {
  if (!raw || !raw.trim()) return fallback;
  let s = raw.trim();
  // lowercase first character if it's a capital that follows "including "
  s = s.charAt(0).toLowerCase() + s.slice(1);
  // strip trailing period so we can append one consistently
  s = s.replace(/\.$/, '');
  return s;
}

// ---------------------------------------------------------------------------
// Shared / Core sections
// ---------------------------------------------------------------------------

function coreSection_ParticipantInfo(): WaiverSection {
  return {
    id: 'participant-info',
    title: 'PARTICIPANT INFORMATION',
    isForm: true,
    body: (_d) =>
      'Full Legal Name: _____________________________________________\n\n' +
      'Date of Birth: _______________________________________________\n\n' +
      'Address: ____________________________________________________\n\n' +
      'City: ________________________  State: _______  ZIP: __________\n\n' +
      'Phone: ______________________________________________________\n\n' +
      'Email: ______________________________________________________',
  };
}

function coreSection_EmergencyContact(): WaiverSection {
  return {
    id: 'emergency-contact',
    title: 'EMERGENCY CONTACT',
    isForm: true,
    body: (_d) =>
      'Emergency Contact Name: ______________________________________\n\n' +
      'Relationship: ________________________________________________\n\n' +
      'Emergency Phone: ____________________________________________',
  };
}

function coreSection_ActivityDescription(data: WaiverData): WaiverSection {
  return {
    id: 'activity-description',
    title: 'ACTIVITY / PARTICIPATION DESCRIPTION',
    body: (d) => {
      const at = d.activityType || 'the selected activity';
      const desc = d.activityDescription
        ? `The specific activities include: ${d.activityDescription}.`
        : '';
      return `I am participating in ${at} activities offered by ${d.businessName || '[Business Name]'}. ${desc}`.trim();
    },
  };
}

function coreSection_AssumptionOfRisk(): WaiverSection {
  return {
    id: 'assumption-of-risk',
    title: 'ASSUMPTION OF RISK',
    tooltip: 'I voluntarily accept the inherent risks of participating in this activity.',
    body: (d) => {
      const bn = d.businessName || '[Business Name]';
      const at = d.activityType || 'the selected activity';
      return `I understand that the risks described in this document cannot be completely eliminated. I voluntarily choose to participate in ${at} activities offered by ${bn} with knowledge of those risks and accept the risks inherent in the activities described, to the extent permitted by applicable law.`;
    },
  };
}

function coreSection_ReleaseOfLiability(): WaiverSection {
  return {
    id: 'release-of-liability',
    title: 'RELEASE OF LIABILITY',
    tooltip: 'A release of claims arising from the inherent risks of the activity, to the extent permitted by law.',
    body: (d) => {
      const bn = d.businessName || '[Business Name]';
      return `In consideration of being permitted to participate, I, for myself and on behalf of my heirs, assigns, and personal representatives, hereby release and discharge ${bn} and its owners, officers, employees, agents, and contractors from any and all claims, demands, and causes of action arising from my participation in these activities, to the extent permitted by applicable law. This release does not apply to claims arising from gross negligence or intentional misconduct.`;
    },
  };
}

function coreSection_Indemnification(): WaiverSection {
  return {
    id: 'indemnification',
    title: 'INDEMNIFICATION',
    tooltip: 'The participant agrees to compensate the business for losses caused by their own actions or omissions.',
    body: (d) => {
      const bn = d.businessName || '[Business Name]';
      return `I agree to indemnify and hold harmless ${bn} and its representatives from losses, liability, damage, or costs resulting from my own acts or omissions while participating in these activities.`;
    },
  };
}

function coreSection_EmergencyMedical(): WaiverSection {
  return {
    id: 'emergency-medical',
    title: 'EMERGENCY MEDICAL AUTHORIZATION',
    body: (d) => {
      const bn = d.businessName || '[Business Name]';
      return `If I am incapacitated in an emergency, I authorise ${bn} to seek emergency medical treatment on my behalf. I understand that I remain responsible for related medical costs.`;
    },
  };
}

function coreSection_GoverningLaw(): WaiverSection {
  return {
    id: 'governing-law',
    title: 'GOVERNING LAW',
    tooltip: "Identifies which state's law applies to this document. Selecting a state does not guarantee the waiver satisfies all requirements of that state's law.",
    body: (d) => {
      const st = d.state || '[State]';
      return `This document is governed by the laws of the State of ${st}. Selecting a state sets this governing-law section only; it does not establish that this document satisfies every legal requirement applicable in that jurisdiction.`;
    },
  };
}

function coreSection_Severability(): WaiverSection {
  return {
    id: 'severability',
    title: 'SEVERABILITY',
    body: (_d) =>
      'If any provision of this document is found to be unenforceable, the remaining provisions shall continue in full force and effect. This document constitutes the entire agreement between the parties with respect to the subject matter herein.',
  };
}

function coreSection_ParticipantAcknowledgement(): WaiverSection {
  return {
    id: 'participant-acknowledgement',
    title: 'PARTICIPANT ACKNOWLEDGEMENT',
    body: (_d) =>
      'By signing below, I acknowledge that I have read this document in its entirety, understand its terms, understand that it contains a release of claims, had an opportunity to ask questions before signing, and voluntarily agree to its terms.',
  };
}

function coreSection_Signature(includeMinor: boolean): WaiverSection {
  const minorBlock = includeMinor
    ? '\n\n\nIF PARTICIPANT IS A MINOR\n\n' +
      'Minor Participant Name: _______________________________________\n\n' +
      'Minor Date of Birth: _________________________________________\n\n' +
      'Parent / Guardian Name: ______________________________________\n\n' +
      'Relationship to Minor: _______________________________________\n\n' +
      'Parent / Guardian Signature: _________________________________\n\n' +
      'Date: _______________________________________________________'
    : '';

  return {
    id: 'signature',
    title: 'SIGNATURE',
    isForm: true,
    body: (_d) =>
      'Participant Signature: _______________________________________\n\n' +
      'Printed Name: _______________________________________________\n\n' +
      'Date: _______________________________________________________' +
      minorBlock,
  };
}

function coreSection_PhotoConsent(): WaiverSection {
  return {
    id: 'photo-consent',
    title: 'PHOTO / MEDIA CONSENT (OPTIONAL)',
    isForm: true,
    body: (d) => {
      const bn = d.businessName || '[Business Name]';
      return (
        `[ ] YES — I permit ${bn} to use photographs or video of my participation for promotional, educational, or organisational purposes.\n\n` +
        `[ ] NO — I do not grant photo or media consent.\n\n` +
        `Initials: ___________`
      );
    },
  };
}

// ---------------------------------------------------------------------------
// Gym / Fitness
// ---------------------------------------------------------------------------

function gymFitnessSections(data: WaiverData): WaiverSection[] {
  const extraRisks = normalizeRisks(
    data.specificRisks,
    'dropped weights, equipment malfunction or misuse, collision with other participants, cardiovascular stress, dizziness or loss of balance, dehydration, and aggravation of pre-existing injuries or conditions'
  );

  return [
    {
      id: 'gym-risk-acknowledgement',
      title: 'GYM & FITNESS RISK ACKNOWLEDGEMENT',
      body: (_d) =>
        `I understand that gym and fitness activities involve inherent and other risks, including: strenuous physical exertion; muscle strains and sprains; joint injuries; falls; ${extraRisks}; risks associated with free weights, resistance machines, and cardiovascular equipment; and risks in group fitness settings. These risks exist even when reasonable safety measures are in place.`,
    },
    {
      id: 'health-fitness-acknowledgement',
      title: 'HEALTH & FITNESS ACKNOWLEDGEMENT',
      body: (_d) =>
        'I understand that physical exercise may place stress on the cardiovascular and musculoskeletal systems. I am responsible for deciding whether participation is appropriate for me and for seeking medical advice when I have questions about my ability to participate. I agree to stop participating and seek appropriate assistance if I experience unusual pain, dizziness, shortness of breath, faintness, or other concerning symptoms.',
    },
    {
      id: 'gym-participant-responsibilities',
      title: 'PARTICIPANT RESPONSIBILITIES',
      body: (d) => {
        const bn = d.businessName || '[Business Name]';
        return `I agree to: follow posted rules and reasonable instructions from ${bn} staff; use equipment only for its intended purpose and within my experience and capabilities; request assistance when unsure how equipment works; stop using equipment that appears unsafe or damaged; and promptly report hazardous conditions to staff.`;
      },
    },
  ];
}

// ---------------------------------------------------------------------------
// Yoga Studio
// ---------------------------------------------------------------------------

function yogaSections(data: WaiverData): WaiverSection[] {
  const extraRisks = normalizeRisks(
    data.specificRisks,
    'falls during balancing or inversion poses, muscle or joint strain from overstretching, heat-related effects in heated classes, dehydration, and use of props'
  );

  return [
    {
      id: 'yoga-risk-acknowledgement',
      title: 'YOGA ACTIVITY RISK ACKNOWLEDGEMENT',
      body: (_d) =>
        `I understand that yoga activities involve inherent and other risks, including: physical exertion; overstretching; inversions; ${extraRisks}. These risks exist even with qualified instruction and reasonable safety measures in place.`,
    },
    {
      id: 'yoga-health-acknowledgement',
      title: 'HEALTH ACKNOWLEDGEMENT',
      body: (_d) =>
        'I am responsible for assessing whether yoga participation is appropriate for my current physical condition. I will inform the instructor of any injuries, medical conditions, or limitations before class, and I will modify or discontinue poses if I experience pain, dizziness, or other concerning symptoms.',
    },
    {
      id: 'yoga-participant-responsibilities',
      title: 'PARTICIPANT RESPONSIBILITIES',
      body: (_d) =>
        'I agree to follow instructor guidance, use props and studio equipment as directed, and practice within my current abilities. I will report unsafe conditions and stop participating if I experience concerning symptoms.',
    },
  ];
}

// ---------------------------------------------------------------------------
// Tattoo Studio
// ---------------------------------------------------------------------------

function tattooSections(data: WaiverData): WaiverSection[] {
  const sections: WaiverSection[] = [
    {
      id: 'tattoo-procedure-consent',
      title: 'TATTOO PROCEDURE CONSENT',
      body: (d) => {
        const desc = d.activityDescription || 'the selected tattoo service';
        return `I consent to the tattoo procedure described as: ${desc}. I confirm that I have had an opportunity to ask questions and that I am proceeding voluntarily.`;
      },
    },
    {
      id: 'tattoo-risk-acknowledgement',
      title: 'TATTOO RISK ACKNOWLEDGEMENT',
      body: (_d) =>
        'I understand that tattooing involves skin penetration and carries risks including: skin irritation; allergic reaction to ink or other materials; infection; scarring; keloid formation; colour variation or fading; unexpected healing outcomes; and, in rare cases, bloodborne pathogen exposure despite standard precautions.',
    },
    {
      id: 'health-disclosure',
      title: 'HEALTH DISCLOSURE',
      body: (_d) =>
        'I have disclosed all relevant allergies, skin conditions, blood disorders, medications, and other health information that could affect the procedure or my healing process. I understand that providing accurate health information is my responsibility.',
    },
    {
      id: 'bloodborne-pathogen',
      title: 'STERILISATION & BLOODBORNE PATHOGEN ACKNOWLEDGEMENT',
      body: (_d) =>
        "I acknowledge the studio's stated sterilisation protocols and single-use equipment practices. I understand that despite standard precautions, a residual risk of infection or bloodborne pathogen exposure cannot be completely eliminated.",
    },
    {
      id: 'aftercare-responsibility',
      title: 'AFTERCARE RESPONSIBILITY',
      body: (_d) =>
        'I accept full responsibility for following the aftercare instructions provided and for seeking appropriate medical advice promptly if I have any concerns about healing, infection, or adverse reactions.',
    },
    {
      id: 'result-appearance',
      title: 'RESULT & APPEARANCE ACKNOWLEDGEMENT',
      body: (_d) =>
        'I understand that healed results, colour retention, and final appearance can vary significantly with skin type, placement, aftercare adherence, and individual healing responses. The studio does not guarantee a specific outcome.',
    },
    {
      id: 'tattoo-participant-responsibilities',
      title: 'PARTICIPANT RESPONSIBILITIES',
      body: (_d) =>
        'I confirm that I am 18 years of age or older (or have presented valid parental consent), that I am not under the influence of alcohol or drugs, and that I have eaten recently. I agree to follow all studio safety rules.',
    },
  ];

  return sections;
}

// ---------------------------------------------------------------------------
// Rock Climbing
// ---------------------------------------------------------------------------

function rockClimbingSections(data: WaiverData): WaiverSection[] {
  const extraRisks = normalizeRisks(
    data.specificRisks,
    'falling objects, equipment failure, landing surface hazards, and the actions or errors of other climbers'
  );

  return [
    {
      id: 'climbing-risk-acknowledgement',
      title: 'CLIMBING RISK ACKNOWLEDGEMENT',
      body: (_d) =>
        `I understand that climbing activities involve inherent and other risks, including: falls; wall or rock failure; ${extraRisks}; and risks during belaying. These risks exist even when reasonable safety measures and supervision are in place.`,
    },
    {
      id: 'climbing-type',
      title: 'TYPE OF CLIMBING ACKNOWLEDGEMENT',
      body: (d) => {
        const types =
          d.climbingTypes && d.climbingTypes.length
            ? d.climbingTypes.join(', ')
            : 'bouldering, top-rope, lead climbing, and/or outdoor climbing';
        return `I acknowledge that my participation may involve: ${types}. I understand the risks specific to each format I choose to undertake.`;
      },
    },
    {
      id: 'equipment-inspection',
      title: 'EQUIPMENT INSPECTION RESPONSIBILITY',
      body: (_d) =>
        'I am responsible for inspecting all equipment I use before each session and for immediately reporting to staff any equipment that appears worn, damaged, or unsafe.',
    },
    {
      id: 'belayer-competency',
      title: 'BELAYER COMPETENCY',
      body: (_d) =>
        "For top-rope or lead climbing, I confirm that I will belay only when I am competent to do so and will comply with the facility's belay certification and safety requirements.",
    },
    {
      id: 'rescue-evacuation',
      title: 'RESCUE & EVACUATION ACKNOWLEDGEMENT',
      body: (_d) =>
        'I understand that rescue or evacuation — particularly in outdoor settings — may be delayed or logistically difficult, and that emergency response conditions can vary significantly.',
    },
    {
      id: 'climbing-participant-responsibilities',
      title: 'PARTICIPANT RESPONSIBILITIES',
      body: (d) => {
        const bn = d.businessName || '[Business Name]';
        return `I agree to follow ${bn}'s posted rules and staff instructions; use equipment only as directed and within my skill level; complete any required safety orientation; and immediately report unsafe conditions.`;
      },
    },
  ];
}

// ---------------------------------------------------------------------------
// Volunteer
// ---------------------------------------------------------------------------

function volunteerSections(data: WaiverData): WaiverSection[] {
  return [
    {
      id: 'volunteer-participation',
      title: 'VOLUNTEER PARTICIPATION ACKNOWLEDGEMENT',
      body: (d) => {
        const bn = d.businessName || '[Business Name]';
        const desc = d.activityDescription
          ? `My volunteer activities may include: ${d.activityDescription}.`
          : 'My volunteer activities will include tasks assigned by the organisation.';
        return `I voluntarily participate in activities organised by ${bn}. ${desc}`;
      },
    },
    {
      id: 'volunteer-risk-acknowledgement',
      title: 'RISK ACKNOWLEDGEMENT',
      body: (d) => {
        const extraRisks = normalizeRisks(
          d.specificRisks,
          'physical exertion, travel, environmental conditions, exposure to weather, and the actions of third parties'
        );
        return `I understand that volunteer work may involve inherent and other risks, including: ${extraRisks}. These risks vary by activity and setting.`;
      },
    },
    {
      id: 'volunteer-responsibilities',
      title: 'VOLUNTEER RESPONSIBILITIES',
      body: (_d) =>
        'I agree to follow reasonable safety instructions provided by the organisation, report unsafe conditions promptly, and conduct myself in a manner that does not endanger myself or others.',
    },
    {
      id: 'volunteer-status',
      title: 'VOLUNTEER STATUS ACKNOWLEDGEMENT',
      body: (_d) =>
        'I understand that I am participating as an unpaid volunteer and not as an employee or independent contractor. I do not expect compensation for my services.',
    },
  ];
}

// ---------------------------------------------------------------------------
// Dog Grooming
// ---------------------------------------------------------------------------

function dogGroomingSections(data: WaiverData): WaiverSection[] {
  const extraRisks = normalizeRisks(
    data.specificRisks,
    'nicks or skin irritation from grooming tools, adverse reactions to grooming products, and stress-related health events in animals with undisclosed or underlying conditions'
  );

  return [
    {
      id: 'dog-grooming-risk-acknowledgement',
      title: 'GROOMING RISK ACKNOWLEDGEMENT',
      body: (_d) =>
        `I understand that grooming may involve risks including: animal stress; bites or scratches from the animal; ${extraRisks}. These risks exist even when experienced, careful staff perform the service.`,
    },
    {
      id: 'pet-health-disclosure',
      title: 'PET HEALTH DISCLOSURE',
      body: (_d) =>
        "I confirm that I have disclosed my pet's relevant health conditions, behavioural history, medications, allergies, and any prior grooming incidents. I understand that providing accurate health information is my responsibility and that withholding information may affect my pet's safety.",
    },
    {
      id: 'animal-care-acknowledgement',
      title: 'ANIMAL CARE ACKNOWLEDGEMENT',
      body: (d) => {
        const bn = d.businessName || '[Business Name]';
        return `I understand that grooming may be stressful for animals. I authorise ${bn} to pause or discontinue grooming if staff consider it necessary for the animal's safety or welfare, and I agree that I remain responsible for applicable service charges in that event.`;
      },
    },
    {
      id: 'dog-grooming-responsibilities',
      title: 'OWNER RESPONSIBILITIES',
      body: (_d) =>
        'I confirm that my pet is current on required vaccinations, is free of contagious conditions at the time of appointment, and is not aggressive in a way I have not disclosed. I agree to be reachable by phone during the grooming appointment.',
    },
  ];
}

// ---------------------------------------------------------------------------
// Horse Riding
// ---------------------------------------------------------------------------

function horseRidingSections(data: WaiverData): WaiverSection[] {
  const extraRisks = normalizeRisks(
    data.specificRisks,
    'terrain and trail hazards, interaction with other riders or animals, and weather-related conditions'
  );

  return [
    {
      id: 'equine-risk-acknowledgement',
      title: 'EQUINE ACTIVITY RISK ACKNOWLEDGEMENT',
      body: (_d) =>
        `I understand that horse riding and related equine activities carry inherent and other risks, including: falls; unpredictable horse behaviour; kicks; bites; equipment failure or slippage; ${extraRisks}. These risks exist even when horses are well-trained and reasonable safety measures are used.`,
    },
    {
      id: 'equine-unpredictability',
      title: 'HORSE UNPREDICTABILITY ACKNOWLEDGEMENT',
      body: (_d) =>
        'I acknowledge that horses are living animals whose behaviour cannot be fully predicted or controlled. Even experienced, calm horses can react unexpectedly to environmental stimuli.',
    },
    {
      id: 'equine-activity-laws',
      title: 'EQUINE ACTIVITY LAW NOTICE',
      body: (_d) =>
        'I have been advised that many states have enacted equine activity liability acts that may affect my rights. I am encouraged to consult a licensed attorney in my state to understand any applicable statutory provisions.',
    },
    {
      id: 'equine-participant-responsibilities',
      title: 'PARTICIPANT RESPONSIBILITIES',
      body: (d) => {
        const bn = d.businessName || '[Business Name]';
        return `I agree to follow all instructions given by ${bn} staff and instructors; wear appropriate protective equipment as required; disclose my prior riding experience honestly; and immediately inform staff of any safety concern I observe.`;
      },
    },
  ];
}

// ---------------------------------------------------------------------------
// Personal Training
// ---------------------------------------------------------------------------

function personalTrainingSections(data: WaiverData): WaiverSection[] {
  const extraRisks = normalizeRisks(
    data.specificRisks,
    'muscle strains, joint injuries, cardiovascular stress, dehydration, falls, and aggravation of pre-existing injuries or conditions'
  );

  return [
    {
      id: 'pt-risk-acknowledgement',
      title: 'PERSONAL TRAINING RISK ACKNOWLEDGEMENT',
      body: (_d) =>
        `I understand that personal training activities involve inherent and other risks, including: strenuous physical exertion; ${extraRisks}. These risks exist even with qualified trainer supervision.`,
    },
    {
      id: 'pt-health-acknowledgement',
      title: 'HEALTH ACKNOWLEDGEMENT',
      body: (_d) =>
        'I am responsible for assessing whether personal training participation is appropriate for my current physical condition and for seeking medical clearance when advisable. I will fully disclose any health conditions, injuries, or physical limitations to my trainer before each session, and I will stop exercising immediately and seek assistance if I experience unusual pain, dizziness, shortness of breath, or faintness.',
    },
    {
      id: 'pt-participant-responsibilities',
      title: 'PARTICIPANT RESPONSIBILITIES',
      body: (d) => {
        const bn = d.businessName || '[Business Name]';
        return `I agree to follow my trainer's instructions and exercise within my current abilities; use equipment only as directed; inform ${bn} of any injury or change in my physical condition; and report unsafe equipment or conditions immediately.`;
      },
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

  // Activity-specific sections
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
            const extraRisks = normalizeRisks(
              d.specificRisks,
              'physical exertion, equipment use, facility conditions, and related hazards'
            );
            const desc = d.activityDescription ? ` The activity includes: ${d.activityDescription}.` : '';
            return `I understand that ${activity} activities may involve inherent and other risks, including: ${extraRisks}.${desc}`;
          },
        },
        {
          id: 'general-participant-responsibilities',
          title: 'PARTICIPANT RESPONSIBILITIES',
          body: (d) => {
            const bn = d.businessName || '[Business Name]';
            return `I agree to follow the rules and reasonable instructions of ${bn} staff, use equipment within my capabilities, and report unsafe conditions promptly.`;
          },
        },
      ];
  }

  // Build full section list per 10/10 framework
  const sections: WaiverSection[] = [
    // Block 1: Participant identity
    coreSection_ParticipantInfo(),
    coreSection_EmergencyContact(),
    // Block 2: Activity
    coreSection_ActivityDescription(data),
    // Block 3: Risk + responsibilities (vertical-specific)
    ...activitySections,
    // Block 4: Legal core
    coreSection_AssumptionOfRisk(),
    coreSection_ReleaseOfLiability(),
    coreSection_Indemnification(),
    coreSection_EmergencyMedical(),
    // Block 5: Governing law + document terms
    coreSection_GoverningLaw(),
    coreSection_Severability(),
  ];

  // Optional photo consent (its own section, separate from liability)
  if (data.photoConsent) {
    sections.push(coreSection_PhotoConsent());
  }

  // Participant acknowledgement + signature always last
  sections.push(coreSection_ParticipantAcknowledgement());
  sections.push(coreSection_Signature(data.minorMode === true));

  return sections;
}

/**
 * Returns the checklist of items shown in the "Your waiver includes:" card
 * for the given activity type.
 */
export function getWaiverChecklist(activityType: string): string[] {
  const core = [
    'Assumption of risk & voluntary participation',
    'Release of liability (to the extent permitted by law)',
    'Indemnification (own acts/omissions only)',
    'Emergency medical authorization',
    'Governing-law section with disclaimer',
    'Severability clause',
    'Participant acknowledgement',
    'Signature fields',
  ];

  switch (activityType) {
    case 'Tattoo Studio':
      return [
        'Procedure consent',
        'Tattoo risk acknowledgement',
        'Health disclosure',
        'Sterilisation & bloodborne pathogen acknowledgement',
        'Aftercare responsibility',
        'Result & appearance acknowledgement',
        'Participant responsibilities',
        'Optional photo / portfolio consent',
        ...core,
      ];
    case 'Rock Climbing':
      return [
        'Climbing risk acknowledgement',
        'Climbing type acknowledgement (bouldering / top-rope / lead)',
        'Equipment inspection responsibility',
        'Belayer competency',
        'Rescue & evacuation acknowledgement',
        'Participant responsibilities',
        ...core,
      ];
    case 'Volunteer':
      return [
        'Volunteer participation acknowledgement',
        'Volunteer risk acknowledgement',
        'Volunteer responsibilities',
        'Volunteer status (not employee)',
        'Optional photo / media consent',
        ...core,
      ];
    case 'Gym/Fitness':
      return [
        'Gym & fitness risk acknowledgement (weights, cardio, group fitness)',
        'Health & fitness acknowledgement',
        'Participant responsibilities',
        'Optional photo / media consent',
        ...core,
      ];
    case 'Yoga Studio':
      return [
        'Yoga activity risk acknowledgement (stretching, inversions, heat)',
        'Health acknowledgement',
        'Participant responsibilities',
        'Optional photo / media consent',
        ...core,
      ];
    case 'Dog Grooming':
      return [
        'Grooming risk acknowledgement',
        'Pet health disclosure',
        'Animal care acknowledgement',
        'Owner responsibilities',
        ...core,
      ];
    case 'Horse Riding':
      return [
        'Equine activity risk acknowledgement',
        'Horse unpredictability acknowledgement',
        'Equine activity law notice',
        'Participant responsibilities',
        ...core,
      ];
    case 'Personal Training':
      return [
        'Personal training risk acknowledgement',
        'Health acknowledgement',
        'Participant responsibilities',
        'Optional photo / media consent',
        ...core,
      ];
    default:
      return [
        'Activity-specific risk acknowledgement',
        'Participant responsibilities',
        ...core,
      ];
  }
}

/**
 * Returns a version string for the template of a given activity type.
 */
export function getWaiverTemplateVersion(activityType: string): string {
  const slug = (activityType || 'general')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${slug}-waiver v2.0`;
}

/**
 * Serialise the waiver definition for a given activity + data into a plain
 * JSON-safe structure so Astro can embed it in a <script> tag for client-side
 * interpolation without re-executing the TypeScript module in the browser.
 */
export function serializeWaiverDefinition(
  activityType: string,
  data: WaiverData
): Array<{ id: string; title: string; body: string; tooltip?: string; isForm?: boolean }> {
  return getWaiverDefinition(activityType, data).map((s) => ({
    id: s.id,
    title: s.title,
    body: s.body(data),
    tooltip: s.tooltip,
    isForm: s.isForm,
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
