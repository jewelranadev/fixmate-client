// TEMPORARY MOCK DATA: replaced by API data during manual integration.
// The signed-in technician is the FIRST technician in data/mock/technicians.js.
// Field names match the assignment service schema exactly:
// _id, title, category, description, image, basePrice (Number, USD),
// estimatedDuration, serviceMode, serviceArea, technicianName,
// technicianEmail, approvalStatus, isAvailable, createdAt.
//
// Coverage required by A09:
//   3 approved + available (svc_001, svc_005, svc_013)
//   1 approved + unavailable (svc_009)
//   2 pending (svc_015, svc_016)
//   1 rejected (svc_017)
// The first four copy data/mock/services.js so the public listing, the
// technician dashboard and the request rows all agree.

import { technicians } from "./technicians";

export const technician = technicians[0];

export const technicianServices = [
  {
    _id: "svc_001",
    title: "iPhone Screen Replacement",
    category: "Smartphone",
    description:
      "Cracked or unresponsive display replaced with a tested panel, including touch and brightness checks before handover.",
    image: "/images/smartphone-microscope.jpg",
    basePrice: 89,
    estimatedDuration: "1-2 hours",
    serviceMode: "Home Visit",
    serviceArea: "Mirpur, Dhaka",
    technicianName: technician.name,
    technicianEmail: technician.email,
    approvalStatus: "approved",
    isAvailable: true,
    createdAt: "2026-11-14T09:15:00.000Z",
  },
  {
    _id: "svc_005",
    title: "Split AC Deep Cleaning",
    category: "AC",
    description:
      "Indoor and outdoor units washed, filters and coils cleaned, and drainage checked so cooling runs at full strength.",
    image: "/images/ac-outdoor-unit.jpg",
    basePrice: 55,
    estimatedDuration: "2-3 hours",
    serviceMode: "Home Visit",
    serviceArea: "Mirpur, Dhaka",
    technicianName: technician.name,
    technicianEmail: technician.email,
    approvalStatus: "approved",
    isAvailable: true,
    createdAt: "2026-11-13T10:00:00.000Z",
  },
  {
    _id: "svc_013",
    title: "Circuit Breaker Replacement",
    category: "Electrical",
    description:
      "Tripping breaker replaced with a correctly rated unit, with the load tested at the panel before the job is closed.",
    image: "/images/electrician-panel.jpg",
    basePrice: 45,
    estimatedDuration: "1-2 hours",
    serviceMode: "Home Visit",
    serviceArea: "Mirpur, Dhaka",
    technicianName: technician.name,
    technicianEmail: technician.email,
    approvalStatus: "approved",
    isAvailable: true,
    createdAt: "2026-11-12T08:30:00.000Z",
  },
  {
    _id: "svc_009",
    title: "TV Panel & Screen Repair",
    category: "TV",
    description:
      "Backlight, panel and board faults traced on the bench; you get a repair quote before any part is ordered.",
    image: "/images/tv-wall.jpg",
    basePrice: 95,
    estimatedDuration: "1 day",
    serviceMode: "Shop Drop-off",
    serviceArea: "Mirpur, Dhaka",
    technicianName: technician.name,
    technicianEmail: technician.email,
    approvalStatus: "approved",
    isAvailable: false,
    createdAt: "2026-11-10T14:20:00.000Z",
  },
  {
    _id: "svc_015",
    title: "Laptop Screen & Hinge Repair",
    category: "Laptop & PC",
    description:
      "Cracked laptop panel replaced and a stiff or broken hinge rebuilt, with the lid alignment checked before return.",
    image: "/images/laptop-internals.jpg",
    basePrice: 110,
    estimatedDuration: "1 day",
    serviceMode: "Shop Drop-off",
    serviceArea: "Mirpur, Dhaka",
    technicianName: technician.name,
    technicianEmail: technician.email,
    approvalStatus: "pending",
    isAvailable: true,
    createdAt: "2026-11-16T09:40:00.000Z",
  },
  {
    _id: "svc_016",
    title: "Wall Socket & Wiring Inspection",
    category: "Electrical",
    description:
      "Every socket on the circuit tested for loose contacts and heat damage, with a written list of any parts needed.",
    image: "/images/electrician-hardhat.jpg",
    basePrice: 30,
    estimatedDuration: "1-2 hours",
    serviceMode: "Home Visit",
    serviceArea: "Mirpur, Dhaka",
    technicianName: technician.name,
    technicianEmail: technician.email,
    approvalStatus: "pending",
    isAvailable: true,
    createdAt: "2026-11-17T11:05:00.000Z",
  },
  {
    _id: "svc_017",
    title: "Phone Water Damage Treatment",
    category: "Smartphone",
    description:
      "Ultrasonic board cleaning and corrosion treatment for liquid-damaged phones, with a diagnosis before any repair.",
    image: "/images/workbench-tools.jpg",
    basePrice: 60,
    estimatedDuration: "1 day",
    serviceMode: "Shop Drop-off",
    serviceArea: "Mirpur, Dhaka",
    technicianName: technician.name,
    technicianEmail: technician.email,
    approvalStatus: "rejected",
    isAvailable: false,
    createdAt: "2026-11-08T16:15:00.000Z",
  },
];
