'use server';
import { redirect } from 'next/navigation';

export async function oauthHandler(url: string) {
  redirect(url);
}
