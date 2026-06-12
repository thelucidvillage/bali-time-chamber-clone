import { createFileRoute, useServerFn, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { listBookings, updateBooking } from "@/lib/bookings.functions";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, LogOut, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Bookings" }] }),
  component: AdminPage,
});

type Booking = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  num_guests: number;
  arrival_date: string;
  departure_date: string;
  total_nights: number;
  booking_status: "pending" | "confirmed" | "cancelled";
  deposit_status: "unpaid" | "paid" | "refunded";
  created_at: string;
  special_requests: string | null;
};

function AdminPage() {
  const fetchBookings = useServerFn(listBookings);
  const patchBooking = useServerFn(updateBooking);

  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [forbidden, setForbidden] = useState(false);

  async function load() {
    setError(null);
    try {
      const data = await fetchBookings();
      setBookings(data as Booking[]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load";
      if (msg === "Forbidden") setForbidden(true);
      else setError(msg);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleStatus(id: string, booking_status: Booking["booking_status"]) {
    await patchBooking({ data: { id, booking_status } });
    load();
  }
  async function handleDeposit(id: string, deposit_status: Booking["deposit_status"]) {
    await patchBooking({ data: { id, deposit_status } });
    load();
  }

  const filtered = useMemo(() => {
    if (!bookings) return [];
    return bookings.filter((b) => {
      const q = search.trim().toLowerCase();
      if (
        q &&
        !b.full_name.toLowerCase().includes(q) &&
        !b.email.toLowerCase().includes(q) &&
        !b.phone.toLowerCase().includes(q)
      ) {
        return false;
      }
      if (from && b.arrival_date < from) return false;
      if (to && b.departure_date > to) return false;
      return true;
    });
  }, [bookings, search, from, to]);

  if (forbidden) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-md text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-destructive" />
          <h1 className="mt-4 font-serif text-2xl">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account is signed in but does not have admin privileges yet. Ask the site owner to grant you the
            "admin" role in the database, then refresh this page.
          </p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/auth";
            }}
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Site
            </Link>
            <h1 className="font-serif text-xl">Bookings dashboard</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/auth";
            }}
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-xs text-muted-foreground">Search (name, email, phone)</label>
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Arrival on/after</label>
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Departure on/before</label>
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-card">
          {!bookings ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="p-12 text-center text-sm text-muted-foreground">No bookings yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Arrival</TableHead>
                  <TableHead>Departure</TableHead>
                  <TableHead>Nights</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Booking</TableHead>
                  <TableHead>Deposit</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>
                      <div className="font-medium">{b.full_name}</div>
                      {b.special_requests && (
                        <div className="mt-1 max-w-xs text-xs text-muted-foreground">
                          “{b.special_requests}”
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-xs">
                      <div>{b.email}</div>
                      <div className="text-muted-foreground">{b.phone}</div>
                    </TableCell>
                    <TableCell>{b.arrival_date}</TableCell>
                    <TableCell>{b.departure_date}</TableCell>
                    <TableCell>{b.total_nights}</TableCell>
                    <TableCell>{b.num_guests}</TableCell>
                    <TableCell>
                      <Select
                        value={b.booking_status}
                        onValueChange={(v) => handleStatus(b.id, v as Booking["booking_status"])}
                      >
                        <SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={b.deposit_status}
                        onValueChange={(v) => handleDeposit(b.id, v as Booking["deposit_status"])}
                      >
                        <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unpaid">Unpaid</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="refunded">Refunded</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {format(new Date(b.created_at), "PP p")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </div>
  );
}
