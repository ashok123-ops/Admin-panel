import {NextResponse} from "next/server";import{serverDb}from"@/lib/supabase";
export async function GET(req:Request){const u=new URL(req.url);const code=u.searchParams.get("code");if(code){const s=await serverDb();await s.auth.exchangeCodeForSession(code)}return NextResponse.redirect(new URL("/dashboard",u.origin))}
