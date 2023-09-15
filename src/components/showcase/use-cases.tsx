"use client";

import { useState } from "react";
import UserCredentials from "./gui/credentials";
import RequestBody from "./gui/request-body";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import clsx from "clsx";

const USE_CASES = [
  {
    name: "Request Body",
    description:
      "Encrypt the request body to make spoofing harder and increase the security of your app.",
    component: RequestBody,
  },
  {
    name: "User Credentials",
    description:
      "Encrypt the request body to make spoofing harder and increase the security of your app.",
    component: UserCredentials,
  },
];

export default function UseCases() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const ActiveComponent = USE_CASES[activeIndex].component;

  return (
    <>
      <div className="hidden mt-10 w-full xl:grid place-items-center grid-cols-2 gap-x-10">
        <div>
          {USE_CASES.map((use_case, index) => (
            <div
              className={clsx(
                "border mb-3 p-5 w-[600px] rounded-md cursor-pointer",
                index === activeIndex ? "border-blue-400" : "border-input"
              )}
              onClick={() => setActiveIndex(index)}
              key={index}
            >
              <h3 className="font-medium">{use_case.name}</h3>
              <p className="text-sm">{use_case.description}</p>
            </div>
          ))}
        </div>
        <ActiveComponent />
      </div>
      <Accordion
        type="single"
        defaultValue="Request Body"
        collapsible
        className="w-full md:min-w-[500px] xl:hidden"
      >
        {USE_CASES.map((use_case, index) => (
          <AccordionItem value={use_case.name} key={index}>
            <AccordionTrigger>{use_case.name}</AccordionTrigger>
            <AccordionContent>
              <use_case.component />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
