import { google } from "googleapis";

// Built lazily so `JSON.parse(GOOGLE_SERVICE_ACCOUNT_KEY)` doesn't run (and
// throw) at module import time during the Vercel build, where the env var
// isn't set.
export async function appendOrderToSheet(row: any[]) {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "Orders!A1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });
}
