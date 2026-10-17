import { siteConfig } from "@/lib/site-config";
import type { Lang } from "@/lib/i18n";

const partners =
  "Stratejik ortaklar: SFA Elektrik, Demofire, AFB Enerji, Elko";

export function companyFactsBlock(lang: Lang): string {
  const base = `
- Telefon: ${siteConfig.phone}
- E-posta: ${siteConfig.email}
- Adres: ${siteConfig.address}
- Mesai saatleri: Pazartesi–Cuma 09:00–18:00 (UTC+3)`;

  if (lang === "en") {
    return `Basic information about YST Elektrik:
- Founded in 2017 in İzmir, Türkiye.
- Services: solar (PV), IoT-enabled solar, BESS/ESS storage, fire suppression, high-voltage products.
- Authorized supplier for SFA Elektrik.
${base.replace("E-posta", "Email").replace("Adres", "Address").replace("Mesai saatleri", "Business hours")}
- Strategic partners: SFA Elektrik, Demofire, AFB Enerji, Elko`;
  }
  if (lang === "de") {
    return `Grundinformationen zu YST Elektrik:
- 2017 in İzmir, Türkei gegründet.
- Leistungen: Photovoltaik, IoT-Solar, BESS/ESS-Speicher, Brandbekämpfung, Mittelspannungsprodukte.
- Autorisierter Lieferant von SFA Elektrik.
${base.replace("E-posta", "E-Mail").replace("Adres", "Adresse").replace("Mesai saatleri", "Geschäftszeiten")}
- Strategische Partner: SFA Elektrik, Demofire, AFB Enerji, Elko`;
  }
  return `YST Elektrik hakkında temel bilgiler:
- 2017 yılında İzmir'de kuruldu.
- Güneş enerjisi sistemleri (GES), IoT destekli güneş panelleri, BESS/ESS enerji depolama, yangın söndürme sistemleri ve yüksek gerilim ürünleri alanlarında hizmet verir.
- SFA Elektrik'in yetkili tedarikçisidir.
${base}
- ${partners}`;
}
