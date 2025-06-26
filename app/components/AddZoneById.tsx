import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

type AddZoneByIdProps = {
  onZoneAdded: (zone: any) => void;
};

export default function AddZoneById({ onZoneAdded }: AddZoneByIdProps) {
  const [zoneId, setZoneId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddZone = async () => {
    if (!zoneId.trim()) {
      setError("Please enter a zone ID");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/v1/zones/${encodeURIComponent(zoneId)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Zone not found. Please check the zone ID.");
        }
        throw new Error("Failed to fetch zone");
      }

      const zone = await response.json();
      onZoneAdded(zone);
      toast(`Added zone: ${zone.name}`);
      setZoneId("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add zone");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg mb-4">
      <h3 className="text-sm font-medium mb-2">Add Zone by ID</h3>
      <p className="text-sm text-slate-400 mb-3">
        Enter a specific zone ID to add it without loading all zones
      </p>
      
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <Label htmlFor="zone-id">Zone ID</Label>
          <Input
            id="zone-id"
            value={zoneId}
            onChange={(e) => setZoneId(e.target.value)}
            placeholder="e.g., U291bmRab25lLCwx..."
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                handleAddZone();
              }
            }}
          />
        </div>
        <Button 
          onClick={handleAddZone} 
          disabled={loading || !zoneId.trim()}
          size="sm"
        >
          {loading ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <PlusIcon className="mr-2 h-4 w-4" />
          )}
          Add Zone
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-3">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}