import type { Messages } from "@/lib/i18n";
import type { ServiceSlug } from "@/lib/site-config";
import { serviceImages } from "@/lib/site-config";

export function getServiceItems(t: Messages["services"]) {
  const items: {
    slug: ServiceSlug;
    title: string;
    desc: string;
    image: string;
  }[] = [
    {
      slug: "solar",
      title: t.solar.title,
      desc: t.solar.desc,
      image: serviceImages.solar,
    },
    {
      slug: "bess",
      title: t.bess.title,
      desc: t.bess.desc,
      image: serviceImages.bess,
    },
    {
      slug: "high-voltage",
      title: t.highVoltage.title,
      desc: t.highVoltage.desc,
      image: serviceImages["high-voltage"],
    },
    {
      slug: "iot-solar",
      title: t.iotSolar.title,
      desc: t.iotSolar.desc,
      image: serviceImages["iot-solar"],
    },
    {
      slug: "fire-suppression",
      title: t.fireSuppression.title,
      desc: t.fireSuppression.desc,
      image: serviceImages["fire-suppression"],
    },
  ];
  return items;
}
