import { useState } from "react";
import type { CompanyInterface, Job } from "../../interfaces";

const getInitials = (name: string) => {
  if(!name) return "N/A";
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}


export const statusStyles: Record<Job["status"], string> = {
  active: "bg-green-50 text-green-700",
  draft: "bg-amber-50 text-amber-700",
  closed: "bg-slate-100 text-slate-500",
};

export const JobCardSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-xl p-5 animate-pulse">
    <div className="flex items-start gap-3 mb-3">
      <div className="h-12 w-12 rounded-lg bg-slate-200 shrink-0" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-3.5 w-3/4 bg-slate-200 rounded" />
        <div className="h-3 w-1/2 bg-slate-200 rounded" />
      </div>
    </div>
    <div className="space-y-2 mb-3">
      <div className="h-3 w-full bg-slate-200 rounded" />
      <div className="h-3 w-5/6 bg-slate-200 rounded" />
      <div className="h-3 w-2/3 bg-slate-200 rounded" />
    </div>
    <div className="flex gap-1.5 mb-4">
      <div className="h-5 w-14 bg-slate-200 rounded-full" />
      <div className="h-5 w-16 bg-slate-200 rounded-full" />
      <div className="h-5 w-12 bg-slate-200 rounded-full" />
    </div>
    <div className="h-9 w-full bg-slate-200 rounded-md" />
  </div>
);

export const CompanyAvatar = ({
  company,
  size = "h-12 w-12",
  textSize = "text-sm",
}: {
  company: CompanyInterface;
  size?: string;
  textSize?: string;
}) => {
  const [imgError, setImgError] = useState(false);

  if (company.logo && !imgError) {
    return (
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        onError={() => setImgError(true)}
        className={`${size} rounded-lg object-cover shrink-0 border border-slate-100`}
      />
    );
  }

  return (
    <div
      className={`${size} rounded-lg bg-indigo-50 text-indigo-700 ${textSize} font-bold flex items-center justify-center shrink-0`}
    >
      {getInitials(company.name)}
    </div>
  );
};