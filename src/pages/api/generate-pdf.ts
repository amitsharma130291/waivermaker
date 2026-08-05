import type { APIRoute } from 'astro';
// @ts-ignore -- pdfkit has no bundled types but is installed
import PDFDocument from 'pdfkit';
import { getWaiverDefinition, getWaiverTemplateVersion, type WaiverData } from '../../data/waiver-definitions';

const activitySlug = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'general';

export const GET: APIRoute = async ({ url }) => {
  const params = url.searchParams;

  const data: WaiverData = {
    businessName:        params.get('businessName')        || '[Business Name]',
    state:               params.get('state')               || '[State]',
    ownerName:           params.get('ownerName')           || '[Owner / Manager]',
    businessAddress:     params.get('businessAddress')     || '[Address]',
    activityType:        params.get('activityType')        || 'Gym/Fitness',
    activityDescription: params.get('activityDescription') || '',
    specificRisks:       params.get('specificRisks')       || '',
    emergencyContact:    params.get('emergencyContact') === 'true',
    photoConsent:        params.get('photoConsent') === 'true',
    minorMode:           params.get('minorMode') === 'true',
    climbingTypes:       params.get('climbingType')
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

    const body   = 'Helvetica';
    const bold   = 'Helvetica-Bold';
    const pageW  = 496; // 612 - 2*58
    const grey   = '#374151';
    const dark   = '#111827';
    const muted  = '#6B7280';

    // IDs that are never numbered and never get a leading numeral
    const unnumbered = new Set([
      'participant-info',
      'emergency-contact',
      'governing-law',
      'severability',
      'participant-acknowledgement',
      'photo-consent',
      'signature',
    ]);

    const addPageIfNeeded = (height = 90) => {
      if (doc.y + height > 700) doc.addPage();
    };

    // Render a standard prose section
    const renderSection = (num: number, title: string, text: string) => {
      const estHeight = Math.max(72, Math.min(text.length / 2.2, 220));
      addPageIfNeeded(estHeight);
      const label = num > 0 ? `${num}. ${title}` : title;
      doc.font(bold).fontSize(9.5).fillColor(dark).text(label);
      doc
        .font(body)
        .fontSize(9.5)
        .fillColor(grey)
        .text(text, { lineGap: 2.5 })
        .moveDown(0.75);
    };

    // Render a form/fill-in section (monospaced-style, slightly larger line spacing)
    const renderFormSection = (title: string, text: string) => {
      const lines = text.split('\n');
      const estHeight = 28 + lines.length * 18;
      addPageIfNeeded(estHeight);
      doc.font(bold).fontSize(9.5).fillColor(dark).text(title).moveDown(0.25);
      for (const line of lines) {
        if (line.trim() === '') {
          doc.moveDown(0.3);
        } else {
          doc.font(body).fontSize(9.5).fillColor(grey).text(line, { lineGap: 4 });
        }
      }
      doc.moveDown(0.75);
    };

    // Divider line
    const divider = () => {
      doc.moveDown(0.2);
      doc.moveTo(58, doc.y).lineTo(554, doc.y).strokeColor('#E5E7EB').lineWidth(0.5).stroke();
      doc.moveDown(0.6);
    };

    // -------------------------------------------------------------------------
    // Document header
    // -------------------------------------------------------------------------
    doc
      .font(body)
      .fontSize(8)
      .fillColor(muted)
      .text(`Generated: ${generatedDate}`, { align: 'right' });

    doc
      .font(bold)
      .fontSize(16)
      .fillColor(dark)
      .text('LIABILITY WAIVER AND RELEASE OF CLAIMS', { align: 'center' })
      .moveDown(0.3);

    doc.font(bold).fontSize(11).fillColor(dark).text(data.businessName || '[Business Name]', { align: 'center' });

    if (data.businessAddress) {
      doc.font(body).fontSize(9.5).fillColor(grey).text(data.businessAddress, { align: 'center' });
    }

    const actLabel = data.activityType || 'General Activities';
    doc.font(body).fontSize(9.5).fillColor(grey).text(`${actLabel}  ·  ${data.state || '[State]'}`, { align: 'center' });

    if (data.ownerName) {
      doc.font(body).fontSize(9).fillColor(muted).text(`Owner / Manager: ${data.ownerName}`, { align: 'center' });
    }

    doc.moveDown(0.5);
    divider();

    // -------------------------------------------------------------------------
    // Sections
    // -------------------------------------------------------------------------
    let sectionNum = 0;

    for (const section of sections) {
      const text = section.body(data);

      if (section.isForm) {
        renderFormSection(section.title, text);
        divider();
      } else if (unnumbered.has(section.id)) {
        renderSection(0, section.title, text);
      } else {
        sectionNum++;
        renderSection(sectionNum, section.title, text);
      }
    }

    // -------------------------------------------------------------------------
    // Footer on every page
    // -------------------------------------------------------------------------
    const range = doc.bufferedPageRange();
    for (let i = 0; i < range.count; i++) {
      doc.switchToPage(i);
      const footerY = doc.page.height - 58;
      doc
        .font(body)
        .fontSize(7)
        .fillColor(muted)
        .text(
          `Generated with WaiverMaker  ·  Template: ${templateVersion}  ·  Generated: ${generatedDate}  ·  waivermaker.com\n` +
          `This document is an informational template only. It does not constitute legal advice. Consult a licensed attorney in your jurisdiction for advice specific to your situation.`,
          58,
          footerY,
          { width: pageW, align: 'center', lineGap: 1 }
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
