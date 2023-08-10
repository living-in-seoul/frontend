'use server';
import { redirect } from 'next/navigation';

export async function oauthHandler() {
  const url =
    'https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&access_type=offline&include_granted_scopes=true&response_type=code&state=google&redirect_uri=http://localhost:3000/auth/callback&client_id=500936602674-vrj3f1miuhi8kr6v1t1phm3e6fjmf5tv.apps.googleusercontent.com';
  redirect(url);
}
