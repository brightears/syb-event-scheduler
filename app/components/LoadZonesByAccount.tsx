import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { mutate } from "swr";

export default function LoadZonesByAccount() {
  const [accountId, setAccountId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoadZones = async () => {
    if (!accountId.trim()) {
      setError("Please enter an account ID");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/v1/accounts/${encodeURIComponent(accountId)}/zones?skipCache=true`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Account not found. Please check the account ID.");
        }
        throw new Error("Failed to fetch zones for this account");
      }

      const zones = await response.json();
      
      // Refresh the main zones cache
      await mutate("/api/v1/zones");
      
      toast(`Loaded ${zones.length} zones from account`);
      setAccountId("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load zones");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-4 border rounded-lg">
      <h3 className="text-sm font-medium mb-2">Load Zones by Account ID</h3>
      <p className="text-sm text-slate-400 mb-3">
        Load zones from a specific account instead of loading all zones
      </p>
      
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <Label htmlFor="account-id">Account ID</Label>
          <Input
            id="account-id"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            placeholder="e.g., QWNjb3VudCwsMWNqMTM3Ymp3MXMv"
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                handleLoadZones();
              }
            }}
          />
        </div>
        <Button 
          onClick={handleLoadZones} 
          disabled={loading || !accountId.trim()}
          size="sm"
        >
          {loading && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          Load Account Zones
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-3">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="mt-3 text-xs text-slate-500">
        <p>Tip: You can find account IDs in your CSV file or from the Settings page account list.</p>
      </div>
    </div>
  );
}