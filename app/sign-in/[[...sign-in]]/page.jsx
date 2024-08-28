"use client"
import { SignIn } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function Page() {

  return (
    <div className="flex justify-center py-20 min-h-screen bg-gray-800">
        <SignIn />
    </div>
  );
}
