import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-1 h-full w-full items-center justify-center px-4 py-16">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
          404
        </p>
        <h1 className="text-4xl font-bold sm:text-5xl">
          Page not found
        </h1>
        <p className="text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button asChild className="mt-2">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  );
}