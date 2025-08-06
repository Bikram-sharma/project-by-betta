// /pages/api/service-providers.ts

import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  // const { service, location } = req.body;

  // Simulated database query — replace with real DB access
  const fakeDB = [
    {
      name: "Phuntsho Wangmo",
      skill: "Frontend Developer",
      experience: "3+ years",
      location: "Thimphu, Bhutan",
      rate: "$35/hr",
    },
    {
      name: "Karma Dorji",
      skill: "Plumber",
      experience: "5 years",
      location: "Paro, Bhutan",
      rate: "$25/hr",
    },
    {
      name: "Sonam Lhamo",
      skill: "Electrician",
      experience: "2 years",
      location: "Thimphu, Bhutan",
      rate: "$20/hr",
    },
  ];

  // const results = fakeDB.filter(
  //   (item) =>
  //     item.skill.toLowerCase().includes(service?.toLowerCase()) &&
  //     item.location.toLowerCase().includes(location?.toLowerCase())
  // );

  return Response.json(fakeDB);
}
