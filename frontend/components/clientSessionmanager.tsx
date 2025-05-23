"use client";

import { useEffect } from "react";
import { checkAndRemoveExpiredUser } from "@/utils/userSessionManager";

export default function ClientSessionManager() {
  useEffect(() => {
    checkAndRemoveExpiredUser();
  }, []);

  return null;
}
