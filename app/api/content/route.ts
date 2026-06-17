export async function GET() {
  const url = `${process.env.PORTFOLIO_SERVER_URL}/types`;
  const res = await fetch(url);

  return Response.json(await res.json());
}
