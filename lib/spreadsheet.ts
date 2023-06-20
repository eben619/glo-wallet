import { GoogleSpreadsheet } from "google-spreadsheet";

const EMAIL_COLUMN = "Email (ID: id-2c29c00d)";
const EA_COLUMN = "Added to website?";

export const fetchEarlyAdoptersEmails = async () => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    private_key: process.env.GOOGLE_PRIVATE_KEY!,
  });

  await doc.loadInfo();

  const sheet = doc.sheetsByTitle["HeyFlow Early adopters"];

  const rows = await sheet.getRows();

  const emails = rows
    .filter((row) => row[EA_COLUMN] === "yes" && row[EMAIL_COLUMN].length)
    .map((row) => row[EMAIL_COLUMN]);

  const uniqueEmails = new Set<string>(emails);

  return uniqueEmails;
};
