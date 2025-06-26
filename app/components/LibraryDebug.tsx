import React from "react";
import useSWR from "swr";
import { accountLibraryFetcher } from "~/fetchers";
import { Alert, AlertDescription } from "./ui/alert";

export default function LibraryDebug({ accountId }: { accountId: string }) {
  const { data: library, error } = useSWR(
    `/api/v1/accounts/${accountId}/library`,
    accountLibraryFetcher
  );

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Error loading library: {error.message}</AlertDescription>
      </Alert>
    );
  }

  if (!library) {
    return <div className="text-sm text-slate-500">Loading library data...</div>;
  }

  return (
    <div className="mt-4 p-4 border rounded-lg text-sm">
      <h4 className="font-medium mb-2">Library Debug Info</h4>
      <p>Account ID: {accountId}</p>
      <p>Playlists: {library.playlists?.length || 0}</p>
      <p>Schedules: {library.schedules?.length || 0}</p>
      
      {library.schedules && library.schedules.length > 0 && (
        <div className="mt-2">
          <h5 className="font-medium">Available Schedules:</h5>
          <ul className="mt-1 space-y-1">
            {library.schedules.slice(0, 5).map((schedule) => (
              <li key={schedule.id} className="text-xs">
                • {schedule.name} (ID: {schedule.id})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}