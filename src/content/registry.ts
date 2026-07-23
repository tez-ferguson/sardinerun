import type { Guide } from "./types";

import { guide as whatIs } from "./guides/what-is-the-sardine-run";
import { guide as seasonDates } from "./guides/sardine-run-season-dates";
import { guide as whereToSee } from "./guides/where-to-see-the-sardine-run";
import { guide as route } from "./guides/sardine-run-route";
import { guide as marineLife } from "./guides/sardine-run-marine-life";
import { guide as packingList } from "./guides/sardine-run-packing-list";
import { guide as withoutScuba } from "./guides/sardine-run-without-scuba";
import { guide as waterConditions } from "./guides/sardine-run-water-conditions";
import { guide as moalboal } from "./guides/moalboal-vs-south-africa";
import { guide as portStJohns } from "./guides/sardine-run-port-st-johns";
import { guide as eastLondonChintsa } from "./guides/sardine-run-east-london-chintsa";
import { guide as cost } from "./guides/sardine-run-cost";
import { guide as whyHappen } from "./guides/why-does-the-sardine-run-happen";
import { guide as photography } from "./guides/sardine-run-photography";
import { guide as chintsaTravel } from "./guides/chintsa-travel-guide";
import { guide as faq } from "./guides/sardine-run-faq";
import { guide as season2026 } from "./guides/sardine-run-2026-season-report";
import { guide as fitness } from "./guides/sardine-run-fitness-preparation";

export const GUIDES: Guide[] = [
  whatIs,
  seasonDates,
  whereToSee,
  route,
  marineLife,
  packingList,
  withoutScuba,
  waterConditions,
  moalboal,
  portStJohns,
  eastLondonChintsa,
  cost,
  whyHappen,
  photography,
  chintsaTravel,
  faq,
  season2026,
  fitness,
];

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
