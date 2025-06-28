import notionClient from "@/lib/notion/client"
import { NextResponse } from "next/server"


export async function GET(request: Request) {
  const listUsersResponse = await notionClient.users.list({})

  console.log({listUsersResponse})
  return NextResponse.json(listUsersResponse)
}