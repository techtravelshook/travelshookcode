export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    const externalRes = await fetch(
      `https://travelshook.co.uk/${path}`,
      { cache: "no-store" }
    );

    const data = await externalRes.json();
    return Response.json(data);

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}