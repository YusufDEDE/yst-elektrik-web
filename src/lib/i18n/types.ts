export type Lang = "tr" | "en" | "de";

export type Messages = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    about: string;
    services: string;
    contact: string;
    getQuote: string;
  };
  footer: {
    tagline: string;
    corporate: string;
    services: string;
    contact: string;
    rights: string;
    motto: string;
  };
  home: {
    heroBadge: string;
    heroTitle: string;
    heroTitleAccent: string;
    heroSubtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    statsProjects: string;
    statsYears: string;
    statsClients: string;
    partnersTitle: string;
    servicesLabel: string;
    servicesTitle: string;
    servicesTitleAccent: string;
    servicesDesc: string;
    servicesViewAll: string;
    learnMore: string;
  };
  services: {
    pageTitle: string;
    pageDesc: string;
    solar: { title: string; desc: string };
    iotSolar: { title: string; desc: string };
    highVoltage: { title: string; desc: string };
    bess: { title: string; desc: string };
    fireSuppression: { title: string; desc: string };
  };
  tools: {
    drawerTitle: string;
    solarCalculator: string;
    billSavings: string;
    fireSelector: string;
    bessCalculator: string;
    quickQuote: string;
    carbonCalculator: string;
    electricityPrices: string;
  };
  widgets: {
    settings: string;
    theme: string;
    language: string;
    cookies: string;
    cookieTitle: string;
    cookieDesc: string;
    necessary: string;
    analytics: string;
    marketing: string;
    savePrefs: string;
  };
  common: {
    comingSoon: string;
    backHome: string;
  };
};
