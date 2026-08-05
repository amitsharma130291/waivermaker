import type { APIRoute } from 'astro';
// @ts-ignore -- pdfkit has no bundled types but is installed
import PDFDocument from 'pdfkit';

const activitySlug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'general';

export const GET: APIRoute = async ({ url }) => {
  const params = url.searchParams;
  const businessName = params.get('businessName') || '[Business Name]';
  const state = params.get('state') || '[State]';
  const ownerName = params.get('ownerName') || '[Owner / Manager]';
  const businessAddress = params.get('businessAddress') || '[Address]';
  const activityType = params.get('activityType') || 'Gym/Fitness';
  const activityDescription = params.get('activityDescription') || '';
  const specificRisks = params.get('specificRisks') || '';
  const emergencyContact = params.get('emergencyContact') === 'true';
  const photoConsent = params.get('photoConsent') === 'true';
  const climbingType = params.get('climbingType') || 'Bouldering / Top-rope / Lead / Outdoor';
  const generatedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date());

  return new Promise<Response>((resolve) => {
    const doc = new PDFDocument({ margin: 58, size: 'LETTER', bufferPages: true });
    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(chunks);
      resolve(new Response(pdfBuffer, { status: 200, headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${activitySlug(activityType)}-waiver-${businessName.replace(/\s+/g, '-').toLowerCase()}.pdf"`,
        'Content-Length': String(pdfBuffer.length),
      }}));
    });

    const body = 'Helvetica'; const bold = 'Helvetica-Bold';
    const addPageIfNeeded = (height = 90) => { if (doc.y + height > 690) doc.addPage(); };
    const section = (title: string, text: string) => {
      addPageIfNeeded(Math.max(82, text.length / 2.3));
      doc.font(bold).fontSize(10).fillColor('#111827').text(title);
      doc.font(body).fontSize(9.5).fillColor('#374151').text(text, { lineGap: 3 }).moveDown(.7);
    };

    doc.fontSize(8).fillColor('#6B7280').text(`Generated: ${generatedDate}`, { align: 'right' });
    doc.font(bold).fontSize(17).fillColor('#111827').text('LIABILITY WAIVER AND RELEASE', { align: 'center' }).moveDown(.35);
    doc.font(bold).fontSize(11).text(businessName, { align: 'center' });
    doc.font(body).fontSize(9.5).fillColor('#374151').text(`${businessAddress}  |  Governing state: ${state}`, { align: 'center' });
    doc.text(`Owner / Manager: ${ownerName}`, { align: 'center' }).moveDown(.8);
    doc.moveTo(58, doc.y).lineTo(554, doc.y).strokeColor('#E5E7EB').stroke().moveDown(.8);

    section('1. ASSUMPTION OF RISK & RELEASE OF LIABILITY', `I understand that ${activityType} activities offered by ${businessName} involve inherent and other risks, including ${specificRisks || 'risks of injury, illness, property damage, and other foreseeable or unforeseeable hazards'}. I voluntarily choose to participate and release ${businessName} and its owners, staff, agents, and contractors from claims arising from those inherent risks, to the extent permitted by applicable law.`);
    section('2. INDEMNIFICATION', `I agree to indemnify and hold harmless ${businessName} and its representatives from losses, liability, damage, or costs resulting from my own acts or omissions while participating in these activities.`);
    section('3. EMERGENCY MEDICAL AUTHORIZATION', `If I am incapacitated in an emergency, I authorise ${businessName} to seek emergency medical treatment for me. I understand that I remain responsible for related medical costs.`);

    const genericRisk = activityType === 'Yoga Studio' ? 'physical exertion, stretching, inversions, heat exposure, dehydration, and use of props' :
      activityType === 'Dog Grooming' ? 'animal stress, bites, scratches, pet medical events, and grooming tools' :
      activityType === 'Horse Riding' ? 'falls, unpredictable horse behaviour, kicks, bites, terrain, and equipment' :
      activityType === 'Personal Training' ? 'physical exertion, muscle strain, joint injury, equipment use, and health conditions' :
      'physical exertion, equipment use, facility conditions, and participation in the selected activity';

    if (activityType === 'Tattoo Studio') {
      section('4. TATTOO PROCEDURE CONSENT', `I consent to the tattoo procedure described as ${activityDescription || 'the selected tattoo service'} and confirm that I have had an opportunity to ask questions before the procedure.`);
      section('5. HEALTH DISCLOSURE', 'I have disclosed relevant allergies, skin conditions, blood disorders, medications, and other health information that could affect the procedure or healing process.');
      section('6. INK ALLERGY & SKIN REACTION ACKNOWLEDGEMENT', 'I understand that skin irritation, allergic reaction, infection, scarring, colour variation, and other reactions can occur despite reasonable care.');
      section('7. BLOODBORNE PATHOGEN & STERILISATION ACKNOWLEDGEMENT', 'I acknowledge the studio’s stated sterilisation and single-use practices and understand that tattooing involves skin penetration and related risks.');
      section('8. AFTERCARE RESPONSIBILITY', 'I accept responsibility for following aftercare instructions and for seeking appropriate medical advice if I have concerns about healing.');
      section('9. RESULT / APPEARANCE ACKNOWLEDGEMENT', 'I understand that healed results, colour retention, and appearance can vary with skin type, placement, aftercare, and individual healing.');
      if (photoConsent) section('10. PHOTO / PORTFOLIO CONSENT', `I consent to ${businessName} using photographs of the work for portfolio and promotional purposes.`);
    } else if (activityType === 'Rock Climbing') {
      section('4. CLIMBING RISKS ACKNOWLEDGEMENT', 'I understand climbing risks include falls, wall or rock failure, falling objects, equipment failure, landing hazards, and the actions of other participants.');
      section('5. EQUIPMENT INSPECTION RESPONSIBILITY', 'I am responsible for inspecting equipment I use and for reporting any concern to staff before participating.');
      section('6. BELAYER COMPETENCY', 'For top-rope or lead climbing, I confirm that I will belay only when competent and will follow the facility’s safety requirements.');
      section('7. TYPE OF CLIMBING ACKNOWLEDGEMENT', `I acknowledge the climbing types that may be involved: ${climbingType}.`);
      section('8. RESCUE & EVACUATION ACKNOWLEDGEMENT', 'I understand that rescue or evacuation may be delayed or difficult and that emergency response conditions can vary.');
    } else if (activityType === 'Volunteer') {
      section('4. VOLUNTEER PARTICIPATION ACKNOWLEDGEMENT', `I voluntarily participate in activities organised by ${businessName}.`);
      section('5. SCOPE OF VOLUNTEER ACTIVITIES', activityDescription ? `My volunteer activities may include: ${activityDescription}.` : 'My volunteer activities may include tasks assigned by the organisation.');
      section('6. KNOWN & INHERENT RISKS', 'I understand that volunteer work may involve physical, travel, environmental, and other risks depending on the activity.');
      section('7. SAFETY INSTRUCTIONS ACKNOWLEDGEMENT', 'I agree to follow reasonable safety instructions and to report unsafe conditions promptly.');
      section('8. VOLUNTEER STATUS ACKNOWLEDGEMENT', 'I understand that I am participating as a volunteer and not as an employee.');
      if (photoConsent) section('9. PHOTO / MEDIA CONSENT', `I consent to ${businessName} using photographs or media of my volunteer participation for organisational purposes.`);
    } else {
      section('4. ACTIVITY-SPECIFIC RISK ACKNOWLEDGEMENT', `I understand that ${activityType} may involve ${genericRisk}. ${activityDescription ? `The activity includes: ${activityDescription}.` : ''}`);
      if (['Gym/Fitness', 'Yoga Studio', 'Personal Training'].includes(activityType)) section('5. EQUIPMENT / FACILITY DISCLAIMER', 'I will use equipment and facilities within my capabilities, follow reasonable instructions, and report unsafe conditions or equipment concerns.');
      if (activityType === 'Dog Grooming') section('5. ANIMAL CARE DISCLAIMER', 'I understand that grooming may be stressful for an animal and that the business may pause or stop service when it considers that necessary for safety or welfare.');
      if (activityType === 'Horse Riding') section('5. EQUINE ACTIVITY ACKNOWLEDGEMENT', 'I understand that horses are unpredictable animals and that riding and related activities carry inherent risks even when reasonable safety measures are used.');
    }

    section('GOVERNING LAW', `This document is governed by the laws of the State of ${state}. Selecting a state identifies the governing-law section only; it does not establish that this document satisfies every requirement in that state.`);
    if (emergencyContact) section('EMERGENCY CONTACT', 'Name: __________________________________  Relationship: __________________\nPhone: __________________________________');
    section('SIGNATURE', 'Participant Signature: __________________________________   Date: __________________\nPrinted Name: __________________________________\n\nParent / Guardian Signature (if applicable): ______________________________   Date: __________________');

    const range = doc.bufferedPageRange();
    for (let i = 0; i < range.count; i++) { doc.switchToPage(i); doc.font(body).fontSize(7).fillColor('#6B7280').text(`Generated with WaiverMaker.com\nTemplate: ${activitySlug(activityType)}-waiver v1.0\nGenerated: ${generatedDate}\nThis document is a template provided for informational purposes only. It does not constitute legal advice. Consult a licensed attorney in your jurisdiction.`, 58, 704, { width: 496, align: 'center', lineGap: 1 }); }
    doc.end();
  });
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => ({}));
  const query = new URLSearchParams(Object.entries(body).map(([key, value]) => [key, String(value)]));
  return GET({ url: new URL(`http://localhost/api/generate-pdf?${query.toString()}`), request, params: {}, props: {}, redirect: () => new Response(null, { status: 302 }), rewrite: async () => new Response(null, { status: 200 }), locals: {} } as any);
};
