import type { Lang } from "@/lib/i18n";

export type YstAiCopy = {
  hintNeedHelp: string;
  hintAskAi: string;
  aiName: string;
  aiSub: string;
  hello: string;
  askAboutYst: string;
  placeholder: string;
  disclaimer: string;
  errorGeneric: string;
  errorNoKey: string;
  suggestions: string[];
};

export function getYstAiCopy(lang: Lang): YstAiCopy {
  if (lang === "en") {
    return {
      hintNeedHelp: "Need help?",
      hintAskAi: "Ask YST AI!",
      aiName: "YST AI Assistant",
      aiSub: "Exclusive to YST Elektrik",
      hello: "Hello! 👋",
      askAboutYst: "You can ask questions about YST Elektrik.",
      placeholder: "Ask about YST Elektrik...",
      disclaimer: "Only questions related to YST Elektrik are answered.",
      errorGeneric: "An error occurred, please try again.",
      errorNoKey:
        "AI assistant is not configured. Please contact us directly:\n📞 +90 (232) 459 65 65\n✉️ yusuf.topgac@yst.com.tr",
      suggestions: [
        "How long does it take to install solar energy systems?",
        "What is BESS/ESS energy storage?",
        "How can I get a quote for a fire suppression system?",
        "What does being an SFA Elektrik authorized supplier mean?",
        "What are your working hours?",
        "What is your contact information?",
      ],
    };
  }
  if (lang === "de") {
    return {
      hintNeedHelp: "Brauchen Sie Hilfe?",
      hintAskAi: "Fragen Sie YST AI!",
      aiName: "YST KI-Assistent",
      aiSub: "Exklusiv für YST Elektrik",
      hello: "Hallo! 👋",
      askAboutYst: "Sie können Fragen zu YST Elektrik stellen.",
      placeholder: "Fragen Sie nach YST Elektrik...",
      disclaimer: "Es werden nur Fragen zu YST Elektrik beantwortet.",
      errorGeneric: "Ein Fehler ist aufgetreten, bitte versuchen Sie es später erneut.",
      errorNoKey:
        "Der KI-Assistent ist nicht konfiguriert. Bitte kontaktieren Sie uns direkt:\n📞 +90 (232) 459 65 65\n✉️ yusuf.topgac@yst.com.tr",
      suggestions: [
        "Wie lange dauert die Installation von Solarenergiesystemen?",
        "Was ist BESS/ESS-Energiespeicher?",
        "Wie erhalte ich ein Angebot für ein Brandbekämpfungssystem?",
        "Was bedeutet es, ein autorisierter SFA Elektrik Lieferant zu sein?",
        "Was sind Ihre Arbeitszeiten?",
        "Wie lauten Ihre Kontaktinformationen?",
      ],
    };
  }
  return {
    hintNeedHelp: "Yardıma mı ihtiyacınız var?",
    hintAskAi: "YST AI'a danışın!",
    aiName: "YST AI Asistan",
    aiSub: "YST Elektrik'e özel",
    hello: "Merhaba! 👋",
    askAboutYst: "YST Elektrik hakkında soru sorabilirsiniz.",
    placeholder: "YST Elektrik hakkında sorun...",
    disclaimer: "Yalnızca YST Elektrik ile ilgili sorular yanıtlanır.",
    errorGeneric: "Bir hata oluştu, lütfen tekrar deneyin.",
    errorNoKey:
      "AI asistanı şu an yapılandırılmamış. Lütfen bizimle doğrudan iletişime geçin:\n📞 +90 (232) 459 65 65\n✉️ yusuf.topgac@yst.com.tr",
    suggestions: [
      "Güneş enerjisi sistemleri ne kadar sürede kurulur?",
      "BESS/ESS enerji depolama nedir?",
      "Yangın söndürme sistemi için nasıl teklif alabilirim?",
      "SFA Elektrik yetkili tedarikçisi ne anlama geliyor?",
      "Mesai saatleriniz nedir?",
      "İletişim bilgileriniz nelerdir?",
    ],
  };
}
