import type { APIRoute } from 'astro';
import { serializeWaiverDefinition, type WaiverData } from '../../data/waiver-definitions';

/**
 * GET /api/waiver-sections
 * Returns the ordered waiver sections for a given activity + form data as JSON.
 * Used by WaiverForm.astro client-side to build the live browser preview
 * from the same shared definitions as the PDF renderer.
 */
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
    climbingTypes:       params.get('climbingType')
      ? [params.get('climbingType') as string]
      : undefined,
  };

  const sections = serializeWaiverDefinition(data.activityType || 'Gym/Fitness', data);

  return new Response(JSON.stringify(sections), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => ({}));
  const query = new URLSearchParams(
    Object.entries(body).map(([key, value]) => [key, String(value)])
  );
  return GET({
    url: new URL(`http://localhost/api/waiver-sections?${query.toString()}`),
    request,
    params: {},
    props: {},
    redirect: () => new Response(null, { status: 302 }),
    rewrite: async () => new Response(null, { status: 200 }),
    locals: {},
  } as any);
};
