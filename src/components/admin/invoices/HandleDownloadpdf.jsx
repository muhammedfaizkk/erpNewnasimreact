import { pdf } from "@react-pdf/renderer";
import Invoice from "./Invoice";

export async function handleDownload(invoice) {
  const blob = await pdf(<Invoice invoice={invoice} />).toBlob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `Invoice-${invoice.invoiceNo}.pdf`;
  a.click();

  URL.revokeObjectURL(url);
}