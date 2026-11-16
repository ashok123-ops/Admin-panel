import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { serverDb } from "@/lib/supabase";
const allowed = () => (process.env.ADMIN_EMAILS||"").split(",").map(x=>x.trim().toLowerCase()).filter(Boolean);
export async function requireAdmin() {
  const supabase=await serverDb(); const {data:{user}}=await supabase.auth.getUser();
  if(!user?.email) redirect("/login");
  if(!allowed().includes(user.email.toLowerCase())) redirect("/unauthorized");
  return user;
}
export async function adminApi() {
  const supabase=await serverDb(); const {data:{user}}=await supabase.auth.getUser();
  if(!user?.email || !allowed().includes(user.email.toLowerCase())) return NextResponse.json({error:"Unauthorized"},{status:401});
  return null;
}
