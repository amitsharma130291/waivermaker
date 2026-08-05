import type { APIRoute } from 'astro';
// @ts-ignore -- pdfkit has no bundled types but is installed
import PDFDocument from 'pdfkit';
import { getWaiverDefinition, getWaiverTemplateVersion, type WaiverData } from '../../data/waiver-definitions';

const activitySlug = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'general';

export const GET: APIRoute = async ({ url }) => {
  const params = url.searchParams;

  const data: WaiverData = {
    businessName:      params.get('businessName')      || '[Business Name]',
    state:             params.get('state')             || '[State]',
    ownerName:         params.get('ownerName')         || '[Owner / Manager]',
    businessAddress:   params.get('businessAddress')   || '[Address]',
    activityType:      params.get('activityType')      || 'Gym/Fitness',
    activityDescription: params.get('activityDescription') || '',
    specificRisks:     params.get('specificRisks')     || '',
    emergencyContact:  params.get('emergencyContact') === 'true',
    photoConsent:      params.get('photoConsent') === 'true',
    climbingTypes:     params.get('climbingType')
      ? [params.get('climbingType') as string]
      : undefined,
  };

  const generatedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date());
  const templateVersion = getWaiverTemplateVersion(data.activityType || 'Gym/Fitness');
  const sections = getWaiverDefinition(data.activityType || 'Gym/Fitness', data);

  return new Promise<Response>((resolve) => {
    const doc = new PDFDocument({ margin: 58, size: 'LETTER', bufferPages: true });
    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(chunks);
      resolve(
        new Response(pdfBuffer, {
          status: 200,
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${activitySlug(data.activityType || 'general')}-waiver-${(data.businessName || 'waiver').replace(/\s+/g, '-').toLowerCase()}.pdf"`,
            'Content-Length': String(pdfBuffer.length),
          },
        })
      );
    });

    const body = 'Helvetica';
    const bold = 'Helvetica-Bold';

    const addPageIfNeeded = (height = 90) => {
      if (doc.y + height > 690) doc.addPage();
    };

    const renderSection = (sectionNumber: number, title: string, text: string) => {
      addPageIfNeeded(Math.max(82, text.length / 2.3));
      const label = sectionNumber > 0 ? `${sectionNumber}. ${title}` : title;
      doc.font(bold).fontSize(10).fillColor('#111827').text(label);
      doc.font(body).fontSize(9.5).fillColor('#374151').text(text, { lineGap: 3 }).moveDown(0.7);
    };

    // Header
    doc.fontSize(8).fillColor('#6B7280').text(`Generated: ${generatedDate}`, { align: 'right' });
    doc.font(bold).fontSize(17).fillColor('#111827')
      .text('LIABILITY WAIVER AND RELEASE', { align: 'center' }).moveDown(0.35);
    doc.font(bold).fontSize(11).text(data.businessName || '[Business Name]', { align: 'center' });
    doc.font(body).fontSize(9.5).fillColor('#374151')
      .text(`${data.businessAddress}  |  Governing state: ${data.state}`, { align: 'center' });
    doc.text(`Owner / Manager: ${data.ownerName}`, { align: 'center' }).moveDown(0.8);
    doc.moveTo(58, doc.y).lineTo(554, doc.y).strokeColor('#E5E7EB').stroke().moveDown(0.8);

    // Render all sections from the shared definitions module
    // Core sections (assumption of risk, indemnification, emergency medical) get numbers 1-3,
    // activity-specific sections continue from 4, ungrouped sections (governing law, signature,
    // emergency contact) have no leading number.
    const unnumbered = new Set(['governing-law', 'signature', 'emergency-contact']);
    let sectionNum = 0;

    for (const section of sections) {
      const text = section.body(data);
      if (unnumbered.has(section.id)) {
        renderSection(0, section.title, text);
      } else {
        sectionNum++;
        renderSection(sectionNum, section.title, text);
      }
    }

    // Footer on every page
    const range = doc.bufferedPageRange();
    for (let i = 0; i < range.count; i++) {
      doc.switchToPage(i);
      doc.font(body).fontSize(7).fillColor('#6B7280').text(
        `Generated with WaiverMaker.com\nTemplate: ${templateVersion}\nGenerated: ${generatedDate}\nThis document is a template provided for informational purposes only. It does not constitute legal advice. Consult a licensed attorney in your jurisdiction.`,
        58, 704, { width: 496, align: 'center', lineGap: 1 }
      );
    }

    doc.end();
  });
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => ({}));
  const query = new URLSearchParams(
    Object.entries(body).map(([key, value]) => [key, String(value)])
  );
  return GET({
    url: new URL(`http://localhost/api/generate-pdf?${query.toString()}`),
    request,
    params: {},
    props: {},
    redirect: () => new Response(null, { status: 302 }),
    rewrite: async () => new Response(null, { status: 200 }),
    locals: {},
  } as any);
};
